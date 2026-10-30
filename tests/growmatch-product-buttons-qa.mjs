import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium,webkit} from 'playwright';
const site=process.env.SITE_URL || 'http://127.0.0.1:5173';
const variants=[['chromium',chromium,[360,390,820,1024,1440]],['webkit',webkit,[390,820,1440]]];
await mkdir('qa-growmatch-product-buttons',{recursive:true});
const outputs=[];
for(const [engine,driver,widths] of variants){
 const browser=await driver.launch({headless:true});
 try{
  for(const width of widths){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
   const pageErrors=[];page.on('pageerror',error=>pageErrors.push(error.message));
   try{
    const response=await page.goto(site+'/du-an/dcg-growmatch',{waitUntil:'domcontentloaded',timeout:30000});
    assert.equal(response?.status(),200,'project route returns 200');
    const product=page.locator('.gm-product-showcase');
    await product.waitFor({state:'visible',timeout:12000});
    await product.scrollIntoViewIfNeeded();
    const photo=product.locator('.gm-product-shot img');
    assert.equal(await photo.getAttribute('src'),'/assets/guide/growmatch-home-public-20261030.jpg');
    await photo.evaluate(async img=>{
      img.loading='eager';
      await img.decode();
    });
    const imageStat=await photo.evaluate(img=>({width:img.naturalWidth,height:img.naturalHeight,complete:img.complete}));
    assert.deepEqual(imageStat,{width:1440,height:900,complete:true},
      'real JPG asset decodes in '+engine+' '+width+'px');
    const controls=product.locator('.gm-product-actions > a.gm-button');
    assert.equal(await controls.count(),2);
    assert.equal(await controls.nth(0).getAttribute('href'),'https://dcg-growmatch.vercel.app/');
    assert.equal(await controls.nth(1).getAttribute('href'),'#gm-guide');
    const rects=await controls.evaluateAll(els=>els.map(el=>{
      const r=el.getBoundingClientRect(),st=getComputedStyle(el);
      const label=el.querySelector('span')?.getBoundingClientRect();
      return {width:r.width,height:r.height,x:r.x,background:st.backgroundColor,
       color:st.color,labelWidth:label?.width,labelHeight:label?.height,borderRadius:st.borderRadius};
    }));
    assert.ok(Math.abs(rects[0].width-rects[1].width)<=2,'buttons equal width '+JSON.stringify(rects));
    assert.ok(Math.abs(rects[0].height-rects[1].height)<=2,'buttons equal height '+JSON.stringify(rects));
    assert.ok(rects.every(r=>r.height>=53),'both have finger-sized hit targets');
    assert.ok(rects.every(r=>r.labelHeight<r.height-9),'no clipped or overflowing text');
    assert.notEqual(rects[0].background,rects[1].background,'blue-primary vs white-outlined secondary');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert.ok(overflow<=2,'no horizontal overflow '+overflow);
    assert.deepEqual(pageErrors,[],'no JS errors');
    await product.screenshot({path:'qa-growmatch-product-buttons/'+engine+'-'+width+'.png',animations:'disabled'});
    await controls.nth(1).click();
    assert.equal(new URL(page.url()).hash,'#gm-guide','secondary action navigates to guide section');
    outputs.push({engine,width,status:'PASS',imageStat,rects});
    console.log('PASS PRODUCT BUTTONS',engine,width);
   }catch(e){
    outputs.push({engine,width,status:'FAIL',error:e.message});
    console.error('FAIL PRODUCT BUTTONS',engine,width,e.message);
   }finally{await page.close()}
  }
 }finally{await browser.close()}
}
await writeFile('qa-growmatch-product-buttons/results.json',JSON.stringify(outputs,null,2));
if(outputs.some(x=>x.status==='FAIL'))process.exitCode=1;
