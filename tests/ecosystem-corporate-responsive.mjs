import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';

const base=process.env.SITE_URL||'http://127.0.0.1:5173';
const widths=[360,390,430,768,820,1024,1099,1100,1180,1366,1440,1920];
const labels=['DCG TALENT','DCG STUDIO','DCG VISION','DCG ENTERTAINMENT'];
const failures=[],results=[];
await mkdir('corporate-visual-proof',{recursive:true});
const browser=await chromium.launch({headless:true});
for(const width of widths){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
 try{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(base+'/',{waitUntil:'domcontentloaded',timeout:25000});
  assert.equal(response.status(),200,'homepage HTTP');
  await page.locator('.brands-home .brand-row').nth(3).waitFor();
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('.brands-home .brand-row-image img').evaluateAll(async imgs=>{
   await Promise.all(imgs.map(async img=>{img.loading='eager';await img.decode().catch(()=>{});}));
  });
  const state=await page.evaluate(()=>{
    const box=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}};
    const cards=[...document.querySelectorAll('.brands-home .brand-row')].map(el=>{
      const title=el.querySelector('.brand-inline strong'),img=el.querySelector('.brand-row-image img'),mark=el.querySelector('.brand-inline img');
      return {name:title.textContent.trim(),card:box(el),photo:box(el.querySelector('.brand-row-image')),
        identity:box(el.querySelector('.brand-row-identity')),copy:box(el.querySelector('.brand-row-copy')),
        narrative:box(el.querySelector('.brand-row-narrative')),title:box(title),photoLoaded:img.complete&&img.naturalWidth>0,
        logoLoaded:mark.complete&&mark.naturalWidth>0,logoFit:getComputedStyle(mark).objectFit,
        link:el.querySelector('.brand-row-narrative a')?.getAttribute('href')};
    });
    return {width:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,
      grid:getComputedStyle(document.querySelector('.brands-home .brand-rows')).gridTemplateColumns,
      cards,headings:[...document.querySelectorAll('main h1,main h2')].map(x=>({name:x.textContent.trim(),rect:box(x)}))};
  });
  assert.ok(state.overflow<=2,'horizontal overflow: '+state.overflow);
  assert.equal(state.cards.length,4,'four ecosystem brands');
  assert.deepEqual(state.cards.map(x=>x.name),labels,'brand order');
  assert.ok(state.cards.every(x=>x.photoLoaded&&x.logoLoaded),'all photos and emblems loaded');
  assert.ok(state.cards.every(x=>x.logoFit==='contain'),'logos not cropped');
  assert.ok(state.cards.every(x=>x.title.right<=width+2),'no brand title overflow');
  assert.ok(state.cards.every(x=>x.card.w>230&&x.card.h>200),'no collapsed/undersized panels');
  assert.ok(state.cards.every(x=>x.link?.startsWith('/he-sinh-thai/dcg-')),'brand navigation');
  assert.equal(state.headings.filter(x=>x.name.startsWith('Kết nối con người')).length,1,'homepage identity');
  assert.deepEqual(errors,[],'no browser JS errors');
  if(width>=1100){
    assert.ok(state.cards[1].card.x>state.cards[0].card.right+10,'two-column desktop first row');
    assert.ok(state.cards[3].card.x>state.cards[2].card.right+10,'two-column desktop second row');
    assert.ok(state.cards[2].card.y>=state.cards[0].card.bottom-3,'two desktop rows');
    assert.ok(state.cards.every(x=>x.photo.bottom<=x.copy.y+3),'image before copy on desktop');
    assert.ok(Math.abs(state.cards[0].card.h-state.cards[1].card.h)<=3,'balanced first-row card heights');
    assert.ok(Math.abs(state.cards[2].card.h-state.cards[3].card.h)<=3,'balanced second-row card heights');
  }else{
    assert.ok(state.cards.every(x=>x.identity.bottom<=x.photo.y+3),'identity before documentary photos');
    assert.ok(state.cards.every(x=>x.photo.bottom<=x.narrative.y+3),'descriptions follow photo');
    assert.ok(state.cards[1].card.y>=state.cards[0].card.bottom-3,'single-column order');
  }
  if([390,820,1100,1440,1920].includes(width)){
    await page.locator('.brands-home').screenshot({path:'corporate-visual-proof/ecosystem-'+width+'.png',animations:'disabled',timeout:25000});
  }
  results.push({width,columns:width>=1100?2:1,overflow:state.overflow,images:'loaded',status:'PASS'});
  console.log('PASS '+width+'px '+JSON.stringify(results.at(-1)));
 }catch(e){failures.push(width+'px: '+e.message);console.error('FAIL '+width+'px '+e.stack);}
 finally{await page.close();}
}
await browser.close();
await writeFile('corporate-visual-proof/results.json',JSON.stringify({results,failures},null,2));
if(failures.length){process.exitCode=1;console.error(failures.join('\n'));}
else console.log('PASS all 12 responsive sizes and four Vietnamese images');
