import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';
const base=process.env.SITE_URL||'http://127.0.0.1:5173';
const widths=[390,430,768,834,1024,1440];
const pages=['/','/he-sinh-thai','/he-sinh-thai/dcg-talent','/du-an','/du-an/dcg-growmatch','/giai-phap','/giai-phap/dcg-growmatch','/he-sinh-thai/dcg-studio','/he-sinh-thai/dcg-vision','/he-sinh-thai/dcg-entertainment'];
const newName='talent-student-collaboration-1600.webp';
const oldName='FBA1C8B9-ED38-42D6-8EF9-50CBECBFA44D.jpeg';
const originalAward='NTTU_0058.jpeg';
const browser=await chromium.launch({headless:true});
const issues=[],observations=[];
await mkdir('talent-free-photo-qa',{recursive:true});
try{
 for(const width of widths){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
  try{
   const errors=[];page.on('pageerror',err=>errors.push(err.message));
   for(const path of pages){
    const response=await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:30000});
    assert.equal(response.status(),200,'HTTP '+path);
    await page.evaluate(()=>document.fonts.ready);
    const d=await page.evaluate(()=>{
      const imgs=[...document.querySelectorAll('main img')];
      const talent=imgs.filter(im=>(im.getAttribute('src')||'').includes('talent-student-collaboration'));
      return{
       path:location.pathname,width:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,
       publicCredits:document.querySelectorAll('.editorial-photo-credit,.editorial-card-credit,.editorial-hero-caption,.editorial-credit-label').length,
       sourceLinks:[...document.querySelectorAll('main a[href]')].filter(a=>a.href.startsWith('https://unsplash.com/')).length,
       talent:talent.map(im=>({src:im.getAttribute('src'),alt:im.alt,ratio:im.getAttribute('height'),fit:getComputedStyle(im).objectFit,natural:[im.naturalWidth,im.naturalHeight]})),
       oldEvent:imgs.filter(im=>(im.getAttribute('src')||'').includes('FBA1C8B9')).length,
       stageEvent:imgs.filter(im=>(im.getAttribute('src')||'').includes('NTTU_0058')).length,
       hasAward:!!document.querySelector('#thanh-tich'),
       photographerVisible:(document.querySelector('main')?.innerText||'').includes('Kate Le / Unsplash'),
       heroPhotoSourceLink:document.querySelectorAll('.hero-media-tag a').length,
       visualGroup:[...document.querySelectorAll('.brand-row')].map(r=>({name:r.querySelector('.brand-inline strong')?.textContent.trim(),image:r.querySelector('img.editorial-photo')?.getAttribute('src'),credit:r.querySelector('figcaption')?.textContent.trim()||'',first:r.querySelector('.brand-row-identity')?.getBoundingClientRect().y,photo:r.querySelector('.brand-row-image')?.getBoundingClientRect().y}))
      };
    });
    assert.equal(d.width,width);
    assert.ok(d.overflow<=2,'No page horizontal overflow '+width+' '+path+': '+d.overflow);
    assert.equal(d.publicCredits,0,'No visible photographer/source strips on '+path);
    assert.equal(d.sourceLinks,0,'No visible Unsplash source links on '+path);
    assert.equal(d.photographerVisible,false);
    assert.equal(d.heroPhotoSourceLink,0);
    if(path==='/'){
      assert.equal(d.talent.length,1,'New Talent image on homepage');
      assert.equal(d.oldEvent,0,'Remove contest portrait from homepage');
      assert.equal(d.stageEvent,0,'Award photo not on homepage');
      assert.equal(d.visualGroup.length,4);
      assert.equal(d.visualGroup[0].name,'DCG TALENT');
      assert.ok(d.visualGroup[0].image.includes(newName));
      assert.deepEqual(d.visualGroup.map(x=>x.credit),['','','','']);
      if(width<1100)assert.ok(d.visualGroup[0].first<d.visualGroup[0].photo,'Tablet identity remains ahead of image');
    }
    if(['/he-sinh-thai','/he-sinh-thai/dcg-talent','/du-an','/du-an/dcg-growmatch','/giai-phap','/giai-phap/dcg-growmatch'].includes(path)){
      assert.ok(d.talent.length>=1,'New Talent illustration missing '+path);
    }
    if(path==='/he-sinh-thai/dcg-talent'){
      const hero=page.locator('.editorial-detail-figure img.editorial-photo--talent');
      await hero.evaluate(async img=>{
       img.loading='eager';if(!img.complete)await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject});await img.decode();
      });
      const attrs=await hero.evaluate(img=>({src:img.getAttribute('src'),width:img.naturalWidth,height:img.naturalHeight,fit:getComputedStyle(img).objectFit,alt:img.alt}));
      assert.ok(attrs.src.includes(newName));
      assert.equal(attrs.fit,'cover','Landscape Talent photo fills brand frame');
      assert.ok(attrs.width>=360 && attrs.height>=200,'Responsive density-corrected image dimensions');
      assert.ok(Math.abs(attrs.width/attrs.height-16/9)<0.02,'Preserve landscape photo aspect 16:9');
      assert.ok(attrs.alt.includes('ảnh minh họa'));
      if([390,834,1440].includes(width))await page.locator('.detail-head').screenshot({path:'talent-free-photo-qa/talent-detail-'+width+'.png',animations:'disabled',timeout:20000});
    }
    if(path==='/du-an/dcg-growmatch'){
      assert.equal(d.stageEvent,1,'Award photo maintained in separate full article');
      assert.equal(d.oldEvent,1,'Meeting photo maintained in separate full article');
      assert.equal(d.hasAward,true);
      assert.equal(await page.locator('.recognition-source').getAttribute('href'),'https://ntt.edu.vn/nttu-tim-kiem-nha-quan-tri-tuong-lai-qua-cuoc-thi-ceo-thoi-dai-so/');
    }else assert.equal(d.oldEvent,0,'NTTU attendance picture should only appear in article');
    if(path==='/'&&[390,834,1440].includes(width)){
      const row=page.locator('.brand-row').first();
      await row.locator('img.editorial-photo').evaluate(async img=>{
       img.loading='eager';if(!img.complete)await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject});await img.decode();
      });
      await row.screenshot({path:'talent-free-photo-qa/talent-row-'+width+'.png',animations:'disabled',timeout:20000});
    }
    observations.push({width,path,status:'PASS'});
   }
   assert.deepEqual(errors,[],'No browser JS errors at '+width);
   console.log('PASS ALL FREE-PHOTO/CREDIT ROUTES AT',width+'px');
  }catch(e){issues.push(width+'px: '+e.message);console.error('FAIL',width,e.message);await page.screenshot({path:'talent-free-photo-qa/failure-'+width+'.png',fullPage:true}).catch(()=>{});}
  finally{await page.close();}
 }
}finally{await browser.close();}
await writeFile('talent-free-photo-qa/report.json',JSON.stringify({observations,issues},null,2));
if(issues.length){console.error('FAILURES:\n'+issues.join('\n'));process.exitCode=1;}else console.log('PASS 60 route/viewport combinations');
