import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium,webkit} from 'playwright';
const base=process.env.SITE_URL||'http://127.0.0.1:5173';
const viewports=[{width:390,height:844},{width:834,height:1194},{width:1024,height:768},{width:1440,height:900}];
const routes=['/','/he-sinh-thai','/he-sinh-thai/dcg-talent','/he-sinh-thai/dcg-studio','/he-sinh-thai/dcg-vision','/he-sinh-thai/dcg-entertainment','/giai-phap','/du-an/dcg-growmatch'];
const expected={talent:'dcg-talent-vietnam-career-fair.webp',studio:'dcg-studio-vietnam-students.webp',vision:'food-kitchen-1600.webp',entertainment:'dcg-entertainment-nttu-studio.webp'};
const errors=[],runs=[];
await mkdir('vietnam-webp-qa',{recursive:true});
for(const [engine,driver] of [['chromium',chromium],['webkit',webkit]]){
 let browser;try{browser=await driver.launch({headless:true});}catch(e){errors.push(engine+' startup '+e.message);continue;}
 try{for(const vp of viewports){
 const page=await browser.newPage({viewport:vp,deviceScaleFactor:2,reducedMotion:'reduce'});
 const runtime=[];page.on('pageerror',e=>runtime.push(e.message));
 try{for(const route of routes){
   const resp=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:30000});
   assert.equal(resp.status(),200,route+' HTTP');
   const m=await page.evaluate(async()=>{
     const images=[...document.querySelectorAll('main img[src]')].filter(img=>Boolean(img.getAttribute('src')?.trim()));
     images.forEach(img=>img.loading='eager');
     await Promise.all(images.map(async img=>{if(!img.complete)await Promise.race([new Promise(resolve=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',resolve,{once:true});}),new Promise(resolve=>setTimeout(resolve,15000))]);await img.decode().catch(()=>{});}));
     return {overflow:document.documentElement.scrollWidth-innerWidth,
       broken:images.filter(img=>!img.naturalWidth).map(img=>img.getAttribute('src')),
       photos:images.map(img=>img.getAttribute('src')||''),
       rows:[...document.querySelectorAll('.brand-row')].map(row=>({name:row.querySelector('.brand-inline strong')?.textContent.trim(),src:row.querySelector('img.editorial-photo')?.getAttribute('src')})),
       detail:document.querySelector('.editorial-detail-figure img.editorial-photo')?.getAttribute('src'),
       vtv9:document.querySelectorAll('.studio-support-photo img[src$="dcg-studio-vtv9-camera.webp"]').length};
   });
   if(m.overflow>2){
     const offenders=await page.evaluate(()=>[...document.querySelectorAll('body *')].map(el=>{const r=el.getBoundingClientRect();return{tag:el.tagName,cls:typeof el.className==='string'?el.className.slice(0,60):'',left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width)};}).filter(x=>x.right>innerWidth+3||x.left<-3).sort((a,b)=>b.right-a.right).slice(0,15));
     console.error('OVERFLOW EVIDENCE',engine,vp.width,route,JSON.stringify(offenders));
   }
   assert.ok(m.overflow<=2,engine+' '+vp.width+' '+route+' horizontal overflow: '+m.overflow);
   assert.deepEqual(m.broken,[],engine+' '+vp.width+' '+route+' image loading');
   if(route==='/'){
     assert.deepEqual(m.rows.map(x=>x.name),['DCG TALENT','DCG STUDIO','DCG VISION','DCG ENTERTAINMENT']);
     for(const [key,file] of Object.entries(expected))assert.ok(m.rows.find(x=>x.name==='DCG '+key.toUpperCase())?.src?.endsWith(file),key+' row photo');
   }
   for(const [key,file] of Object.entries(expected))if(route==='/he-sinh-thai/dcg-'+key){
     assert.ok(m.detail?.endsWith(file),key+' main detail photo');
     assert.equal(m.vtv9,key==='studio'?1:0,key+' VTV9 support only on STUDIO');
   }
   if(route!=='/du-an/dcg-growmatch')assert.ok(!m.photos.some(s=>/recognition\/(NTTU_0058|FBA1C8B9)/.test(s)),route+' CEO event photo outside recognition');
   assert.deepEqual(runtime,[],engine+' '+vp.width+' JS errors');
   if(process.env.QA_SCREENSHOTS==='1'&&[390,834,1440].includes(vp.width)&&['/','/he-sinh-thai/dcg-studio'].includes(route)){
     await page.screenshot({path:'vietnam-webp-qa/'+engine+'-'+vp.width+'-'+route.replaceAll('/','_')+'.png',fullPage:true,animations:'disabled'});
   }
   runs.push({engine,width:vp.width,route,status:'PASS'});
 }}catch(e){errors.push(engine+' '+vp.width+': '+e.message);}
 finally{await page.close();}
 }}finally{await browser.close();}
}
await writeFile('vietnam-webp-qa/report.json',JSON.stringify({runs,errors},null,2));
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log('PASS '+runs.length+' tests on iPhone, iPad, desktop layouts in Chromium/WebKit');
