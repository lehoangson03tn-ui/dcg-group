
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.env.SITE_URL || 'http://127.0.0.1:5173';
const widths = [360, 390, 430, 768, 820, 834, 1024, 1180, 1280, 1440, 1920];
const browser = await chromium.launch({ headless: true });
const results = [];
await mkdir('qa-growmatch-vecom', { recursive: true });

for (const width of widths) {
 const page = await browser.newPage({ viewport: { width, height: 940 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
 const errors = [];
 page.on('pageerror', e => errors.push(e.message));
 try {
  const res = await page.goto(base + '/du-an/dcg-growmatch#thanh-tich', { waitUntil: 'networkidle', timeout: 45000 });
  assert.equal(res.status(), 200);
  assert.equal(await page.locator('main h1').count(), 1, 'one page h1');
  assert.equal(await page.locator('#gm-title').innerText().then(x => x.includes('DCG GROWMATCH')), true);
  for (const id of ['gm-problem', 'gm-solution', 'gm-process', 'gm-product', 'gm-model', 'gm-team', 'thanh-tich', 'gm-vecom']) {
   assert.equal(await page.locator('#' + id).count(), 1, id + ' section');
  }
  assert.equal(await page.locator('.growmatch-award-figure').count(), 2, 'exactly two original award figures');
  // Visual geometry contract for the three problem cards, checked at all eleven viewports.
  const problemLayout = await page.evaluate(() => {
    const section=document.querySelector('#gm-problem');
    const title=section.querySelector('h2');
    const intro=section.querySelector('.gm-head > p');
    const cards=[...section.querySelectorAll('.gm-three > .gm-tile')];
    const box=el=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};};
    return {
      title:box(title), intro:box(intro),
      gridColumns:getComputedStyle(section.querySelector('.gm-three')).gridTemplateColumns.split(' ').length,
      cards:cards.map(card=>({
        card:box(card),index:box(card.querySelector('.gm-index')),
        title:box(card.querySelector('h3')),copy:box(card.querySelector('p')),
        overflow:card.scrollWidth > card.clientWidth+2
      }))
    };
  });
  assert.equal(problemLayout.cards.length,3,'three problem cards preserved');
  assert.ok(problemLayout.cards.every(x=>!x.overflow),'no card text overflow');
  assert.ok(problemLayout.cards.every(x=>x.copy.right<=x.card.right+2),'paragraphs must stay inside cards');
  assert.ok(problemLayout.cards.every(x=>x.title.right<=x.card.right+2),'headings must stay inside cards');
  if(width>=1181){
    assert.equal(problemLayout.gridColumns,3,'desktop has three equal columns');
    assert.ok(problemLayout.cards.every(x=>Math.abs(x.card.top-problemLayout.cards[0].card.top)<2),'desktop card tops align');
    assert.ok(problemLayout.cards.every(x=>Math.abs(x.card.height-problemLayout.cards[0].card.height)<2),'desktop card heights align');
    assert.ok(problemLayout.cards.every(x=>Math.abs(x.title.top-problemLayout.cards[0].title.top)<3),'desktop headings align');
  } else if(width>=701){
    assert.equal(problemLayout.gridColumns,1,'iPad uses one horizontal card per row');
    for(let i=1;i<problemLayout.cards.length;i++){
      assert.ok(problemLayout.cards[i].card.top > problemLayout.cards[i-1].card.bottom,'iPad cards are stacked without overlap');
      assert.ok(Math.abs(problemLayout.cards[i].card.width-problemLayout.cards[0].card.width)<2,'iPad cards have equal width');
    }
    assert.ok(problemLayout.cards.every(x=>x.title.left>x.index.right),'iPad heading is next to the index');
    assert.ok(problemLayout.cards.every(x=>x.copy.left>x.title.right),'iPad description occupies a separate right column');
  } else {
    assert.equal(problemLayout.gridColumns,1,'phones use single-column cards');
    assert.ok(problemLayout.cards.every(x=>x.copy.top>=x.title.bottom-1),'phone descriptions appear below headings');
    assert.ok(problemLayout.cards.every(x=>x.copy.width>=x.title.width),'phone paragraphs use available width');
  }

  // Each team member uses three self-contained rows, not six loose grid cells.
  const memberMetas = page.locator('.gm-team-carousel .gm-person-meta');
  assert.equal(await memberMetas.count(), 2, 'both profiles have metadata');
  for (let memberIndex = 0; memberIndex < 2; memberIndex++) {
   assert.equal(await memberMetas.nth(memberIndex).locator('.gm-person-meta-row').count(), 3,
     'three aligned facts for team member ' + memberIndex);
  }
  const alignedMeta = await memberMetas.first().evaluate(meta => {
    const rows = [...meta.querySelectorAll('.gm-person-meta-row')];
    return {
      overflow: meta.scrollWidth > meta.clientWidth + 2,
      rows: rows.map(row => {
        const label=row.querySelector('span').getBoundingClientRect();
        const value=row.querySelector('b').getBoundingClientRect();
        return { labelX: label.left, valueX: value.left, labelTop: label.top,
          valueTop: value.top, labelBottom: label.bottom, valueWidth: value.width };
      })
    };
  });
  assert.ok(!alignedMeta.overflow, 'team facts must not overflow the card');
  assert.ok(alignedMeta.rows.every(r=>r.valueWidth >= 80), 'team facts need readable value width');
  for (let i = 1; i < alignedMeta.rows.length; i++) {
   assert.ok(Math.abs(alignedMeta.rows[i].labelX - alignedMeta.rows[0].labelX)<2,
      'all team labels must align');
   assert.ok(Math.abs(alignedMeta.rows[i].valueX - alignedMeta.rows[0].valueX)<2,
      'all team values must align');
  }
  if (width <= 700) {
   assert.ok(alignedMeta.rows.every(r=>r.valueTop >= r.labelBottom-1),
     'on phones, values must sit under labels');
  } else {
   assert.ok(alignedMeta.rows.every(r=>Math.abs(r.labelTop-r.valueTop)<7),
     'on tablet and desktop, label and value share the same row');
  }

  assert.equal(await page.locator('.growmatch-award-title').innerText(), 'DCG GROWMATCH ghi dấu ấn tại CEO thời đại số');
  assert.equal(await page.locator('.growmatch-award-result').innerText(), 'Top 5 vòng chung kết');
  assert.equal(await page.locator('a.recognition-source').getAttribute('href'), 'https://ntt.edu.vn/nttu-tim-kiem-nha-quan-tri-tuong-lai-qua-cuoc-thi-ceo-thoi-dai-so/');
  assert.equal(await page.locator('img[src="/assets/recognition/NTTU_0058.jpeg"]').count(), 1);
  assert.equal(await page.locator('img[src="/assets/recognition/FBA1C8B9-ED38-42D6-8EF9-50CBECBFA44D.jpeg"]').count(), 1);
  const image = page.locator('.growmatch-award-figure').first().locator('img');
  await image.evaluate(async img => { img.loading = 'eager'; if (!img.complete) await new Promise((res, rej) => { img.onload=res; img.onerror=rej; }); await img.decode(); });
  assert.equal(await image.evaluate(img => img.naturalWidth), 1536);
  const metrics = await page.evaluate(() => ({
   overflow: document.documentElement.scrollWidth - innerWidth,
   header: !!document.querySelector('.site-header'),
   footer: !!document.querySelector('.site-footer'),
   articleText: document.querySelector('#thanh-tich')?.textContent.includes('Đưa bài toán nghề nghiệp đến sân chơi quản trị'),
   heroImg: document.querySelector('.gm-hero-visual img')?.getAttribute('src'),
   aiImgCount: document.querySelectorAll('.gm img[src*="growmatch-ai-"]').length,
   carouselCount: document.querySelectorAll('.gm-team-carousel').length,
   archivePhotoCaptionsHidden: [...document.querySelectorAll('#thanh-tich .growmatch-award-figure figcaption')].every(el=>getComputedStyle(el).clipPath==='inset(50%)'),
   noNewFigcaptions: document.querySelectorAll('.gm-hero-visual figcaption,.gm-editorial-media figcaption,.gm-story-gallery figcaption,.gm-team-carousel figcaption').length===0
  }));
  assert.ok(metrics.overflow <= 2, 'horizontal overflow: ' + metrics.overflow);
  assert.ok(metrics.header && metrics.footer && metrics.articleText, 'shell and article preserved');
  // Three device classes: verify actual browser geometry, not just element presence.
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior='auto';
    window.scrollTo(0,0);
  });
  const geometry = await page.evaluate(() => {
    const box = selector => {
      const r=document.querySelector(selector)?.getBoundingClientRect();
      return r ? {top:r.top,bottom:r.bottom,left:r.left,right:r.right,width:r.width,height:r.height} : null;
    };
    const nav=document.querySelector('.gm-context');
    const screen=document.querySelector('.gm-editorial-media img');
    return {
      navPosition:getComputedStyle(nav).position,
      nav:box('.gm-context'),
      title:box('#gm-title'),
      heroCopy:box('.gm-hero-copy'),
      heroPhoto:box('.gm-hero-visual'),
      media:box('.gm-editorial-media img'),
      mediaFit:getComputedStyle(screen).objectFit
    };
  });
  if(width>=701 && width<=1180){
    assert.equal(geometry.navPosition,'relative','iPad project nav must not cover headings');
    assert.ok(geometry.title.top >= geometry.nav.bottom+20,
       'iPad hero title must be below project nav: '+JSON.stringify(geometry));
    assert.ok(geometry.heroPhoto.top >= geometry.heroCopy.bottom-2,
       'iPad hero must be a true single-column composition: '+JSON.stringify(geometry));
    assert.ok(geometry.media.height<=500 && geometry.media.height>=300,
       'iPad AI coaching photo must be a short landscape crop: '+JSON.stringify(geometry));
    assert.ok(geometry.media.width > geometry.media.height,
       'iPad coaching image should be wider than tall');
    assert.equal(geometry.mediaFit,'cover');
  }
  if(width<=700){
    assert.equal(geometry.navPosition,'relative','mobile project bar must not hide hero');
    assert.ok(geometry.media.height<=410,'mobile coaching image has a bounded height');
  }

  assert.ok(metrics.heroImg.endsWith('growmatch-ai-hero-launch.png'), 'AI hero launch art');
  assert.ok(metrics.aiImgCount >= 6, 'six AI illustration occurrences');
  assert.equal(metrics.carouselCount, 1, 'one accessible team carousel');
  assert.ok(metrics.archivePhotoCaptionsHidden && metrics.noNewFigcaptions, 'no visible photo captions');

  // Product showcase regression: two matched CTAs and a genuine decodable JPG.
  const productShowcase=page.locator('.gm-product-showcase');
  const productButtons=productShowcase.locator('.gm-product-actions > a.gm-button');
  assert.equal(await productButtons.count(),2,'two matching product CTAs');
  assert.equal(await productButtons.nth(0).getAttribute('href'),'https://dcg-growmatch.vercel.app/');
  assert.equal(await productButtons.nth(1).getAttribute('href'),'#gm-guide');
  const productImage=productShowcase.locator('.gm-product-shot img');
  assert.equal(await productImage.getAttribute('src'),'/assets/guide/growmatch-home-public-20261030.jpg','product uses genuine public screenshot');
  await productImage.evaluate(async img=>{
    img.loading='eager';
    await img.decode();
  });
  assert.equal(await productImage.evaluate(img=>img.naturalWidth),1440,'screenshot loads and decodes');
  const productDesign=await productShowcase.evaluate(el=>{
    const links=[...el.querySelectorAll('.gm-product-actions > a.gm-button')];
    const boxes=links.map(link=>{
      const rect=link.getBoundingClientRect(), style=getComputedStyle(link);
      const label=link.querySelector('span')?.getBoundingClientRect();
      return {x:rect.x,y:rect.y,width:rect.width,height:rect.height,bg:style.backgroundColor,
        borderRadius:style.borderRadius,labelHeight:label?.height||0,
        fontSize:Number.parseFloat(style.fontSize)};
    });
    const group=el.querySelector('.gm-product-actions').getBoundingClientRect();
    const shot=el.querySelector('.gm-product-shot img').getBoundingClientRect();
    return {boxes,group:{width:group.width,height:group.height},shot:{width:shot.width,height:shot.height}};
  });
  assert.ok(Math.abs(productDesign.boxes[0].width-productDesign.boxes[1].width)<=2,
    'product CTAs same width: '+JSON.stringify(productDesign));
  assert.ok(Math.abs(productDesign.boxes[0].height-productDesign.boxes[1].height)<=2,
    'product CTAs same height: '+JSON.stringify(productDesign));
  assert.ok(productDesign.boxes.every(box=>box.height>=53),
    'product CTAs maintain accessible touch heights: '+JSON.stringify(productDesign));
  assert.notEqual(productDesign.boxes[0].bg,productDesign.boxes[1].bg,'primary and secondary styles distinct');
  assert.ok(productDesign.shot.height>60 && productDesign.shot.width>100,'screenshot visible');
  assert.ok(productDesign.boxes.every(box=>box.labelHeight<box.height-12),
    'CTA text not cut off or wrapped too tall: '+JSON.stringify(productDesign));
  if([390,820,1024,1440].includes(width)){
    await productShowcase.screenshot({path:'qa-growmatch-vecom/product-showcase-'+width+'.png',animations:'disabled'});
  }

  const team = page.locator('.gm-team-carousel');
  const teamGeometry = await page.evaluate(() => {
    const member=document.querySelector('[data-gm-member="0"]');
    const media=member.querySelector('.gm-person-media');
    const img=member.querySelector('img.gm-person-photo');
    const card=member.getBoundingClientRect();
    const frame=media.getBoundingClientRect();
    const photo=img.getBoundingClientRect();
    return {
      cardHeight:card.height, frameHeight:frame.height, frameWidth:frame.width,
      frameTop:frame.top, frameBottom:frame.bottom, cardBottom:card.bottom,
      photoHeight:photo.height, photoWidth:photo.width,
      cardWidth:card.width, framePosition:getComputedStyle(media).position,
      photoFit:getComputedStyle(img).objectFit
    };
  });
  assert.equal(teamGeometry.photoFit,'cover');
  // Cropped portraits intentionally have a mild transform: the rendered image
  // can be larger than its clipping frame, but must never be smaller.
  assert.ok(teamGeometry.photoHeight>=teamGeometry.frameHeight-2 &&
            teamGeometry.photoWidth>=teamGeometry.frameWidth-2,
    'member portrait must cover its entire image frame: '+JSON.stringify(teamGeometry));
  if(width>=701 && width<=1180){
    assert.ok(Math.abs(teamGeometry.cardHeight-teamGeometry.frameHeight)<=4,
      'iPad member photo must fill entire height of the card: '+JSON.stringify(teamGeometry));
    assert.ok(teamGeometry.frameHeight>=470,'portrait fills iPad card vertically');
  }
  if(width<=700){
    assert.ok(teamGeometry.frameHeight>=310 && teamGeometry.frameHeight<=440,
      'mobile portrait has deliberate balanced height');
  }

  const members = page.locator('[data-gm-member]');
  assert.equal(await members.count(), 2);
  assert.equal(await members.nth(0).isVisible(), true, 'Sơn first profile');
  assert.equal(await members.nth(1).isVisible(), false, 'Huy starts hidden');
  await team.locator('[data-gm-member-next]').click();
  if(width>=701 && width<=1180){
    const second=await page.evaluate(()=>{
      const card=document.querySelector('[data-gm-member="1"]');
      const photo=card.querySelector('.gm-person-media');
      return {card:card.getBoundingClientRect().height,media:photo.getBoundingClientRect().height};
    });
    assert.ok(Math.abs(second.card-second.media)<=4,
      'second iPad portrait must fill entire card too: '+JSON.stringify(second));
  }
  assert.equal(await members.nth(0).isVisible(), false);
  assert.equal(await members.nth(1).isVisible(), true, 'next arrow opens Huy');
  assert.equal(await page.locator('.gm-team-index-current').innerText(), '02');
  await team.locator('[data-gm-member-prev]').click();
  assert.equal(await members.nth(0).isVisible(), true, 'previous arrow returns Sơn');
  await team.locator('[data-gm-member-dot="1"]').click();
  assert.equal(await members.nth(1).isVisible(), true, 'second pagination dot opens Huy');
  await page.locator('#gm-team-track').focus();
  await page.keyboard.press('ArrowLeft');
  assert.equal(await members.nth(0).isVisible(), true, 'keyboard moves back to Sơn');
  if(width===390) {
   await page.locator('.gm-team-carousel').evaluate(el=>{
    const trigger=(kind,x,y)=>{
      const e=new Event(kind,{bubbles:true,cancelable:true});
      Object.defineProperty(e,'changedTouches',{value:[{clientX:x,clientY:y}]});
      el.dispatchEvent(e);
    };
    trigger('touchstart',250,400); trigger('touchend',90,409);
   });
   assert.equal(await members.nth(1).isVisible(), true, 'swipe left opens Huy');
   await team.locator('[data-gm-member-dot="0"]').click();
  }
  assert.equal(await page.locator('.gm-story-gallery img').count(), 2);
  assert.equal(await page.locator('.gm-concept-image img').count(), 1);
  assert.equal(await page.locator('.gm-vecom-photo').count(), 1);
  assert.equal(await page.locator('.gm-end-visual').count(), 1);
  if([390,820,1440].includes(width)){
   const checkImage=page.locator('.gm-hero-visual img');
   await checkImage.evaluate(async img=>{
    if(!img.complete)await new Promise((resolve,reject)=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',reject,{once:true})});
    await img.decode();
   });
   assert.ok(await checkImage.evaluate(img=>img.naturalWidth)>500,'AI hero must load from media library');
  }
  assert.deepEqual(errors, [], 'no JS runtime errors');
  if ([390, 820, 834, 1024, 1440].includes(width)) {
   const aiImages = page.locator('.gm img[src*="growmatch-ai-"]');
   await aiImages.evaluateAll(async imgs => {
    imgs.forEach(img => { img.loading='eager'; });
    await Promise.all(imgs.map(img => Promise.race([
      img.decode(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('AI asset timeout')), 18000))
    ])));
   });
   const aiStatus=await aiImages.evaluateAll(imgs=>imgs.map(img=>({src:img.currentSrc.split('/').pop(),naturalWidth:img.naturalWidth})));
   assert.ok(aiStatus.every(img=>img.naturalWidth>500), 'all AI media must fully load');
   const realProduct = page.locator('.gm-product-shot img');
   await realProduct.evaluateAll(async imgs => {
    imgs.forEach(img => { img.loading='eager'; });
    await Promise.all(imgs.map(img => img.decode()));
   });
   assert.ok(await realProduct.first().evaluate(img => img.naturalWidth >= 1000), 'real product website screenshot loads');
   const portraits = page.locator('.gm-person-photo');
   await portraits.evaluateAll(async imgs => {
    imgs.forEach(img => { img.loading='eager'; });
    await Promise.all(imgs.map(img => img.decode()));
   });
   assert.ok((await portraits.evaluateAll(imgs=>imgs.map(img=>img.naturalWidth))).every(n=>n>300), 'both real member photos load');
   const archive=page.locator('.growmatch-award-figure img');
   await archive.evaluateAll(async imgs => {
    imgs.forEach(img => { img.loading='eager'; });
    await Promise.all(imgs.map(img => img.decode()));
   });
   await page.screenshot({ path: 'qa-growmatch-vecom/project-' + width + '.png', fullPage: true, animations: 'disabled' });
   // Focused visual evidence lets a reviewer inspect each of the three reported bugs.
   if([390,820,834,1024,1440].includes(width)){
     await page.locator('.gm-hero').screenshot({path:'qa-growmatch-vecom/hero-'+width+'.png',animations:'disabled'});
     await page.locator('.gm-editorial-grid').screenshot({path:'qa-growmatch-vecom/coaching-'+width+'.png',animations:'disabled'});
     await page.locator('.gm-team-carousel').screenshot({path:'qa-growmatch-vecom/team-'+width+'.png',animations:'disabled'});
   }
  }
  results.push({ width, status: 'PASS', overflow: metrics.overflow });
  console.log('PASS', width);
 } catch (e) {
  results.push({ width, status: 'FAIL', error: e.message });
  await page.screenshot({ path: 'qa-growmatch-vecom/failure-' + width + '.png', fullPage: true }).catch(() => {});
  const imageState=await page.locator('.gm img').evaluateAll(imgs => imgs.map(img=>({
    src:img.getAttribute('src'),complete:img.complete,naturalWidth:img.naturalWidth,loading:img.loading
  }))).catch(()=>[]);
  console.error('FAIL', width, e.message, JSON.stringify(imageState.filter(img=>img.complete&&img.naturalWidth===0)));
 } finally { await page.close(); }
}
await browser.close();
await writeFile('qa-growmatch-vecom/results.json', JSON.stringify(results, null, 2));
if (results.some(r => r.status === 'FAIL')) process.exitCode = 1;
