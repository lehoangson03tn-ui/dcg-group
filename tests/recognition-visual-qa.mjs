import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const url=process.env.SITE_URL||'http://127.0.0.1:5173/';
const source='https://ntt.edu.vn/nttu-tim-kiem-nha-quan-tri-tuong-lai-qua-cuoc-thi-ceo-thoi-dai-so/';
const quote='Tôi tin vào sức sáng tạo của người Việt. Chúng tôi xây dựng DCG để kết nối con người và công nghệ, biến những ý tưởng tốt thành sản phẩm có ích cho cuộc sống.';
const sizes=[390,768,834,1024,1440];
const browser=await chromium.launch({headless:true});
const fails=[];
await mkdir('recognition-screenshots',{recursive:true});
try{
 for(const width of sizes){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
   try{
     const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
     assert.equal(response.status(),200,'Homepage returns 200');
     const section=page.locator('#dau-an-va-ghi-nhan');
     assert.equal(await section.count(),1,'Exactly one section');
     const main=section.locator('[data-photo="main"]');
     const supplementary=section.locator('[data-photo="supplement"]');
     await section.locator('img').evaluateAll(async images=>{
       images.forEach(img=>img.loading='eager');
       await Promise.all(images.map(async img=>{
         if(!img.complete)await new Promise((ok,no)=>{img.onload=ok;img.onerror=no;});
         if(img.decode)await img.decode();
       }));
     });
     await page.evaluate(()=>document.fonts.ready);
     const metrics=await page.evaluate(()=>{
       const sec=document.querySelector('#dau-an-va-ghi-nhan');
       const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom,right:r.right};};
       const imgs=[...sec.querySelectorAll('figure img')];
       const p=sec.querySelector('.recognition-main-photo'),copy=sec.querySelector('.recognition-copy'),secondary=sec.querySelector('.recognition-secondary-photo');
       const link=sec.querySelector('.recognition-source');
       const lead=sec.querySelector('.recognition-heading');
       const project=document.querySelector('.projects-home'),contact=document.querySelector('.end-banner');
       return {
         viewport:innerWidth,zoom:window.visualViewport?.scale,overflow:document.documentElement.scrollWidth-window.innerWidth,
         placement:!!(project.compareDocumentPosition(sec)&Node.DOCUMENT_POSITION_FOLLOWING)&&!!(sec.compareDocumentPosition(contact)&Node.DOCUMENT_POSITION_FOLLOWING),
         heading:sec.querySelector('h2').textContent.trim(),
         evidence:sec.querySelector('.recognition-label').textContent.trim(),
         description:[...sec.querySelectorAll('.recognition-copy>p:not(.recognition-label)')].map(x=>x.textContent.trim()),
         captions:[...sec.querySelectorAll('figcaption')].map(x=>x.textContent.trim()),
         imageData:imgs.map(img=>({source:img.getAttribute('src'),width:img.naturalWidth,height:img.naturalHeight,fit:getComputedStyle(img).objectFit,renderWidth:rect(img).width,renderHeight:rect(img).height})),
         img1:rect(p),copy:rect(copy),img2:rect(secondary),lead:rect(lead),link:rect(link),
         sourceHref:link.getAttribute('href'),sourceTarget:link.getAttribute('target'),
         gridColumns:getComputedStyle(sec.querySelector('.recognition-grid')).gridTemplateColumns,
         background:getComputedStyle(sec).backgroundColor,
         ceoQuote:document.querySelector('.founder-message')?.textContent||''
       };
     });
     assert.equal(metrics.viewport,width);
     assert.equal(metrics.zoom,1);
     assert.ok(metrics.overflow<=2,'No horizontal scroll: '+metrics.overflow);
     assert.ok(metrics.placement,'Located after projects before contact');
     assert.equal(metrics.heading,'Dấu ấn và ghi nhận');
     assert.equal(metrics.evidence,'TOP 5 VÒNG CHUNG KẾT · 2026');
     assert.ok(metrics.description[0].includes('Đội ĐÀN CÁ GỖ góp mặt trong Top 5 vòng chung kết'));
     assert.ok(metrics.description[1].includes('đội đã trình bày dự án và bảo vệ phương án trước hội đồng giám khảo.'));
     assert.equal(metrics.captions[0],'Khoảnh khắc trao giải tại cuộc thi Nhà quản trị tương lai lần 6');
     assert.equal(metrics.captions[1],'Trương Quốc Huy tham dự cuộc thi CEO thời đại số');
     assert.deepEqual(metrics.imageData.map(i=>i.source),[
      '/assets/recognition/NTTU_0058.jpeg',
      '/assets/recognition/FBA1C8B9-ED38-42D6-8EF9-50CBECBFA44D.jpeg'
     ]);
     assert.ok(metrics.imageData.every(i=>i.width===1536&&i.height===1024&&i.fit==='contain'),'Full-resolution original uncropped images');
     assert.ok(metrics.imageData.every(i=>Math.abs(i.renderWidth/i.renderHeight-1.5)<0.02),'Natural 3:2 image ratios');
     assert.equal(metrics.background,'rgb(240, 245, 250)');
     assert.equal(metrics.sourceHref,source);
     assert.equal(metrics.sourceTarget,'_blank');
     assert.ok(metrics.ceoQuote.includes(quote),'Preserve CEO approved quote');
     if(width<=960){
       assert.ok(metrics.lead.bottom<=metrics.img1.y+2,'Mobile order heading before image');
       assert.ok(metrics.img1.bottom<=metrics.copy.y+3,'Mobile image before content');
       assert.ok(metrics.img2.bottom<metrics.link.y+2,'Mobile secondary image before source');
       assert.ok(Math.abs((metrics.img1.x+metrics.img1.width/2)-width/2)<3,'Main photo centered');
       assert.ok(Math.abs((metrics.img2.x+metrics.img2.width/2)-width/2)<4,'Second photo centered');
     }else{
       assert.ok(metrics.copy.x>=metrics.img1.right+32,'Desktop two-column structure');
       assert.ok(metrics.img2.width<=322,'Desktop secondary photo limited width');
     }
     // Open first image through pointer and dismiss with Escape.
     await main.focus();
     await main.click();
     const dialog=page.locator('#recognition-lightbox');
     await dialog.waitFor({state:'visible'});
     assert.equal(await dialog.evaluate(el=>el.open),true);
     assert.ok((await dialog.locator('img').getAttribute('src')).includes('NTTU_0058.jpeg'));
     await page.keyboard.press('Escape');
     assert.equal(await dialog.evaluate(el=>el.open),false,'Escape closes dialog');
     assert.equal(await main.evaluate(el=>document.activeElement===el),true,'Escape restores original focus');
     // Open supporting image with keyboard and close by explicit button.
     await supplementary.focus();
     await page.keyboard.press('Enter');
     assert.equal(await dialog.evaluate(el=>el.open),true,'Keyboard opens second image');
     assert.ok((await dialog.locator('img').getAttribute('src')).includes('FBA1C8B9'));
     await dialog.locator('.recognition-lightbox-close').click();
     assert.equal(await dialog.evaluate(el=>el.open),false,'Close button dismisses dialog');
     assert.equal(await supplementary.evaluate(el=>document.activeElement===el),true,'Focus restored to second image');
     if(width===390||width===1440){
       await section.screenshot({path:'recognition-screenshots/recognition-'+width+'.png',animations:'disabled',timeout:25000});
     }
     console.log('PASS recognition '+width+'px',JSON.stringify({grid:metrics.gridColumns,images:metrics.imageData.map(i=>i.source),overflow:metrics.overflow}));
   }catch(e){
      fails.push(width+'px: '+e.message);console.error('FAIL '+width+'px: '+e.message);
      await page.screenshot({path:'recognition-screenshots/failure-'+width+'.png',fullPage:true}).catch(()=>{});
   }finally{await page.close();}
 }
}finally{await browser.close();}
if(fails.length){console.error(fails.join('\n'));process.exitCode=1;}else console.log('PASS ALL recognition layout/lightbox tests');
