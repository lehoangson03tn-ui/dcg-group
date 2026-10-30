
import assert from 'node:assert/strict';
import {existsSync, mkdir, writeFile} from 'node:fs';
import {chromium,webkit} from 'playwright';

const assets=['home','jobs','register','login','employer','develop'];
assets.forEach(x=>assert.ok(existsSync('public/assets/guide/growmatch-'+x+'-public-20261030.jpg'),'missing REAL public screen '+x));
const browsers=[['chromium',chromium,[360,390,768,820,1024,1440]],['webkit',webkit,[390,820,1440]]];
const base=process.env.SITE_URL || 'http://127.0.0.1:5173';
const result=[];
mkdir('qa-growmatch-guide',{recursive:true});

for(const [engine,driver,widths] of browsers){
 const browser=await driver.launch({headless:true});
 try{
  for(const width of widths){
   const page=await browser.newPage({viewport:{width,height:930},deviceScaleFactor:1,reducedMotion:'reduce'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   try{
    const response=await page.goto(base+'/du-an/dcg-growmatch#gm-guide',{waitUntil:'networkidle',timeout:45000});
    assert.equal(response.status(),200);
    const guide=page.locator('#gm-guide');
    assert.equal(await guide.count(),1);
    assert.ok((await guide.locator('h2').innerText()).includes('Bắt đầu cùng'));
    const tabs=guide.locator('[role="tab"]');
    assert.equal(await tabs.count(),3,'3 role flows');
    assert.equal(await guide.locator('[data-gm-guide-flow]').count(),3);
    assert.equal(await guide.locator('img[src*="growmatch-"]').count(),11,'all walkthrough screens');
    assert.equal(await page.locator('.growmatch-award-figure').count(),2,'original CEO article preserved');

    const overview=guide.locator('[data-gm-guide-flow="overview"]');
    assert.ok(await overview.isVisible());
    assert.ok(await overview.locator('[data-gm-guide-stage="0"]').isVisible());
    await overview.locator('[data-gm-guide-next]').click();
    assert.ok(await overview.locator('[data-gm-guide-stage="1"]').isVisible(),'next button works');
    await overview.locator('[data-gm-guide-step="2"]').click();
    assert.ok(await overview.locator('[data-gm-guide-stage="2"]').isVisible(),'step navigator works');

    await guide.locator('[data-gm-guide-tab="candidate"]').click();
    assert.equal(await overview.isVisible(),false);
    const candidate=guide.locator('[data-gm-guide-flow="candidate"]');
    assert.ok(await candidate.isVisible());
    assert.equal(await candidate.locator('[data-gm-guide-stage]').count(),4);
    await candidate.locator('[data-gm-guide-step="1"]').click();
    const register=candidate.locator('[data-gm-guide-stage="1"]');
    assert.ok(await register.isVisible());
    assert.ok((await register.locator('img').getAttribute('src')).includes('register-public'));
    assert.equal(await register.locator('a.gm-button').getAttribute('href'),'https://dcg-growmatch.vercel.app/#register');
    const img=register.locator('img');
    await img.evaluate(async element=>{element.loading='eager';await element.decode()});
    assert.ok(await img.evaluate(element=>element.naturalWidth>=1000),'real screenshot must be bundled and load');
    await register.locator('[data-gm-guide-zoom]').click();
    assert.equal(await guide.locator('#gm-guide-image-dialog').evaluate(el=>el.open),true,'image zoom opens');
    await guide.locator('[data-gm-guide-close]').click();
    assert.equal(await guide.locator('#gm-guide-image-dialog').evaluate(el=>el.open),false,'image zoom closes');
    await candidate.locator('[data-gm-guide-next]').click();
    assert.ok(await candidate.locator('[data-gm-guide-stage="2"]').isVisible(),'next step from candidate');
    await candidate.locator('[data-gm-guide-step="2"]').focus();
    await page.keyboard.press('ArrowRight');
    assert.ok(await candidate.locator('[data-gm-guide-stage="3"]').isVisible(),'arrow-key changes steps');

    await guide.locator('[data-gm-guide-tab="employer"]').click();
    const employer=guide.locator('[data-gm-guide-flow="employer"]');
    assert.ok(await employer.isVisible());
    assert.equal(await employer.locator('[data-gm-guide-stage]').count(),4);
    assert.ok(await employer.locator('[data-gm-guide-stage="0"] img').getAttribute('src').then(x=>x.includes('employer-public')));
    const measurements=await page.evaluate(()=>{
      const root=document.querySelector('#gm-guide').getBoundingClientRect();
      return {overflow:document.documentElement.scrollWidth-innerWidth,rootWidth:root.width,left:root.left,right:root.right}
    });
    assert.ok(measurements.overflow<=2,'no horizontal overflow '+JSON.stringify(measurements));
    assert.deepEqual(errors,[],'JS errors');
    if(width===390||width===820||width===1440){
     await guide.locator('[data-gm-guide-tab="overview"]').click();
     const first=guide.locator('[data-gm-guide-flow="overview"] [data-gm-guide-stage="0"] img');
     await first.evaluate(async element=>{element.loading='eager';await element.decode()});
     await guide.screenshot({path:'qa-growmatch-guide/'+engine+'-'+width+'.png',animations:'disabled'});
    }
    result.push({engine,width,status:'PASS'});console.log('PASS GUIDE',engine,width);
   }catch(e){
    result.push({engine,width,status:'FAIL',error:e.message});
    console.error('FAIL GUIDE',engine,width,e.message);
   }finally{await page.close()}
  }
 }finally{await browser.close()}
}
writeFile('qa-growmatch-guide/results.json',JSON.stringify(result,null,2));
if(result.some(x=>x.status==='FAIL'))process.exitCode=1;
