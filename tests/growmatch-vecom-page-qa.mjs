
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
  console.error('FAIL', width, e.message);
 } finally { await page.close(); }
}
await browser.close();
await writeFile('qa-growmatch-vecom/results.json', JSON.stringify(results, null, 2));
if (results.some(r => r.status === 'FAIL')) process.exitCode = 1;
