import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const root=process.env.SITE_URL || 'http://127.0.0.1:5173';
const before=process.env.BEFORE_URL || '';
const widths=[360,390,768,1024,1440];
const approved='Tôi tin vào sức sáng tạo của người Việt. Chúng tôi xây dựng DCG để kết nối con người và công nghệ, biến những ý tưởng tốt thành sản phẩm có ích cho cuộc sống.';
const entertainment='Định hướng phát triển phim, âm nhạc và nhân vật nguyên bản, với sự hỗ trợ của công nghệ AI trong quá trình sản xuất.';
const errors=[];
await mkdir('visual-qa',{recursive:true});
const browser=await chromium.launch({headless:true});

async function imagesReady(page,selector){
  await page.locator(selector).first().evaluate(async el=>{
    const images=el.matches('img')?[el]:Array.from(el.querySelectorAll('img'));
    await Promise.all(images.map(async img=>{
      if(!img.complete)await new Promise((resolve,reject)=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',reject,{once:true});});
      if(img.decode)await img.decode().catch(()=>{});
    }));
  });
}

async function screenshotSections(page,label){
  await imagesReady(page,'#nha-sang-lap');
  await imagesReady(page,'.brand-row');
  await page.locator('#nha-sang-lap').screenshot({path:'visual-qa/'+label+'-ceo.png',animations:'disabled'});
  const ent=page.locator('.brand-row').filter({has:page.locator('.brand-inline strong', {hasText:'DCG ENTERTAINMENT'})});
  await imagesReady(page,'.brand-rows');
  await ent.screenshot({path:'visual-qa/'+label+'-entertainment.png',animations:'disabled'});
  await ent.locator('.brand-inline').screenshot({path:'visual-qa/'+label+'-entertainment-identity.png',animations:'disabled'});
  await page.screenshot({path:'visual-qa/'+label+'-full-home.png',fullPage:true,animations:'disabled'});
}

try {
  // Same previous commit, rendered locally for genuinely comparable before images.
  if(before){
    for(const width of [390,1440]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
      try {
        const response=await page.goto(before+'/?ceo-draft=1',{waitUntil:'networkidle',timeout:45000});
        assert.equal(response.status(),200);
        assert.equal(await page.locator('.founder-editorial-note').count(),1,'old editorial note must be captured');
        await screenshotSections(page,'before-'+width);
        console.log('PASS before screenshot '+width+'px');
      } catch(e) {errors.push('before '+width+': '+e.message);} finally {await page.close();}
    }
  }

  for(const width of widths){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
    try {
      const jsErrors=[];
      page.on('pageerror',error=>jsErrors.push(error.message));
      const response=await page.goto(root+'/',{waitUntil:'networkidle',timeout:45000});
      assert.equal(response.status(),200);
      await imagesReady(page,'#nha-sang-lap');
      const state=await page.evaluate(()=>{
        const founder=document.querySelector('#nha-sang-lap');
        const about=document.querySelector('.about-home');
        const ecosystem=document.querySelector('.brands-home');
        const quote=founder.querySelector('blockquote');
        const face=founder.querySelector('img');
        const ent=[...document.querySelectorAll('.brand-row')].find(e=>e.querySelector('.brand-inline strong')?.textContent==='DCG ENTERTAINMENT');
        const identity=ent.querySelector('.brand-inline');
        const image=identity.querySelector('img');
        const mark=identity.querySelector('.brand-mark');
        const link=ent.querySelector('.link-arrow');
        const linkStyle=getComputedStyle(link);
        return {
          h1:document.querySelectorAll('main h1').length,
          sectionOrder:!!(about.compareDocumentPosition(founder)&Node.DOCUMENT_POSITION_FOLLOWING)&&!!(founder.compareDocumentPosition(ecosystem)&Node.DOCUMENT_POSITION_FOLLOWING),
          founderTitle:founder.querySelector('h2')?.textContent.trim(),
          founderQuote:quote?.textContent.trim(),
          quoteStyle:{fontSize:parseFloat(getComputedStyle(quote).fontSize),color:getComputedStyle(quote).color,lineHeight:parseFloat(getComputedStyle(quote).lineHeight)},
          founderName:founder.querySelector('.founder-signature strong')?.textContent.trim(),
          founderRole:founder.querySelector('.founder-signature span')?.textContent.trim(),
          founderLink:founder.querySelector('a')?.getAttribute('href'),
          portrait:{width:face.naturalWidth,height:face.naturalHeight,fit:getComputedStyle(face).objectFit},
          notes:document.querySelectorAll('.founder-editorial-note').length,
          oldText:document.body.textContent.includes('Điều tôi mong muốn ở DCG')||document.body.textContent.includes('CHƯA ĐƯỢC PHÊ DUYỆT'),
          entName:identity.querySelector('strong')?.textContent.trim(),
          entH3:ent.querySelector('h3')?.textContent.trim(),
          entSummary:ent.querySelector('.brand-row-copy-inner>p:not(.micro-index)')?.textContent.trim(),
          entLink:link.getAttribute('href'),entLinkText:link.textContent.replace('↗','').trim(),
          entLinkDisplay:linkStyle.display,entLinkGap:parseFloat(linkStyle.gap),
          logo:{src:image.getAttribute('src'),fit:getComputedStyle(image).objectFit,filter:getComputedStyle(image).filter,loaded:image.complete&&image.naturalWidth>0,naturalWidth:image.naturalWidth,width:mark.getBoundingClientRect().width},
          whitePanel:getComputedStyle(identity).backgroundColor,
          allWhitePanels:[...document.querySelectorAll('.brand-inline')].every(el=>getComputedStyle(el).backgroundColor==='rgb(255, 255, 255)'),
          overflow:document.documentElement.scrollWidth-innerWidth,
          badHeadings:[...document.querySelectorAll('main h1,main h2,main h3,main h4,main h5,main h6')].filter(h=>getComputedStyle(h).color!=='rgb(20, 45, 78)'||/\.\s*$/.test(h.textContent.trim())).map(h=>h.textContent.trim())
        };
      });
      assert.equal(state.h1,1);
      assert.equal(state.sectionOrder,true,'Founder section order');
      assert.equal(state.founderTitle,'Thông điệp từ nhà sáng lập');
      assert.equal(state.founderQuote,'“'+approved+'”');
      assert.equal(state.founderName,'Trương Quốc Huy');
      assert.equal(state.founderRole,'Nhà sáng lập & Tổng giám đốc DCG GROUP');
      assert.equal(state.founderLink,'/gioi-thieu#nha-sang-lap');
      assert.equal(state.notes,0);
      assert.equal(state.oldText,false);
      assert.equal(state.portrait.width,640);
      assert.equal(state.portrait.height,910);
      assert.equal(state.portrait.fit,'contain');
      assert.equal(state.quoteStyle.color,'rgb(20, 45, 78)');
      assert.ok(state.quoteStyle.fontSize>=(width<=390?21:width>=1024?25:23));
      assert.equal(state.entName,'DCG ENTERTAINMENT');
      assert.equal(state.entH3,'Sáng tạo nội dung giải trí');
      assert.equal(state.entSummary,entertainment);
      assert.equal(state.entLinkText,'Khám phá thương hiệu');
      assert.equal(state.entLink,'/he-sinh-thai/dcg-entertainment');
      assert.equal(state.entLinkDisplay,'inline-flex');
      assert.equal(state.entLinkGap,8);
      assert.equal(state.logo.loaded,true);
      assert.ok(state.logo.naturalWidth>=900,'full resolution Entertainment logo');
      assert.ok(state.logo.src.includes('dcg-entertainment-emblem-safe.webp'));
      assert.equal(state.logo.fit,'contain');
      assert.equal(state.logo.filter,'none');
      assert.ok(Math.abs(state.logo.width-(width<=390?72:88))<=1,'shared emblem size');
      assert.equal(state.whitePanel,'rgb(255, 255, 255)');
      assert.equal(state.allWhitePanels,true);
      assert.ok(state.overflow<=2,'no horizontal overflow');
      assert.deepEqual(state.badHeadings,[]);
      assert.deepEqual(jsErrors,[]);
      if(width===390||width===1440)await screenshotSections(page,'after-'+width);
      console.log('PASS final homepage '+width+'px');
    } catch(e) {
      errors.push(width+'px '+e.message);
      console.error('FAIL '+width+'px '+e.message);
      await page.screenshot({path:'visual-qa/failure-'+width+'.png',fullPage:true}).catch(()=>{});
    } finally{await page.close();}
  }
  const page=await browser.newPage({viewport:{width:390,height:844}});
  for(const route of ['/gioi-thieu','/he-sinh-thai','/he-sinh-thai/dcg-talent','/he-sinh-thai/dcg-studio','/he-sinh-thai/dcg-vision','/he-sinh-thai/dcg-entertainment','/giai-phap','/du-an','/du-an/dcg-growmatch','/du-an/mat-than-ai','/lien-he']){
    try{
      const response=await page.goto(root+route,{waitUntil:'domcontentloaded',timeout:30000});
      assert.equal(response.status(),200);
      assert.equal(await page.locator('main h1').count(),1);
      assert.equal(await page.locator('.error-404').count(),0);
      if(route==='/gioi-thieu'){
        assert.equal(await page.locator('#nha-sang-lap blockquote').innerText(),'“'+approved+'”');
        assert.equal(await page.locator('#nha-sang-lap a').count(),0,'no About self-link');
      }
      if(route==='/he-sinh-thai/dcg-entertainment'){
        assert.equal(await page.locator('.detail-brand .brand-mark__image').count(),1);
        assert.equal(await page.locator('.detail-brand').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(255, 255, 255)');
      }
      console.log('PASS final route '+route);
    }catch(e){errors.push(route+' '+e.message);}
  }
  await page.goto(root+'/?ceo-draft=1',{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('.founder-editorial-note').count(),0);
  assert.equal(await page.locator('.founder-message').count(),1);
  await page.close();
} finally { await browser.close(); }
if(errors.length){console.error('FAILED:\n'+errors.join('\n'));process.exitCode=1;}
