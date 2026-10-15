import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';

const base=process.env.SITE_URL||'http://127.0.0.1:5173';
const widths=[390,430,768,834,1024,1440];
const exact=[
'Đội thi của DCG GROWMATCH, tham dự dưới tên ĐÀN CÁ GỖ, đã vào Top 5 vòng chung kết và nhận giải tại cuộc thi “Nhà quản trị tương lai lần 6: CEO thời đại số”. Kết quả ghi nhận nỗ lực của tập thể trong việc đưa ý tưởng ứng dụng AI vào bài toán đánh giá năng lực và kết nối cơ hội nghề nghiệp.',
'Cuộc thi do Khoa Quản trị Kinh doanh, Trường Đại học Nguyễn Tất Thành tổ chức, yêu cầu các đội trình bày dự án và bảo vệ phương án trước hội đồng giám khảo gồm các chuyên gia, đại diện doanh nghiệp. Đây là dịp để đội thi kiểm nghiệm cách tiếp cận của mình qua những câu hỏi về quản trị và khả năng triển khai.',
'DCG GROWMATCH tham dự với đề tài “Ứng dụng trí tuệ nhân tạo trong đánh giá năng lực và kết nối sinh viên với cơ hội việc làm phù hợp”. Trọng tâm của đề tài là hỗ trợ sinh viên hiểu rõ năng lực, từ đó có thêm cơ sở để lựa chọn cơ hội nghề nghiệp phù hợp.',
'Tại vòng chung kết, đội trình bày dự án và trực tiếp trả lời các câu hỏi phản biện của hội đồng giám khảo. Quá trình này đòi hỏi các thành viên kết nối ý tưởng công nghệ với tư duy quản trị, giải thích phương án và bảo vệ những lựa chọn của đội.',
'Thành tích tại CEO thời đại số là niềm tự hào chung của đội ngũ DCG GROWMATCH. Phía sau kết quả là công sức xây dựng đề tài, chuẩn bị nội dung và cùng nhau bảo vệ dự án. Với tập thể, dấu mốc này tiếp thêm động lực để hoàn thiện giải pháp, hướng đến việc giúp người trẻ hiểu năng lực của mình và chủ động hơn trên hành trình nghề nghiệp.'
];
const paths=['/assets/recognition/NTTU_0058.jpeg','/assets/recognition/FBA1C8B9-ED38-42D6-8EF9-50CBECBFA44D.jpeg'];
const source='https://ntt.edu.vn/nttu-tim-kiem-nha-quan-tri-tuong-lai-qua-cuoc-thi-ceo-thoi-dai-so/';
const browser=await chromium.launch({headless:true});
const results=[],issues=[];
await mkdir('growmatch-recognition-qa',{recursive:true});
const check=(truth,msg)=>assert.ok(truth,msg);

