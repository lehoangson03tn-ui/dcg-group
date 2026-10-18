import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from 'playwright';

const base=process.env.SITE_URL||'http://127.0.0.1:5173';
const widths=[360,390,430,768,834,1024,1100,1366,1440,1920];
const expected=[
 {slug:'growmatch',url:'/du-an/dcg-growmatch',image:'/assets/projects/dcg-growmatch-real-website.webp',title:'DCG GROWMATCH'},
 {slug:'lumiqc',url:'/du-an/lumiqc',image:'/assets/projects/lumiqc-approved-lotus-logo.webp',title:'LUMIQC'}
];
const failures=[],results=[];
await fs.mkdir('project-showcase-proof',{recursive:true});
const browser=await chromium.launch({headless:true});
try{
 for(const width of widths){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
  try{
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const res=await page.goto(base+'/',{waitUntil:'domcontentloaded',timeout:30000});
   assert.equal(res.status(),200,'Home HTTP 200');
   const cards=page.locator('.projects-home .project-line--showcase');
   assert.equal(await cards.count(),2,'Exactly two project cards');
   await cards.locator('img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
   await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.querySelectorAll('.projects-home img')].map(i=>i.decode().catch(()=>{})));});
   const data=await page.evaluate(()=>{
    const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}};
    return {
     scroll:document.documentElement.scrollWidth-innerWidth,
     section:rect(document.querySelector('.projects-home')),
     cards:[...document.querySelectorAll('.projects-home .project-line--showcase')].map(el=>{
      const img=el.querySelector('figure img'),figure=el.querySelector('figure'),div=el.querySelector(':scope > div');
      const h=el.querySelector('h3');
      return{rect:rect(el),figure:rect(figure),copy:rect(div),title:rect(h),text:h.innerText,
       image:img.getAttribute('src'),complete:img.complete,naturalWidth:img.naturalWidth,
       alt:img.alt,fit:getComputedStyle(img).objectFit,
       href:el.getAttribute('href'),number:el.querySelector(':scope > span')?.innerText,
       bgcolor:getComputedStyle(figure).backgroundColor};
     }),
     awards:[...document.querySelectorAll('.growmatch-award-figure')].length
    };
   });
   assert.ok(data.scroll<=2,'No horizontal overflow: '+data.scroll);
   assert.equal(data.awards,0,'Achievement photos are not shown on homepage');
   for(let i=0;i<2;i++){
    const a=data.cards[i],e=expected[i];
    assert.equal(a.text,e.title,'Correct project title');
    assert.equal(a.image,e.image,'Approved project asset path');
    assert.equal(a.href,e.url,'Preserve project detail navigation');
    assert.ok(a.complete&&a.naturalWidth>0,'Image loaded: '+e.slug);
    assert.equal(a.fit,'contain','Keep screenshot / logo uncropped');
    assert.ok(a.alt.length>35,'Meaningful alternative text');
    assert.ok(a.rect.x>=-2&&a.rect.right<=width+2,'Card within viewport');
    assert.ok(a.figure.h>=100,'Media not collapsed');
    assert.ok(a.title.right<=width+2,'Heading fits viewport');
    if(width>=768)assert.ok(a.figure.x>=a.copy.right-2,'Text left and image right');
    else assert.ok(a.figure.bottom<=a.copy.y+3,'Image before mobile description');
   }
   if(width>=768){
    assert.ok(Math.abs(data.cards[0].rect.x-data.cards[1].rect.x)<=2,'Identical card left edges');
    assert.ok(Math.abs(data.cards[0].rect.w-data.cards[1].rect.w)<=2,'Identical card widths');
    assert.ok(Math.abs(data.cards[0].figure.w-data.cards[1].figure.w)<=3,'Consistent media widths');
    assert.ok(Math.abs(data.cards[0].figure.h-data.cards[1].figure.h)<=3,'Consistent media heights');
   }
   assert.deepEqual(errors,[],'No uncaught Javascript errors');
   if([390,768,1024,1440,1920].includes(width)){
    await page.locator('.projects-home').screenshot({path:'project-showcase-proof/home-projects-'+width+'.png',animations:'disabled',timeout:30000});
   }
   results.push({width,imagesLoaded:true,overflow:data.scroll,status:'PASS'});
   console.log('PASS PROJECT SHOWCASE '+width+'px '+JSON.stringify(results.at(-1)));
  }catch(e){failures.push(width+'px '+e.message);console.error('FAIL '+width+'px '+e.stack);}
  finally{await page.close();}
 }
}finally{await browser.close();}
await fs.writeFile('project-showcase-proof/results.json',JSON.stringify({results,failures},null,2));
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
else console.log('ALL PASS: approved screenshot + lotus logo and desktop/mobile alignment');
