import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium,webkit} from 'playwright';

const base=process.env.SITE_URL||'http://127.0.0.1:5173';
const before=process.env.BEFORE_URL||'http://127.0.0.1:5174';
const widths=[360,390,430,768,820,834,1024,1280,1440];
const brands=['talent','studio','vision','entertainment'];
const routes=[
 '/', '/gioi-thieu','/ve-dcg','/he-sinh-thai',
 ...brands.map(k=>'/he-sinh-thai/dcg-'+k),
 ...brands.map(k=>'/'+k),
 '/giai-phap','/giai-phap/dcg-growmatch','/giai-phap/sang-tao-video-ai',
 '/giai-phap/lumiqc','/giai-phap/noi-dung-giai-tri-ai',
 '/du-an','/du-an/dcg-growmatch','/du-an/lumiqc',
 '/lien-he','/thong-tin-du-lieu'
];
const results=[],failures=[];
await mkdir('responsive-audit-proof',{recursive:true});
const box=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}};
const browser=await chromium.launch({headless:true});
async function open(page,url){const res=await page.goto(url,{waitUntil:'domcontentloaded',timeout:25000});assert.equal(res.status(),200,'HTTP '+url);await page.evaluate(()=>document.fonts.ready);return res;}
async function measureCards(page){
 return page.evaluate(()=>{
  const box=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}};
  return {width:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,
   sections:['.focus-grid','.process-steps'].map(sel=>{
    const grid=document.querySelector(sel),cards=grid?[...grid.children]:[];
    return {sel,columns:grid?getComputedStyle(grid).gridTemplateColumns:null,cards:cards.map(el=>({
      rect:box(el),number:box(el.querySelector('span,b')),heading:box(el.querySelector('h3')),text:box(el.querySelector('p')),
      header:el.querySelector('h3').textContent.trim(),body:el.querySelector('p').textContent.trim(),
      font:parseFloat(getComputedStyle(el.querySelector('p')).fontSize),
      lineHeight:parseFloat(getComputedStyle(el.querySelector('p')).lineHeight),
      boxSizing:getComputedStyle(el).boxSizing
    }))};
   })
  };
 });
}
function checkCards(m,width){
 assert.ok(m.overflow<=2,'no horizontal overflow '+width+': '+m.overflow);
 for(const sec of m.sections){
  assert.equal(sec.cards.length,3,sec.sel+' three cards');
  assert.ok(sec.cards.every(x=>x.font>=16&&x.lineHeight>=25.6),'16px minimum readable descriptions');
  const cards=sec.cards;
  if(width>=1140){
   for(const key of ['number','heading','text']){
    const max=Math.max(...cards.map(x=>x[key].y)),min=Math.min(...cards.map(x=>x[key].y));
    assert.ok(max-min<=2,sec.sel+' '+key+' aligned: delta '+(max-min));
   }
   const maxH=Math.max(...cards.map(x=>x.rect.h)),minH=Math.min(...cards.map(x=>x.rect.h));
   assert.ok(maxH-minH<=2,sec.sel+' equal height: '+(maxH-minH));
   assert.ok(cards[1].rect.x>cards[0].rect.right&&cards[2].rect.x>cards[1].rect.right,'three columns');
  }else{
   assert.ok(cards[1].rect.y>=cards[0].rect.bottom-2&&cards[2].rect.y>=cards[1].rect.bottom-2,'single column order');
   assert.ok(cards.every(x=>x.rect.w>=width*.65),'readable single column width');
   assert.ok(cards.every(x=>x.rect.h<480),'no empty oversized cards');
  }
 }
}
try{
 const original=await browser.newPage({viewport:{width:834,height:950}});
 await open(original,before+'/he-sinh-thai/dcg-vision');
 await original.locator('.focus-section').screenshot({path:'responsive-audit-proof/before-vision-focus-834.png',animations:'disabled'});
 await original.locator('.detail-process').screenshot({path:'responsive-audit-proof/before-vision-process-834.png',animations:'disabled'});
 await original.close();
 for(const width of widths){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
  try{
   const jsErrors=[];page.on('pageerror',e=>jsErrors.push(e.message));
   for(const path of routes){
    await open(page,base+path);
    const info=await page.evaluate(()=>{
     const all=document.querySelectorAll('main');
     const full=document.querySelectorAll('main h1');
     const overs=[...document.querySelectorAll('body *')].filter(el=>{
      const s=getComputedStyle(el);if(s.position==='fixed'||s.position==='absolute')return false;
      const r=el.getBoundingClientRect();
      return r.width>0&&r.left<-3||r.right>innerWidth+3&&r.width>0
     }).slice(0,10).map(el=>el.tagName+'.'+String(el.className).slice(0,80));
     return{width:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,main:all.length,h1:full.length,overs,
      images:[...document.querySelectorAll('main .brand-mark__image')].map(im=>({src:im.getAttribute('src'),fit:getComputedStyle(im).objectFit}))}
    });
    assert.equal(info.width,width);
    assert.ok(info.overflow<=2,'overflow '+path+' @'+width+'='+info.overflow+' offenders '+JSON.stringify(info.overs));
    assert.equal(info.main,1,'one main '+path);
    assert.equal(info.h1,1,'one H1 '+path);
    assert.ok(info.images.every(im=>im.fit==='contain'),'logos uncropped '+path);
    if(path==='/'){
     assert.equal(await page.locator('.growmatch-recognition-summary').count(),0,'no homepage award');
     assert.ok((await page.locator('.founder-message').innerText()).includes('Tôi tin vào sức sáng tạo của người Việt.'));
     assert.ok((await page.locator('.brand-row').first().locator('img.editorial-photo').getAttribute('src')).includes('talent-student-collaboration'));
    }
    if(path==='/du-an/dcg-growmatch'){
      assert.equal(await page.locator('#thanh-tich .growmatch-award-figure').count(),2);
    }
    if(path.startsWith('/he-sinh-thai/dcg-')){
      const cards=await measureCards(page);checkCards(cards,width);
      if(path==='/he-sinh-thai/dcg-vision'){
       const p=page.locator('.detail-process');
       assert.equal(await p.locator('h2').innerText(),'Từ nhu cầu đến hướng triển khai');
       assert.deepEqual(await p.locator('.process-step h3').allInnerTexts(),['Chia sẻ nhu cầu','Xác định phạm vi','Thống nhất triển khai']);
       assert.deepEqual(await p.locator('.process-step p').allInnerTexts(),[
        'Trao đổi mục tiêu, bối cảnh và vấn đề cần giải quyết.',
        'Làm rõ yêu cầu, dữ liệu đầu vào và giới hạn của giải pháp.',
        'Thống nhất phạm vi, đầu ra và điều kiện trước khi triển khai.'
       ]);
       assert.deepEqual(await page.locator('.focus-card h3').allInnerTexts(),['Thị giác máy tính','LUMIQC','Con người xác minh']);
       const faq=page.locator('.detail-faq details').first();
       await faq.locator('summary').click();
       assert.equal(await faq.getAttribute('open'),'','FAQ opens');
       await faq.locator('summary').click();
       assert.equal(await faq.getAttribute('open'),null,'FAQ closes');
       if([390,834,1024,1280,1440].includes(width)){
         await page.locator('.focus-section').screenshot({path:'responsive-audit-proof/after-vision-focus-'+width+'.png',animations:'disabled',timeout:25000});
         await page.locator('.detail-process').screenshot({path:'responsive-audit-proof/after-vision-process-'+width+'.png',animations:'disabled',timeout:25000});
       }
      }
      if(width===390||width===1280)results.push({width,path,cards});
    }
    if(path==='/lien-he'){
     const form=page.locator('#contact-form');
     assert.equal(await form.count(),1);
     assert.ok((await form.locator('button[type="submit"]').count())===1);
    }
   }
   // menu keyboard on responsive views; source stays unchanged.
   await open(page,base+'/');
   const nav=page.locator('#nav-toggle');
   await nav.click();assert.equal(await nav.getAttribute('aria-expanded'),'true');
   await page.keyboard.press('Escape');assert.equal(await nav.getAttribute('aria-expanded'),'false');
   assert.deepEqual(jsErrors,[],'No JS errors '+width);
   console.log('PASS RESPONSIVE ROUTES',width,routes.length);
  }catch(e){failures.push(width+'px '+e.message);console.error('FAIL',width,e.message);await page.screenshot({path:'responsive-audit-proof/failure-'+width+'.png',fullPage:true}).catch(()=>{});}
  finally{await page.close();}
 }
 // sweep breakpoint vicinity in CSS pixels without inferring device from screenshot width.
 const sweep=await browser.newPage({viewport:{width:1100,height:900}});
 for(const width of [760,767,768,790,800,820,900,1023,1024,1099,1100,1120,1138,1139,1140,1141,1152]){
  await sweep.setViewportSize({width,height:900});
  await open(sweep,base+'/he-sinh-thai/dcg-vision');
  const m=await measureCards(sweep);checkCards(m,width);
 }
 await sweep.close();
 // 200% root text as accessibility stress, in single-column view.
 const large=await browser.newPage({viewport:{width:390,height:900}});
 await open(large,base+'/he-sinh-thai/dcg-vision');
 await large.evaluate(()=>{document.documentElement.style.fontSize='200%'});
 await large.evaluate(()=>document.fonts.ready);
 const lm=await measureCards(large);
 assert.ok(lm.overflow<=2,'200% text no scroll overflow');
 assert.ok(lm.sections.every(sec=>sec.cards.every(card=>card.rect.h>card.text.h)),'200% text not cropped');
 await large.locator('.detail-process').screenshot({path:'responsive-audit-proof/after-200percent-type.png',animations:'disabled'});
 await large.close();
}catch(e){failures.push('GENERAL '+e.message);console.error('GENERAL FAIL',e.message)}
finally{await browser.close()}
await writeFile('responsive-audit-proof/report.json',JSON.stringify({routes,widths,results,failures},null,2));
if(failures.length){console.error(failures.join('\n'));process.exitCode=1}else console.log('ALL RESPONSIVE AUDIT CHECKS PASS');