try{
 for(const width of widths){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
  try{
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   let response=await page.goto(base+'/',{waitUntil:'networkidle',timeout:45000});
   assert.equal(response.status(),200);
   const summary=page.locator('.growmatch-recognition-summary');
   assert.equal(await summary.count(),1,'Exactly one home summary');
   assert.equal(await page.locator('#dau-an-va-ghi-nhan').count(),0,'No old standalone section');
   assert.equal(await page.locator('.growmatch-award-section').count(),0,'No full award article on home');
   assert.equal(await summary.locator('h3').innerText(),'Top 5 vòng chung kết CEO thời đại số');
   assert.equal(await summary.locator('.growmatch-summary-label').innerText(),'THÀNH TÍCH DCG GROWMATCH');
   assert.equal(await summary.locator('.growmatch-summary-description').innerText(),'Đội thi DCG GROWMATCH, tham dự dưới tên ĐÀN CÁ GỖ, vào Top 5 vòng chung kết và nhận giải với đề tài ứng dụng AI trong đánh giá năng lực và kết nối cơ hội việc làm.');
   assert.equal(await summary.locator('.growmatch-summary-event').innerText(),'Nhà quản trị tương lai lần 6 · 2026');
   assert.equal(await summary.locator('.growmatch-summary-link').getAttribute('href'),'/du-an/dcg-growmatch#thanh-tich');
   await summary.locator('img').evaluate(async img=>{
    img.loading='eager';
    if(!img.complete)await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject});
    await img.decode();
   });
   const homeState=await page.evaluate(()=>{
     const r=e=>{const a=e.getBoundingClientRect();return {x:a.x,y:a.y,bottom:a.bottom,right:a.right,width:a.width}};
     const sum=document.querySelector('.growmatch-recognition-summary');
     const group=document.querySelector('.growmatch-project-group');
     const intro=group.querySelector('.growmatch-project-intro .project-line');
     const following=document.querySelector('.growmatch-following-project .project-line');
     const img=sum.querySelector('img');
     const brand=document.querySelector('.founder-message')?.textContent||'';
     return {insideGroup:group.contains(sum),prev:intro.querySelector('h3').textContent.trim(),next:following.querySelector('h3').textContent.trim(),
       bg:getComputedStyle(group).backgroundColor,summaryBg:getComputedStyle(sum).backgroundColor,overflow:document.documentElement.scrollWidth-innerWidth,
       grid:getComputedStyle(sum).gridTemplateColumns,photo:r(img),label:r(sum.querySelector('.growmatch-summary-label')),heading:r(sum.querySelector('h3')),
       description:r(sum.querySelector('.growmatch-summary-description')),ceo:brand,logo:document.querySelectorAll('.brand-inline').length,
       imageNatural:[img.naturalWidth,img.naturalHeight],font:getComputedStyle(document.body).fontFamily};
   });
   assert.equal(homeState.insideGroup,true,'Summary within full-width GrowMatch project group');
   assert.equal(homeState.summaryBg,'rgba(0, 0, 0, 0)','Summary must not own blue background');
   assert.equal(homeState.prev,'DCG GROWMATCH');
   assert.equal(homeState.next,'LUMIQC');
   assert.equal(homeState.bg,'rgb(240, 245, 250)');
   assert.ok(homeState.ceo.includes('Tôi tin vào sức sáng tạo của người Việt.'));
   assert.equal(homeState.logo,4,'Four ecosystem brands remain');
   assert.deepEqual(homeState.imageNatural,[1536,1024]);
   check(homeState.font.toLowerCase().includes('be vietnam pro'),'Vietnamese font preserved');
   check(homeState.overflow<=2,'No home overflow');
   if(width<=900){check(homeState.heading.bottom<=homeState.photo.y+2,'Mobile/tablet: title before image');check(homeState.photo.bottom<=homeState.description.y+2,'Mobile/tablet: image before prose');}
   else check(homeState.photo.right+25<=homeState.description.x,'Desktop: photo left and copy right');

   response=await page.goto(base+'/du-an/dcg-growmatch#thanh-tich',{waitUntil:'networkidle',timeout:45000});
   assert.equal(response.status(),200);
   const article=page.locator('#thanh-tich');
   assert.equal(await article.count(),1,'One full article');
   assert.equal(await page.locator('main h1').count(),1,'One H1 on project detail');
   assert.equal(await article.locator('h2').innerText(),'Thành tích và ghi nhận');
   assert.equal(await article.locator('.growmatch-award-brand').innerText(),'DCG GROWMATCH · 2026');
   assert.equal(await article.locator('h3').innerText(),'DCG GROWMATCH ghi dấu ấn tại CEO thời đại số');
   assert.equal(await article.locator('.growmatch-award-result').innerText(),'Top 5 vòng chung kết');
   assert.deepEqual(await article.locator('.growmatch-award-prose>p').allInnerTexts(),exact);
   assert.deepEqual(await article.locator('h4').allInnerTexts(),['Đưa bài toán nghề nghiệp đến sân chơi quản trị','Sự ghi nhận dành cho nỗ lực tập thể']);
   assert.equal(await article.locator('.recognition-source').getAttribute('href'),source);
   assert.equal(await article.locator('.growmatch-award-figure').count(),2);
   await article.locator('img').evaluateAll(async imgs=>{
    imgs.forEach(img=>img.loading='eager');
    await Promise.all(imgs.map(async img=>{
      if(!img.complete)await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject});
      await img.decode();
    }));
   });
   await page.evaluate(()=>document.fonts.ready);
   const metrics=await page.evaluate(()=>{
     const r=e=>{const v=e.getBoundingClientRect();return {x:v.x,y:v.y,width:v.width,height:v.height,right:v.right,bottom:v.bottom}};
     const sec=document.querySelector('#thanh-tich');
     const figs=[...sec.querySelectorAll('.growmatch-award-figure')];
     const imgs=figs.map(f=>f.querySelector('img'));
     const captions=figs.map(f=>{
       const cap=f.querySelector('figcaption');
       return {text:cap.textContent.trim().replace(/\s+/g,' '),
         person:cap.querySelector('.award-caption-person').textContent.trim().replace(/\s+/g,' '),
         event:cap.querySelector('.award-caption-event').textContent.trim(),centering:getComputedStyle(cap).textAlign,
         dash:getComputedStyle(cap.querySelector('.award-caption-dash')).display,
         nameDisplay:getComputedStyle(cap.querySelector('.award-caption-name')).display,
         personBlock:getComputedStyle(cap.querySelector('.award-caption-person')).display,
         font:parseFloat(getComputedStyle(cap).fontSize),lineHeight:parseFloat(getComputedStyle(cap).lineHeight)};
     });
     const h=sec.querySelector('.growmatch-award-header'),prose=sec.querySelector('.growmatch-award-prose'),main=document.querySelector('main');
     return {width:innerWidth,visualScale:window.visualViewport?.scale,scroll:document.documentElement.scrollWidth-innerWidth,
       anchorTop:r(sec).y,header:r(h),prose:r(prose),shell:r(sec.querySelector('.growmatch-award-shell')),
       figs:figs.map(r),imgs:imgs.map(im=>({src:im.getAttribute('src'),naturalWidth:im.naturalWidth,naturalHeight:im.naturalHeight,fit:getComputedStyle(im).objectFit,rect:r(im)})),
       captions,headingColors:[...main.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(e=>getComputedStyle(e).color!=='rgb(20, 45, 78)').map(e=>e.textContent.trim()),
       oldSection:document.querySelectorAll('#dau-an-va-ghi-nhan').length};
   });
   assert.deepEqual(metrics.imgs.map(x=>x.src),paths);
   check(metrics.imgs.every(x=>x.naturalWidth===1536&&x.naturalHeight===1024&&x.fit==='contain'),'Original photos, not cropped');
   check(metrics.scroll<=2,'No horizontal overflow '+metrics.scroll);
   check(metrics.visualScale===1,'Browser zoom 100%');
   check(metrics.figs.every(x=>Math.abs(x.width-metrics.figs[0].width)<1 && Math.abs(x.x-metrics.figs[0].x)<1),'Figures identical width and alignment');
   check(metrics.figs[0].width<=962 && metrics.prose.width<=792 && metrics.shell.width<=1122,'Editorial widths');
   check(metrics.imgs.every(x=>Math.abs(x.rect.width/x.rect.height-1.5)<.025),'Original photo 3:2 presentation');
   check(metrics.captions.every(x=>x.centering==='center' && x.personBlock==='block' && x.event),'Two center-aligned caption groups');
   check(metrics.captions.every(x=>x.person.includes('Trương Quốc Huy')&&x.person.includes('DCG GROUP') && x.event.includes('DCG GROWMATCH')),'Correct full names in captions');
   check(metrics.headingColors.length===0,'Navy headings');
   if(width<=600){check(metrics.captions.every(x=>x.dash==='none'&&x.nameDisplay==='block'),'Mobile captions hide dash and split name/role')}
   // The fixed header must not cover the requested anchor.
   check(metrics.anchorTop>=-2,'Anchor not above viewport '+metrics.anchorTop);
   const first=article.locator('.recognition-photo-trigger').first(),second=article.locator('.recognition-photo-trigger').nth(1);
   await first.focus();await page.keyboard.press('Enter');
   const dialog=page.locator('#recognition-lightbox');
   assert.equal(await dialog.evaluate(el=>el.open),true);
   assert.ok((await dialog.locator('img').getAttribute('src')).includes('NTTU_0058.jpeg'));
   await page.keyboard.press('Escape');
   assert.equal(await dialog.evaluate(el=>el.open),false);
   assert.equal(await first.evaluate(el=>document.activeElement===el),true,'Escape restores focus to first image');
   await second.click();assert.equal(await dialog.evaluate(el=>el.open),true);
   assert.ok((await dialog.locator('img').getAttribute('src')).includes('FBA1C8B9'));
   await dialog.locator('.recognition-lightbox-close').click();
   assert.equal(await dialog.evaluate(el=>el.open),false);
   assert.equal(await second.evaluate(el=>document.activeElement===el),true,'Close restores focus to second image');
   assert.deepEqual(errors,[],'No JS errors');
   if(width===390||width===834||width===1440){
     await article.screenshot({path:'growmatch-recognition-qa/article-'+width+'.png',animations:'disabled',timeout:25000});
     await page.goto(base+'/',{waitUntil:'domcontentloaded'});
     await page.locator('.growmatch-recognition-summary').screenshot({path:'growmatch-recognition-qa/summary-'+width+'.png',animations:'disabled',timeout:25000});
   }
   results.push({width,home:homeState,article:metrics});
   console.log('PASS GROWMATCH RECOGNITION',width,'px');
  }catch(e){issues.push(width+'px '+e.message);console.error('FAIL',width,e.message);
   await page.screenshot({path:'growmatch-recognition-qa/failure-'+width+'.png',fullPage:true}).catch(()=>{});
  }finally{await page.close();}
 }
 const legacy=await browser.newPage({viewport:{width:390,height:800}});
 await legacy.goto(base+'/#dau-an-va-ghi-nhan',{waitUntil:'domcontentloaded'});
 await legacy.waitForURL('**/du-an/dcg-growmatch#thanh-tich',{timeout:12000});
 check((await legacy.locator('#thanh-tich').count())===1,'Legacy anchor forwarded to project article');
 await legacy.close();
}finally{await browser.close();}
await writeFile('growmatch-recognition-qa/report.json',JSON.stringify({results,issues},null,2));
if(issues.length){console.error(issues.join('\n'));process.exitCode=1;}else console.log('ALL SIX RESPONSIVE GROWMATCH TESTS PASSED');
