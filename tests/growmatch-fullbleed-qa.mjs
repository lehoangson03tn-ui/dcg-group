import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';

const current=process.env.SITE_URL||'http://127.0.0.1:5173';
const previous=process.env.BEFORE_URL||'http://127.0.0.1:5174';
const widths=[390,430,768,834,1024,1440];
const failures=[],measurements=[];
await mkdir('growmatch-fullbleed-qa',{recursive:true});
const browser=await chromium.launch({headless:true});
async function pageFor(url,width){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
 const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
 assert.equal(response.status(),200);
 return page;
}
try{
 for(const width of [390,1440]){
  const p=await pageFor(previous+'/',width);
  try{
   const before=await p.evaluate(()=>{
    const s=document.querySelector('.growmatch-recognition-summary'),parent=s.parentElement;
    const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,width:r.width,right:r.right}};
    return{innerWidth,summary:rect(s),summaryBackground:getComputedStyle(s).backgroundColor,
      parent:rect(parent),parentBackground:getComputedStyle(parent).backgroundColor,
      padding:getComputedStyle(s).paddingLeft,border:getComputedStyle(s).borderBottomWidth};
   });
   assert.equal(before.summaryBackground,'rgb(240, 245, 250)');
   assert.ok(before.summary.width<width-30,'Old background confined in container');
   measurements.push({stage:'before',width,...before});
   await p.locator('.projects-home').screenshot({path:'growmatch-fullbleed-qa/before-projects-'+width+'.png',animations:'disabled',timeout:25000});
   console.log('BASELINE',width,JSON.stringify(before));
  }catch(e){failures.push('baseline '+width+' '+e.message);}
  finally{await p.close();}
 }
 for(const width of widths){
  const p=await pageFor(current+'/',width);
  try{
   const errors=[];p.on('pageerror',e=>errors.push(e.message));
   const summary=p.locator('.growmatch-recognition-summary');
   assert.equal(await summary.count(),1);
   const thumbnail=summary.locator('img');
   await thumbnail.evaluate(async img=>{img.loading='eager';if(!img.complete)await new Promise((resolve,reject)=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',reject,{once:true});});await img.decode();});
   await p.evaluate(()=>document.fonts.ready);
   const data=await p.evaluate(()=>{
    const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}};
    const group=document.querySelector('.growmatch-project-group');
    const container=group.querySelector('.growmatch-project-container');
    const aside=group.querySelector('.growmatch-recognition-summary');
    const intro=group.querySelector('.growmatch-project-intro .project-line');
    const photo=aside.querySelector('.growmatch-summary-image');
    const image=photo.querySelector('img');
    const label=aside.querySelector('.growmatch-summary-label');
    const title=aside.querySelector('h3');
    const description=aside.querySelector('.growmatch-summary-description');
    const event=aside.querySelector('.growmatch-summary-event');
    const link=aside.querySelector('.growmatch-summary-link');
    const following=document.querySelector('.growmatch-following-project .project-line');
    const style=e=>getComputedStyle(e);
    return{
      viewport:innerWidth,scale:visualViewport?.scale,scroll:document.documentElement.scrollWidth-innerWidth,
      group:rect(group),container:rect(container),aside:rect(aside),intro:rect(intro),
      following:rect(following),figure:rect(photo),image:rect(image),label:rect(label),title:rect(title),
      description:rect(description),event:rect(event),link:rect(link),
      groupColor:style(group).backgroundColor,groupBorder:style(group).borderBottomWidth,
      groupBorderStyle:style(group).borderBottomStyle,
      containerColor:style(container).backgroundColor,containerPaddingLeft:parseFloat(style(container).paddingLeft),
      containerPaddingRight:parseFloat(style(container).paddingRight),
      introColor:style(intro).backgroundColor,
      asideColor:style(aside).backgroundColor,asideBorder:style(aside).borderBottomWidth,
      figureColor:style(photo).backgroundColor,
      figureMargin:style(photo).margin,
      imageFit:style(image).objectFit,imageSource:image.getAttribute('src'),
      imageNatural:[image.naturalWidth,image.naturalHeight],
      summaryLink:link.getAttribute('href'),
      introName:intro.querySelector('h3').textContent.trim(),
      followingName:following.querySelector('h3').textContent.trim(),
      summaryName:title.textContent.trim(),
      ceo:document.querySelector('.founder-message')?.textContent.trim()||'',
      brands:[...document.querySelectorAll('.brand-row .brand-inline strong')].map(e=>e.textContent.trim()),
      oldStandalone:document.querySelectorAll('#dau-an-va-ghi-nhan').length
    };
   });
   const tolerance=1.5;
   assert.equal(data.viewport,width);
   assert.equal(data.scale,1);
   assert.ok(data.scroll<=2,'No horizontal scroll '+data.scroll);
   assert.ok(Math.abs(data.group.x)<=tolerance && Math.abs(data.group.width-width)<=tolerance,'Group does not span full viewport');
   assert.equal(data.groupColor,'rgb(240, 245, 250)','Group must own blue');
   assert.equal(data.containerColor,'rgba(0, 0, 0, 0)','Container must be transparent');
   assert.equal(data.asideColor,'rgba(0, 0, 0, 0)','Summary must be transparent');
   assert.equal(data.introColor,'rgba(0, 0, 0, 0)','Intro must be transparent');
   assert.equal(data.figureColor,'rgba(0, 0, 0, 0)','Figure must be transparent');
   assert.equal(data.asideBorder,'0px','No framing border');
   assert.equal(data.groupBorder,'1px','Full-width transition rule');
   assert.equal(data.groupBorderStyle,'solid');
   assert.equal(data.introName,'DCG GROWMATCH');
   assert.equal(data.followingName,'LUMIQC');
   assert.equal(data.summaryName,'Top 5 vòng chung kết CEO thời đại số');
   assert.equal(data.oldStandalone,0,'No duplicate achievement');
   assert.equal(data.summaryLink,'/du-an/dcg-growmatch#thanh-tich');
   assert.equal(data.imageFit,'contain');
   assert.deepEqual(data.imageNatural,[1536,1024]);
   assert.equal(data.imageSource,'/assets/recognition/NTTU_0058.jpeg');
   assert.ok(data.group.bottom<=data.following.y+2,'LUMIQC begins after group separation');
   assert.ok(data.container.width<=1201,'Container 1200px max');
   assert.equal(data.containerPaddingLeft,width>=1100?40:width>=768?32:20);
   assert.equal(data.containerPaddingRight,data.containerPaddingLeft);
   assert.ok(data.label.x>=data.container.x+data.containerPaddingLeft-1,'Label not at outer edge');
   assert.ok(data.image.x>=data.container.x+data.containerPaddingLeft-1,'Image not at outer edge');
   assert.ok(data.image.right<=data.container.right-data.containerPaddingRight+1,'Image inside padded container');
   assert.ok(data.description.right<=data.container.right-data.containerPaddingRight+1,'Description inside padded container');
   assert.ok(data.ceo.includes('Tôi tin vào sức sáng tạo của người Việt.'),'CEO quote preserved');
   assert.deepEqual(data.brands,['DCG TALENT','DCG STUDIO','DCG VISION','DCG ENTERTAINMENT']);
   if(width<=900){
     assert.ok(data.label.bottom<=data.title.y+1,'Label before title');
     assert.ok(data.title.bottom<=data.image.y+1,'Title before photo');
     assert.ok(data.image.bottom<=data.description.y+1,'Photo before description');
     assert.ok(data.description.bottom<=data.event.y+1,'Description before event');
     assert.ok(data.event.bottom<=data.link.y+1,'Event before CTA');
     assert.ok(Math.abs(data.image.x-data.label.x)<1,'Mobile common left axis');
   }else{
     assert.ok(data.image.right+25<=data.description.x,'Desktop image left / content right');
   }
   measurements.push({stage:'after',width,...data});
   if([390,834,1440].includes(width))await p.locator('.projects-home').screenshot({path:'growmatch-fullbleed-qa/after-projects-'+width+'.png',animations:'disabled',timeout:30000});
   // Check separate article remains intact and images are still original.
   await p.goto(current+'/du-an/dcg-growmatch#thanh-tich',{waitUntil:'domcontentloaded'});
   assert.equal(await p.locator('.growmatch-award-figure').count(),2);
   assert.equal(await p.locator('#thanh-tich').count(),1);
   assert.equal(await p.locator('.growmatch-award-figure').first().locator('img').getAttribute('src'),'/assets/recognition/NTTU_0058.jpeg');
   assert.deepEqual(errors,[],'No JS exceptions');
   console.log('PASS FULLBLEED',width,'px',{padding:data.containerPaddingLeft,groupWidth:data.group.width,background:data.groupColor});
  }catch(e){failures.push('after '+width+' '+e.message);console.log('FAIL FULLBLEED',width,e.message);await p.screenshot({path:'growmatch-fullbleed-qa/fail-'+width+'.png',fullPage:true}).catch(()=>{});}
  finally{await p.close();}
 }
}finally{await browser.close();}
await writeFile('growmatch-fullbleed-qa/measurements.json',JSON.stringify({measurements,failures},null,2));
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else{console.log('ALL SIX FULL-WIDTH GROWMATCH RESPONSIVE TESTS PASSED');}
