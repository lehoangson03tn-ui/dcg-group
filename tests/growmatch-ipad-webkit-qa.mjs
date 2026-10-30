import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {webkit} from 'playwright';

const base=process.env.SITE_URL||'http://127.0.0.1:5173';
const widths=[390,768,820,834,1024,1180,1440];
await mkdir('qa-growmatch-webkit',{recursive:true});
const browser=await webkit.launch({headless:true});
const results=[];
try{
 for(const width of widths){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
  const runtime=[];page.on('pageerror',error=>runtime.push(error.message));
  try{
   const response=await page.goto(base+'/du-an/dcg-growmatch',{waitUntil:'networkidle',timeout:50000});
   assert.equal(response.status(),200,'route HTTP');
   const data=await page.evaluate(()=>{
    const rect=selector=>{
     const r=document.querySelector(selector).getBoundingClientRect();
     return {x:r.x,y:r.y,width:r.width,height:r.height,top:r.top,bottom:r.bottom};
    };
    const team=document.querySelector('[data-gm-member="0"]');
    const media=team.querySelector('.gm-person-media');
    const photo=team.querySelector('.gm-person-photo');
    return {
     overflow:document.documentElement.scrollWidth-innerWidth,
     title:rect('#gm-title'),nav:rect('.gm-context'),heroCopy:rect('.gm-hero-copy'),
     heroImage:rect('.gm-hero-visual'),coachingImage:rect('.gm-editorial-media img'),
     teamCard:team.getBoundingClientRect().height,teamMedia:media.getBoundingClientRect().height,
     teamPhoto:photo.getBoundingClientRect().height,
     navPosition:getComputedStyle(document.querySelector('.gm-context')).position
    };
   });
   assert.ok(data.overflow<=2,'Safari horizontal overflow: '+JSON.stringify(data));
   if(width>=701 && width<=1180){
    assert.equal(data.navPosition,'relative','Safari iPad nav not sticky');
    assert.ok(data.title.top>=data.nav.bottom+20,'Safari iPad hero below nav');
    assert.ok(data.heroImage.top>=data.heroCopy.bottom-2,'Safari iPad single column');
    assert.ok(data.coachingImage.height<=500,'Safari iPad AI photo shorter');
    assert.ok(data.coachingImage.width>data.coachingImage.height,'Safari iPad landscape illustration');
    assert.ok(Math.abs(data.teamCard-data.teamMedia)<=4,'Safari iPad member portrait fills full card');
    assert.ok(Math.abs(data.teamMedia-data.teamPhoto)<=2,'Safari iPad no blank lower photo area');
   }
   if(width<=700){
    assert.ok(data.coachingImage.height<=410,'Safari phone coaching photo cropped');
    assert.ok(data.teamMedia>=310&&data.teamMedia<=440,'Safari phone portrait height');
   }

   const product=page.locator('.gm-product-showcase');
   const screen=product.locator('.gm-product-shot img');
   assert.equal(await screen.getAttribute('src'),'/assets/guide/growmatch-home-public-20261030.jpg');
   await screen.evaluate(async img=>{img.loading='eager';await img.decode()});
   assert.equal(await screen.evaluate(img=>img.naturalWidth),1440,'Safari product screenshot decodes');
   const buttons=product.locator('.gm-product-actions > a.gm-button');
   assert.equal(await buttons.count(),2,'two product CTAs on Safari');
   const sizes=await buttons.evaluateAll(links=>links.map(x=>{
     const r=x.getBoundingClientRect();
     return {width:r.width,height:r.height,bg:getComputedStyle(x).backgroundColor};
   }));
   assert.ok(Math.abs(sizes[0].width-sizes[1].width)<=2 &&
     Math.abs(sizes[0].height-sizes[1].height)<=2,
     'Safari product CTAs match sizes: '+JSON.stringify(sizes));
   assert.ok(sizes.every(x=>x.height>=53),'Safari buttons are touch sized');
   assert.notEqual(sizes[0].bg,sizes[1].bg,'Safari primary/secondary hierarchy');
   if([390,820,1024,1440].includes(width)){
     await product.screenshot({path:'qa-growmatch-webkit/product-showcase-'+width+'.png',animations:'disabled'});
   }

   await page.locator('[data-gm-member-next]').click();
   assert.equal(await page.locator('[data-gm-member="1"]').isVisible(),true,'Safari carousel next');
   await page.locator('[data-gm-member-prev]').click();
   assert.equal(await page.locator('[data-gm-member="0"]').isVisible(),true,'Safari carousel previous');
   assert.deepEqual(runtime,[],'Safari runtime errors');
   if([390,820,1024,1440].includes(width)){
    const photo=page.locator('.gm-person-photo').first();
    await photo.evaluate(async img=>{img.loading='eager';await img.decode()});
    await page.locator('.gm-hero').screenshot({path:'qa-growmatch-webkit/hero-'+width+'.png',animations:'disabled'});
    await page.locator('.gm-editorial-grid').screenshot({path:'qa-growmatch-webkit/coaching-'+width+'.png',animations:'disabled'});
    await page.locator('.gm-team-carousel').screenshot({path:'qa-growmatch-webkit/team-'+width+'.png',animations:'disabled'});
   }
   results.push({width,status:'PASS',...data});
   console.log('PASS webkit '+width);
  }catch(error){
   results.push({width,status:'FAIL',error:error.message});
   console.error('FAIL webkit '+width,error.message);
  }finally{await page.close();}
 }
}finally{await browser.close()}
await writeFile('qa-growmatch-webkit/results.json',JSON.stringify(results,null,2));
if(results.some(x=>x.status==='FAIL'))process.exitCode=1;
