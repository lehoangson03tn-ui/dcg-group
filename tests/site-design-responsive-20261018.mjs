import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium,webkit} from 'playwright';

const BASE=process.env.SITE_URL||'http://127.0.0.1:5173';
const viewports=[360,390,430,680,681,768,834,1024,1280,1440,1920];
const routes=[
 '/','/gioi-thieu','/ve-dcg','/he-sinh-thai',
 '/he-sinh-thai/dcg-talent','/he-sinh-thai/dcg-studio','/he-sinh-thai/dcg-vision','/he-sinh-thai/dcg-entertainment',
 '/talent','/studio','/vision','/entertainment',
 '/giai-phap','/giai-phap/dcg-growmatch','/giai-phap/sang-tao-video-ai',
 '/giai-phap/lumiqc','/giai-phap/noi-dung-giai-tri-ai',
 '/du-an','/du-an/dcg-growmatch','/du-an/lumiqc','/lien-he','/thong-tin-du-lieu'
];
const fails=[],checked=[],captures=[];
await mkdir('corporate-site-visual-proof',{recursive:true});
const browser=await chromium.launch({headless:true});

function assertRectInsideViewport(x,width,context){
 assert.ok(x.left>=-3&&x.right<=width+3,context+' exceeds viewport: '+JSON.stringify(x));
}
for(const width of viewports){
 const page=await browser.newPage({viewport:{width,height:950},deviceScaleFactor:1,reducedMotion:'reduce'});
 const jsErrors=[];page.on('pageerror',e=>jsErrors.push(e.message));
 try {
  // Complete cross-route smoke test (including legacy redirects).
  for(const route of routes){
   const res=await page.goto(BASE+route,{waitUntil:'domcontentloaded',timeout:25000});
   assert.equal(res.status(),200,route+' HTTP');
   const basic=await page.evaluate(()=>{
    const main=document.querySelector('main'),h1=main?.querySelector('h1');
    const header=document.querySelector('.site-header');
    const box=e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,width:r.width,height:r.height,top:r.top,bottom:r.bottom}};
    return{overflow:document.documentElement.scrollWidth-innerWidth,mainCount:document.querySelectorAll('main').length,h1Count:document.querySelectorAll('main h1').length,
     h1Text:h1?.textContent.trim(),header:box(header),headFont:h1?parseFloat(getComputedStyle(h1).fontSize):0,
     brokenLogo:[...document.querySelectorAll('.brand-mark__image')].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)};
   });
   assert.equal(basic.mainCount,1,'one main '+route);
   assert.equal(basic.h1Count,1,'one H1 '+route);
   assert.ok(basic.overflow<=2,'horizontal overflow '+route+' @'+width+': '+basic.overflow);
   assert.ok(basic.headFont>=28,'headline legibility '+route+' @'+width);
   assert.ok(basic.header.width<=width+3,'header fits '+route);
   assert.deepEqual(basic.brokenLogo,[],'no broken emblems '+route);
   if(route==='/giai-phap'||route==='/du-an'){
    await page.locator('.solution-card-visual img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
    await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.querySelectorAll('.solution-card-visual img')].map(i=>i.decode().catch(()=>{})))});
    const data=await page.evaluate(()=>{
     const box=e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}};
     return {
      grid:getComputedStyle(document.querySelector('.solution-grid')).gridTemplateColumns,
      cards:[...document.querySelectorAll('.solution-card')].map(e=>{
       const img=e.querySelector('.solution-card-visual img'),figure=e.querySelector('.solution-card-visual'),body=e.querySelector('.solution-card-body');
       return {href:e.getAttribute('href'),title:e.querySelector('h2')?.textContent.trim(),outer:box(e),media:box(figure),copy:box(body),imgFit:getComputedStyle(img).objectFit,
         complete:img.complete&&img.naturalWidth>0,src:img.getAttribute('src'),alt:img.alt,cta:e.querySelector('.solution-card-action')?.textContent.trim(),
         headingFont:parseFloat(getComputedStyle(e.querySelector('h2')).fontSize)};
      })
     };
    });
    const expected=route==='/du-an'?2:4;
    assert.equal(data.cards.length,expected,'card count '+route);
    data.cards.forEach((c,i)=>{
     assert.ok(c.complete,'media loaded '+route+' '+i);
     assert.ok(c.alt.length>=14,'accessible image '+route+' '+i);
     assertRectInsideViewport(c.outer,width,route+' card '+i);
     assert.ok(c.media.height>100,'media visible '+route+' '+i);
     assert.ok(Math.abs(c.media.width/c.media.height-16/9)<.035,'media ratio 16:9 '+route+' '+i);
     assert.ok(c.media.bottom<=c.copy.top+2,'image before readable content '+route+' '+i);
     assert.ok(c.headingFont>=21,'card heading legible '+route+' '+i);
     assert.ok(c.cta,'card action visible '+route+' '+i);
     assert.ok(c.outer.height<850,'card overlong '+route+' '+i);
    });
    assert.ok(data.cards[0].src.includes('dcg-growmatch-real-website.webp'),route+' uses actual GrowMatch screenshot');
    const l=route==='/du-an'?1:2;
    assert.ok(data.cards[l].src.includes('lumiqc-approved-lotus-logo.webp'),route+' uses approved lotus logo');
    assert.equal(data.cards[0].imgFit,'contain','uncropped real website screenshot');
    assert.equal(data.cards[l].imgFit,'contain','uncropped LUMIQC lotus');
    if(width>=681){
     assert.ok(data.cards[1].outer.left>data.cards[0].outer.right+10,'2 columns '+route+' @'+width);
     assert.ok(Math.abs(data.cards[0].outer.height-data.cards[1].outer.height)<=3,'first row equal heights '+route+' @'+width);
     if(data.cards.length===4)assert.ok(data.cards[2].outer.top>=data.cards[0].outer.bottom-3,'second row '+route+' @'+width);
    }else{
     assert.ok(data.cards[1].outer.top>=data.cards[0].outer.bottom-3,'single column '+route+' @'+width);
    }
    if((route==='/giai-phap'||route==='/du-an')&&[390,768,1024,1440,1920].includes(width)){
     const filename='corporate-site-visual-proof/'+route.slice(1).replaceAll('/','-')+'-'+width+'.png';
     await page.locator('.directory-intro').screenshot({path:filename,animations:'disabled',timeout:25000});
     captures.push(filename);
    }
   }
   checked.push({width,route,overflow:basic.overflow,status:'PASS'});
  }
  if([390,834,1440].includes(width)){
   for(const route of ['/','/he-sinh-thai']){
    await page.goto(BASE+route,{waitUntil:'domcontentloaded',timeout:25000});
    const element=route==='/'?'.brands-home':'.directory-intro';
    if(await page.locator(element).count()){
     const filename='corporate-site-visual-proof/'+(route==='/'?'homepage-ecosystem':'ecosystem-directory')+'-'+width+'.png';
     await page.locator(element).screenshot({path:filename,animations:'disabled',timeout:25000});
     captures.push(filename);
    }
   }
  }
  assert.deepEqual(jsErrors,[],'JS console errors @'+width);
  console.log('PASS ALL '+routes.length+' ROUTES @ '+width+'px');
 }catch(e){fails.push(width+'px: '+e.stack);console.error('FAIL '+width+'px: '+e.stack);}
 finally{await page.close();}
}
await browser.close();
// Safari-style rendering for the known problem route
const wk=await webkit.launch({headless:true});
try{
 for(const width of [390,768,1024,1440]){
  const page=await wk.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  try{
   const res=await page.goto(BASE+'/giai-phap',{waitUntil:'domcontentloaded'});
   assert.equal(res.status(),200);
   const info=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,
     cards:document.querySelectorAll('.solution-card').length,
     imageWidth:document.querySelector('.solution-card-visual').getBoundingClientRect().width}));
   console.log('WEBKIT MEASURE '+width+'px '+JSON.stringify(info));
   assert.ok(info.overflow<=2&&info.cards===4&&info.imageWidth>150,'WebKit grid '+width+' '+JSON.stringify(info));
   console.log('PASS WEBKIT @ '+width+'px');
  }catch(e){fails.push('WebKit '+width+'px: '+e.message);}
  finally{await page.close();}
 }
}finally{await wk.close();}
await writeFile('corporate-site-visual-proof/results.json',JSON.stringify({counts:{routes:routes.length,widths:viewports.length,checks:checked.length},failures:fails,captures},null,2));
if(fails.length){console.error(fails.join('\n'));process.exitCode=1;}
else console.log('PASS ALL: '+checked.length+' route/viewport combinations, Chromium+WebKit');
