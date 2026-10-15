import assert from "node:assert/strict";
import { chromium } from "playwright";
const widths=[360,390,767,768,820,834,1024,1099,1100,1180,1366,1440];
const browser=await chromium.launch({headless:true});
const failures=[];
for(const width of widths){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
 try{
  await page.goto("http://127.0.0.1:5173/",{waitUntil:"domcontentloaded",timeout:18000});
  await page.locator(".brand-row").nth(3).waitFor({state:"attached",timeout:10000});
  const s=await page.evaluate(()=>{
   const r=e=>e.getBoundingClientRect();
   const founder=document.querySelector(".founder-section");
   const layout=founder.querySelector(".founder-layout");
   const photo=founder.querySelector(".founder-portrait"),copy=founder.querySelector(".founder-copy");
   const brands=[...document.querySelectorAll(".brand-row")].map(e=>{
    const a=e.querySelector(".brand-inline"),img=a.querySelector("img"),title=a.querySelector("strong"),sub=e.querySelector("h3");
    return {background:getComputedStyle(e).backgroundColor,identity:getComputedStyle(a).backgroundColor,
      name:title.innerText,font:parseFloat(getComputedStyle(title).fontSize),subFont:parseFloat(getComputedStyle(sub).fontSize),
      logo:getComputedStyle(img).objectFit,imgSrc:img.getAttribute("src"),photoY:r(e.querySelector(".brand-row-image")).y,
      photoBottom:r(e.querySelector(".brand-row-image")).bottom,copyY:r(e.querySelector(".brand-row-copy")).y,
      imageWidth:r(a.querySelector(".brand-mark")).width,markRight:r(a.querySelector(".brand-mark")).right,nameLeft:r(title).left,
      link:e.querySelector(".link-arrow").getAttribute("href")};
   });
   return {width:innerWidth,scroll:document.documentElement.scrollWidth-innerWidth,photo:{x:r(photo).x,y:r(photo).y,w:r(photo).width,bottom:r(photo).bottom,midY:r(photo).y+r(photo).height/2},
    copy:{x:r(copy).x,y:r(copy).y,midY:r(copy).y+r(copy).height/2},layout:{x:r(layout).x,w:r(layout).width},
    quote:copy.querySelector("blockquote").textContent.trim(),heading:copy.querySelector("h2").textContent.trim(),brands,
    headings:[...document.querySelectorAll("main h1,main h2,main h3")].filter(x=>getComputedStyle(x).color!=="rgb(20, 45, 78)").map(x=>x.textContent.trim())};
  });
  assert.equal(s.width,width);
  assert.ok(s.scroll<=2,"horizontal overflow "+s.scroll);
  assert.equal(s.heading,"Thông điệp từ nhà sáng lập");
  assert.equal(s.quote,"“Tôi tin vào sức sáng tạo của người Việt. Chúng tôi xây dựng DCG để kết nối con người và công nghệ, biến những ý tưởng tốt thành sản phẩm có ích cho cuộc sống.”");
  assert.equal(s.brands.length,4);
  assert.equal(s.headings.length,0,"heading colors");
  if(width>=768){
   assert.ok(s.copy.x>=s.photo.x+s.photo.w+27,"CEO columns overlap/drop at "+width);
   assert.ok(Math.abs(s.photo.midY-s.copy.midY)<10,"CEO vertically unbalanced at "+width);
  }else{
   assert.ok(s.copy.y>=s.photo.bottom+24,"CEO wrong mobile order");
   assert.ok(Math.abs(s.photo.x+s.photo.w/2-(s.layout.x+s.layout.w/2))<4,"CEO image not centered");
  }
  for(let i=0;i<4;i++){
   const b=s.brands[i];
   assert.equal(b.background,"rgb(240, 245, 250)","background "+i);
   assert.equal(b.identity,"rgba(0, 0, 0, 0)","identity card "+i);
   assert.ok(b.font>b.subFont,"brand text not prominent");
   assert.ok(Math.abs(b.imageWidth-(width<768?80:width<1100?92:108))<1,"logo box responsive width");
   if(width>420)assert.ok(b.markRight<=b.nameLeft+2,"logo overlaps brand name");
   assert.ok(b.font>=(width>=1100?28:width>=768?24:23));
   assert.equal(b.logo,"contain");
   assert.equal(b.link,"/he-sinh-thai/dcg-"+["talent","studio","vision","entertainment"][i]);
   if(width<1100)assert.ok(b.photoBottom<=b.copyY+3,"image before copy");
  }
  assert.ok(s.brands[3].imgSrc.includes("dcg-entertainment-emblem-transparent-preserved.png"));
  console.log("PASS "+width+"px "+JSON.stringify({founderPhoto:s.photo.w,founderCopyX:s.copy.x,brandName:s.brands[3].font,brandImage:s.brands[3].imageWidth}));
 }catch(e){failures.push(width+"px "+e.message);console.error("FAIL "+width+"px "+e.message);}
 await page.close();
}
await browser.close();
if(failures.length){console.error(failures.join("\n"));process.exitCode=1;}else console.log("PASS: all 12 rapid responsive widths");
