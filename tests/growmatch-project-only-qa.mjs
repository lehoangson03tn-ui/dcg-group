import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';
const base=process.env.SITE_URL||'http://127.0.0.1:5173';
const sizes=[390,430,768,834,1024,1440];
const browser=await chromium.launch({headless:true});
const failures=[];
await mkdir('qa-growmatch-project-only',{recursive:true});
try{
 for(const width of sizes){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
  try{
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const response=await page.goto(base+'/',{waitUntil:'domcontentloaded',timeout:30000});
   assert.equal(response.status(),200);
   const state=await page.evaluate(()=>{
     const project=document.querySelector('.growmatch-project-group');
     return {
       width:innerWidth,
       overflow:document.documentElement.scrollWidth-innerWidth,
       summaryCount:document.querySelectorAll('.growmatch-recognition-summary,.growmatch-summary-image,#growmatch-recognition-summary-title').length,
       summaryHeadline:document.querySelector('main')?.textContent.includes('Top 5 vòng chung kết CEO thời đại số'),
       stageImageCount:document.querySelectorAll('main img[src*="NTTU_0058.jpeg"]').length,
       standaloneCount:document.querySelectorAll('#dau-an-va-ghi-nhan').length,
       projectLink:project?.querySelector('a.project-line')?.getAttribute('href'),
       projectHeading:project?.querySelector('h3')?.textContent.trim(),
       nextProject:document.querySelector('.growmatch-following-project h3')?.textContent.trim(),
       founder:document.querySelector('.founder-message')?.textContent.trim(),
       brandCount:document.querySelectorAll('.brand-row').length,
       groupBackground:project?getComputedStyle(project).backgroundColor:null
     };
   });
   assert.equal(state.width,width);
   assert.ok(state.overflow<=2,'No home horizontal overflow');
   assert.equal(state.summaryCount,0,'No homepage achievement summary');
   assert.equal(state.summaryHeadline,false,'Award title not on homepage');
   assert.equal(state.stageImageCount,0,'Stage awards photo not on homepage');
   assert.equal(state.standaloneCount,0);
   assert.equal(state.projectLink,'/du-an/dcg-growmatch');
   assert.equal(state.projectHeading,'DCG GROWMATCH');
   assert.equal(state.nextProject,'LUMIQC');
   assert.equal(state.groupBackground,'rgb(240, 245, 250)');
   assert.ok(state.founder.includes('Tôi tin vào sức sáng tạo của người Việt.'));
   assert.equal(state.brandCount,4);
   if([390,834,1440].includes(width)){
     await page.locator('.projects-home').screenshot({path:'qa-growmatch-project-only/home-projects-'+width+'.png',animations:'disabled',timeout:20000});
   }
   const detail=await page.goto(base+'/du-an/dcg-growmatch#thanh-tich',{waitUntil:'domcontentloaded',timeout:30000});
   assert.equal(detail.status(),200);
   assert.equal(await page.locator('#thanh-tich').count(),1,'Full detail article present');
   assert.equal(await page.locator('.growmatch-award-figure').count(),2);
   assert.equal(await page.locator('.growmatch-award-figure img[src*="NTTU_0058.jpeg"]').count(),1);
   assert.equal(await page.locator('.growmatch-award-figure img[src*="FBA1C8B9"]').count(),1);
   assert.equal(await page.locator('.growmatch-award-title').innerText(),'DCG GROWMATCH ghi dấu ấn tại CEO thời đại số');
   assert.equal(await page.locator('.growmatch-award-result').innerText(),'Top 5 vòng chung kết');
   assert.equal(await page.locator('.recognition-source').getAttribute('href'),'https://ntt.edu.vn/nttu-tim-kiem-nha-quan-tri-tuong-lai-qua-cuoc-thi-ceo-thoi-dai-so/');
   const stage=page.locator('.growmatch-award-figure').first().locator('img');
   await stage.evaluate(async img=>{img.loading='eager';if(!img.complete)await new Promise((ok,err)=>{img.onload=ok;img.onerror=err});await img.decode();});
   const dim=await stage.evaluate(img=>({naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,fit:getComputedStyle(img).objectFit}));
   assert.deepEqual([dim.naturalWidth,dim.naturalHeight],[1536,1024]);
   assert.equal(dim.fit,'contain');
   assert.deepEqual(errors,[],'No JavaScript errors');
   if(width===390||width===1440)await page.locator('#thanh-tich').screenshot({path:'qa-growmatch-project-only/detail-article-'+width+'.png',animations:'disabled',timeout:24000});
   console.log('PASS',width,'home without achievements; GrowMatch article preserved');
  }catch(err){failures.push(width+'px: '+err.message);console.error('FAIL',width,err.message);await page.screenshot({path:'qa-growmatch-project-only/failure-'+width+'.png',fullPage:true}).catch(()=>{});}
  finally{await page.close();}
 }
 const legacy=await browser.newPage();
 await legacy.goto(base+'/#dau-an-va-ghi-nhan',{waitUntil:'domcontentloaded',timeout:30000});
 await legacy.waitForURL('**/du-an/dcg-growmatch#thanh-tich',{timeout:12000});
 assert.equal(await legacy.locator('#thanh-tich').count(),1,'Old anchor continues to point to separate project article');
 await legacy.close();
}finally{await browser.close();}
await writeFile('qa-growmatch-project-only/results.json',JSON.stringify({widths:sizes,failures},null,2));
if(failures.length){console.error('FAILED: '+failures.join('; '));process.exitCode=1}else console.log('ALL SIX HOME/DETAIL CHECKS PASS');
