import assert from "node:assert/strict";
import {mkdir,writeFile} from "node:fs/promises";
import {chromium,webkit} from "playwright";
const current=process.env.SITE_URL||"http://127.0.0.1:5173";
const previous=process.env.BEFORE_URL||"http://127.0.0.1:5174";
const widths=[390,430,767,768,820,834,1024,1099,1100,1180,1440];
const screens=[390,834,1024,1440];
const failures=[],measured=[];
await mkdir("brand-order-qa",{recursive:true});
const c=await chromium.launch({headless:true});
async function visit(browser,site,width){
 const page=await browser.newPage({viewport:{width,height:950},deviceScaleFactor:1,reducedMotion:"reduce"});
 const response=await page.goto(site+"/",{waitUntil:"domcontentloaded",timeout:30000});
 assert.equal(response.status(),200);
 await page.evaluate(()=>document.fonts.ready);
 await page.locator(".brand-row").first().locator("img.editorial-photo").evaluate(async img=>{
   img.loading="eager";
   if(!img.complete) await Promise.race([new Promise(r=>{img.onload=r;img.onerror=r;}),new Promise(r=>setTimeout(r,8500))]);
   await img.decode().catch(()=>{});
 });
 return page;
}
async function measure(page){
 return await page.evaluate(()=>{
 const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}};
 const styles=e=>getComputedStyle(e);
 return{innerWidth,zoom:visualViewport?.scale??null,overflow:document.documentElement.scrollWidth-innerWidth,
   brands:[...document.querySelectorAll(".brand-row")].map(row=>{
   const name=row.querySelector(".brand-inline strong");
   const identity=row.querySelector(".brand-row-identity");
   const figure=row.querySelector(".brand-row-image");
   const frame=figure?.querySelector(".brand-row-photo-frame");
   const narrative=row.querySelector(".brand-row-narrative");
   const cta=row.querySelector(".link-arrow");
   const credit=row.querySelector("figcaption.editorial-photo-credit")||row.querySelector(".editorial-photo-credit");
   const img=row.querySelector(".brand-row-image img");
   return{
    name:name?.textContent.trim(),identity:identity?rect(identity):null,
    figure:rect(figure),frame:frame?rect(frame):null,narrative:narrative?rect(narrative):null,
    credit:rect(credit),creditText:credit.textContent.trim(),creditTag:credit.tagName,
    creditParent:credit.parentElement?.className,
    photoSrc:img.getAttribute("src"),photoNatural:[img.naturalWidth,img.naturalHeight],photoFit:styles(img).objectFit,
    copyDisplay:styles(row.querySelector(".brand-row-copy")).display,
    rowGrid:styles(row).gridTemplateColumns,
    cta:rect(cta),ctaHref:cta.getAttribute("href"),title:rect(row.querySelector("h3")),
    logoSrc:row.querySelector(".brand-mark__image")?.getAttribute("src")
   }
   }),
   ceo:document.querySelector(".founder-message")?.textContent.trim(),
   eventPhoto:document.querySelector(".growmatch-summary-image img")?.getAttribute("src")
 };
 });
}
try{
 for(const width of [834,1024]){
  const page=await visit(c,previous,width);
  try{
    const old=await page.evaluate(()=>{
      const row=document.querySelector(".brand-row"),img=row.querySelector(".brand-row-image"),title=row.querySelector(".brand-inline");
      const a=img.getBoundingClientRect(),b=title.getBoundingClientRect();
      return{width:innerWidth,imageTop:a.top,brandTitleTop:b.top,creditAfterCta:row.querySelector(".editorial-photo-credit").getBoundingClientRect().top > row.querySelector(".link-arrow").getBoundingClientRect().bottom}
    });
    measured.push({stage:"before",...old});
    assert.ok(old.imageTop<old.brandTitleTop,"Before snapshot should demonstrate ordering bug");
    await page.locator(".brand-row").first().screenshot({path:"brand-order-qa/before-talent-"+width+".png",animations:"disabled",timeout:18000});
    console.log("BEFORE",width,JSON.stringify(old));
  }finally{await page.close()}
 }
 for(const width of widths){
  const page=await visit(c,current,width);
  try{
   const result=await measure(page);
   assert.equal(result.innerWidth,width);
   assert.equal(result.zoom,1);
   assert.ok(result.overflow<=2,"No horizontal overflow "+result.overflow);
   assert.equal(result.brands.length,4);
   assert.deepEqual(result.brands.map(b=>b.name),["DCG TALENT","DCG STUDIO","DCG VISION","DCG ENTERTAINMENT"]);
   for(const [idx,b] of result.brands.entries()){
    assert.ok(b.identity&&b.narrative&&b.frame,"Three semantic brand regions");
    assert.equal(b.creditTag,"FIGCAPTION","Photo source must be a figcaption");
    assert.ok(b.creditParent.includes("brand-row-image"),"Photo credit grouped with image");
    assert.ok(b.creditText.length>=15);
    assert.equal(b.ctaHref,"/he-sinh-thai/dcg-"+["talent","studio","vision","entertainment"][idx]);
    if(width<1100){
      assert.equal(b.copyDisplay,"contents","Tablet copy wrapper does not disrupt grid order");
      assert.ok(b.identity.bottom<=b.figure.y+2,"Brand identity BEFORE photo at "+width+" "+b.name);
      assert.ok(b.figure.bottom<=b.narrative.y+2,"Photo and credit BEFORE summary/CTA at "+width+" "+b.name);
      assert.ok(b.credit.bottom<=b.narrative.y+2,"Photo credit BEFORE narrative at "+width+" "+b.name);
      assert.ok(b.narrative.x>=15&&b.narrative.right<=width-15,"Balanced narrative gutters "+width);
      assert.ok(b.identity.x>=15&&b.identity.right<=width-15,"Balanced identity gutters "+width);
      assert.ok(Math.abs(b.identity.x-b.narrative.x)<=1,"Aligned title and description "+width);
      assert.ok(b.cta.y>=b.narrative.y,"CTA contained in description");
    }else{
      assert.ok(b.copyDisplay!=="contents","Desktop keeps two real columns");
      assert.ok(b.figure.x>=b.identity.right-2 || b.figure.right<=b.identity.x+2,"Desktop photo alongside text");
    }
    if(idx===0){
      assert.equal(b.photoSrc,"/assets/recognition/FBA1C8B9-ED38-42D6-8EF9-50CBECBFA44D.jpeg","Keep exactly existing NTTU photo");
      assert.deepEqual(b.photoNatural,[1536,1024],"Retain unmodified original image");
      assert.equal(b.photoFit,"contain","No cropped people or watermark");
    }
   }
   assert.ok(result.ceo.includes("Tôi tin vào sức sáng tạo của người Việt."));
   assert.equal(result.eventPhoto,"/assets/recognition/NTTU_0058.jpeg");
   if(screens.includes(width)){
    const section=page.locator(".brand-row").first();
    await section.screenshot({path:"brand-order-qa/after-talent-"+width+".png",animations:"disabled",timeout:18000});
    if(width===834||width===1440)await page.locator(".brands-home").screenshot({path:"brand-order-qa/after-ecosystem-"+width+".png",animations:"disabled",timeout:25000});
   }
   measured.push({stage:"after",...result});
   console.log("PASS BRAND ORDER",width,"title/image/body",result.brands[0].identity.y,result.brands[0].figure.y,result.brands[0].narrative.y);
  }catch(e){failures.push("CHROMIUM "+width+": "+e.message);console.error("FAIL CHROMIUM",width,e.message);await page.screenshot({path:"brand-order-qa/fail-"+width+".png",fullPage:true}).catch(()=>{});}
  finally{await page.close()}
 }
}finally{await c.close()}
try{
 const wk=await webkit.launch({headless:true});
 try{
  for(const width of [390,834,1024]){
    const p=await visit(wk,current,width);
    try{
     const m=await measure(p);
     assert.ok(m.overflow<=2,"WebKit no horizontal overflow");
     assert.ok(m.brands.every(b=>b.identity.bottom<=b.figure.y+3&&b.figure.bottom<=b.narrative.y+3),"WebKit image order");
     assert.equal(m.brands[0].photoFit,"contain");
     console.log("PASS WEBKIT",width);
    }catch(e){failures.push("WEBKIT "+width+": "+e.message);console.error("FAIL WEBKIT",width,e.message)}
    finally{await p.close()}
  }
 }finally{await wk.close()}
}catch(e){failures.push("WEBKIT unavailable "+e.message)}
await writeFile("brand-order-qa/report.json",JSON.stringify({measured,failures},null,2));
if(failures.length){console.error(failures.join("\n"));process.exitCode=1}else console.log("PASS ALL BRAND ORDER CHECKS");
