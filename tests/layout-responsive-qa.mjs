import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium, webkit } from "playwright";

const current=process.env.SITE_URL||"http://127.0.0.1:5173";
const previous=process.env.BEFORE_URL||"http://127.0.0.1:5174";
const sizes=[360,390,419,420,421,499,500,501,766,767,768,769,820,834,1024,1099,1100,1180,1366,1440];
const snapshots=[390,834,1024,1180,1440];
const founderQuote="“Tôi tin vào sức sáng tạo của người Việt. Chúng tôi xây dựng DCG để kết nối con người và công nghệ, biến những ý tưởng tốt thành sản phẩm có ích cho cuộc sống.”";
const out="layout-qa";
const issues=[];
await fs.mkdir(out,{recursive:true});
const summary=[];

function check(ok,message,details=""){
 if(!ok)issues.push(message+(details?" | "+JSON.stringify(details):""));
}
async function ready(page,element){
 await element.locator("img").first().evaluate(async img=>{if(!img.complete)await new Promise((res,rej)=>{img.onload=res;img.onerror=rej});await img.decode().catch(()=>{})});
}
async function snap(page,prefix){
 const founder=page.locator(".founder-section");
 const ecosystem=page.locator(".brands-home");
 await ready(page,founder);
 await founder.screenshot({path:out+"/"+prefix+"-founder.png",animations:"disabled",timeout:20000});
 await ecosystem.screenshot({path:out+"/"+prefix+"-ecosystem.png",animations:"disabled",timeout:20000});
 const entertainment=page.locator(".brand-row").nth(3);
 await ready(page,entertainment);
 await entertainment.screenshot({path:out+"/"+prefix+"-entertainment.png",animations:"disabled",timeout:20000});
}
async function collect(page){
 return page.evaluate(()=>{
  const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom,midY:r.y+r.height/2};};
  const css=(e,prop)=>getComputedStyle(e)[prop];
  const section=document.querySelector(".founder-section");
  const layout=section.querySelector(".founder-layout");
  const face=section.querySelector(".founder-portrait");
  const copy=section.querySelector(".founder-copy");
  const head=copy.querySelector("h2");
  const msg=copy.querySelector("blockquote");
  const blocks=[...document.querySelectorAll(".brand-row")];
  const brands=blocks.map(row=>{
   const ident=row.querySelector(".brand-inline"),name=ident.querySelector("strong"),logo=ident.querySelector("img"),mark=ident.querySelector(".brand-mark"),photo=row.querySelector(".brand-row-image"),body=row.querySelector(".brand-row-copy"),sub=row.querySelector("h3"),desc=row.querySelector(".brand-row-copy-inner>p:not(.micro-index)"),cta=row.querySelector(".link-arrow");
   const ctaStyle=getComputedStyle(cta);
   const canvas=document.createElement("canvas");canvas.width=1;canvas.height=1;
   const context=canvas.getContext("2d",{willReadFrequently:true});if(logo.complete&&logo.naturalWidth>0)context.drawImage(logo,0,0,1,1);
   return {name:name.textContent.trim(),row:rect(row),photo:rect(photo),body:rect(body),identity:rect(ident),
     gridColumns:css(row,"gridTemplateColumns"),background:css(row,"backgroundColor"),
     identityBackground:css(ident,"backgroundColor"),border:css(ident,"borderWidth"),radius:css(ident,"borderRadius"),shadow:css(ident,"boxShadow"),
     nameFont:parseFloat(css(name,"fontSize")),nameWeight:css(name,"fontWeight"),nameRect:rect(name),
     subFont:parseFloat(css(sub,"fontSize")),summary:desc.textContent.trim(),ctaHref:cta.getAttribute("href"),
     ctaDisplay:ctaStyle.display,ctaGap:parseFloat(ctaStyle.gap), logoUrl:logo.getAttribute("src"),
     logoWidth:rect(mark).width,logoNaturalWidth:logo.naturalWidth,logoNaturalHeight:logo.naturalHeight,
     logoFit:css(logo,"objectFit"),logoFilter:css(logo,"filter"),logoAlphaCenter:context.getImageData(0,0,1,1).data[3] };
  });
  const currentH1=[...document.querySelectorAll("main h1")];
  const h=[...document.querySelectorAll("main h1,main h2,main h3,main h4,main h5,main h6")];
  return {innerWidth:innerWidth,clientWidth:document.documentElement.clientWidth,visualScale:window.visualViewport?.scale??null,
    rootFont:css(document.documentElement,"fontSize"),bodyScroll:document.documentElement.scrollWidth-innerWidth,
    founder:{section:rect(section),layout:rect(layout),portrait:rect(face),copy:rect(copy),grid:css(layout,"gridTemplateColumns"),
      portraitCenter:rect(face).x+rect(face).width/2,layoutCenter:rect(layout).x+rect(layout).width/2,
      heading:head.textContent.trim(),quote:msg.textContent.trim(),quoteFont:parseFloat(css(msg,"fontSize")),
      photoNatural:[face.querySelector("img").naturalWidth,face.querySelector("img").naturalHeight],
      photoFit:css(face.querySelector("img"),"objectFit"),
      name:copy.querySelector(".founder-signature strong").textContent.trim(),role:copy.querySelector(".founder-signature span").textContent.trim(),
      cta:copy.querySelector("a")?.getAttribute("href")||null},
    brands,h1Count:currentH1.length,badHeadingColors:h.filter(e=>css(e,"color")!=="rgb(20, 45, 78)").map(e=>e.textContent.trim().slice(0,50))};
 });
}
async function open(browser,url,width){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
 const response=await page.goto(url,{waitUntil:"networkidle",timeout:45000});
 assert.equal(response.status(),200);
 await ready(page,page.locator(".founder-section"));
 await page.locator(".brand-rows img").evaluateAll(async imgs=>{
  for(const img of imgs)img.loading="eager";
  await Promise.all(imgs.map(async img=>{
   if(!img.complete)await Promise.race([new Promise(resolve=>{img.addEventListener("load",resolve,{once:true});img.addEventListener("error",resolve,{once:true});}),new Promise(resolve=>setTimeout(resolve,8000))]);
   if(img.decode)await img.decode().catch(()=>{});
  }));
 });
 return page;
}
async function baseline(browser){
 for(const w of [390,834,1024,1180]){
  const p=await open(browser,previous+"/",w);
  try{
   const m=await collect(p);
   summary.push({engine:"chromium",stage:"before",width:w,founderGrid:m.founder.grid,
     founderPortraitX:m.founder.portrait.x,founderCopyY:m.founder.copy.y,
     founderPortraitY:m.founder.portrait.y,brandBackgrounds:m.brands.map(b=>b.background),
     nameSizes:m.brands.map(b=>b.nameFont),photoWidth:m.brands[0].photo.width});
   await snap(p,"before-"+w);
   console.log("BEFORE "+w+"px "+JSON.stringify(summary.at(-1)));
  }catch(e){issues.push("BEFORE "+w+" "+e.message)}
  await p.close();
 }
}
async function after(browser,engine,width){
 const p=await open(browser,current+"/",width);
 try{
  const jsErrors=[];
  p.on("pageerror",e=>jsErrors.push(e.message));
  const m=await collect(p);
  const f=m.founder;
  const founder2cols=width>=768;
  check(m.innerWidth===width,engine+" "+width+" viewport measured",m.innerWidth);
  check(m.visualScale===1,engine+" "+width+" zoom baseline",m.visualScale);
  check(m.bodyScroll<=2,engine+" "+width+" horizontal scroll",m.bodyScroll);
  check(m.h1Count===1,engine+" "+width+" exactly one H1",m.h1Count);
  check(m.badHeadingColors.length===0,engine+" "+width+" navy heading",m.badHeadingColors);
  check(f.heading==="Thông điệp từ nhà sáng lập",engine+" "+width+" heading");
  check(f.quote===founderQuote,engine+" "+width+" exact approved quote");
  check(f.name==="Trương Quốc Huy"&&f.role==="Nhà sáng lập & Tổng giám đốc DCG GROUP",engine+" "+width+" founder identity");
  check(f.cta==="/gioi-thieu#nha-sang-lap",engine+" "+width+" CTA");
  check(f.photoNatural.join(",")==="640,910"&&f.photoFit==="contain",engine+" "+width+" full portrait",f.photoNatural);
  if(founder2cols){
   check(f.copy.x>=f.portrait.right+27,engine+" "+width+" founder columns should not overlap/drop",{photo:f.portrait,copy:f.copy});
   check(Math.abs(f.portrait.midY-f.copy.midY)<=7,engine+" "+width+" founder vertical centering",{portraitMid:f.portrait.midY,copyMid:f.copy.midY});
   check(f.portrait.width<=382&&f.portrait.width>=240,engine+" "+width+" balanced founder portrait",{width:f.portrait.width});
   check(f.quoteFont>=21&&f.quoteFont<=29,engine+" "+width+" quote font",f.quoteFont);
  }else{
   check(f.copy.y>=f.portrait.bottom+24,engine+" "+width+" mobile CEO after portrait",{photo:f.portrait,copy:f.copy});
   check(Math.abs(f.portraitCenter-f.layoutCenter)<=3,engine+" "+width+" portrait centered",{portraitCenter:f.portraitCenter,layoutCenter:f.layoutCenter});
   check(f.portrait.width<=302,engine+" "+width+" mobile portrait size",f.portrait.width);
   check(f.quoteFont>=20&&f.quoteFont<=23,engine+" "+width+" quote font",f.quoteFont);
  }
  check(m.brands.length===4,engine+" "+width+" all brands",m.brands.length);
  const names=["DCG TALENT","DCG STUDIO","DCG VISION","DCG ENTERTAINMENT"];
  for(const [i,b] of m.brands.entries()){
   check(b.name===names[i],engine+" "+width+" brand order",b.name);
   check(b.background==="rgb(240, 245, 250)",engine+" "+width+" same brand background",b.background);
   check(b.identityBackground==="rgba(0, 0, 0, 0)",engine+" "+width+" no white identity card",b.identityBackground);
   check(b.shadow==="none",engine+" "+width+" no identity shadow",b.shadow);
   check(b.radius==="0px",engine+" "+width+" no identity corner frame",b.radius);
   check(b.logoFit==="contain"&&b.logoFilter==="none"&&b.logoNaturalWidth>0,engine+" "+width+" logo source preserved",{fit:b.logoFit,filter:b.logoFilter,loaded:b.logoNaturalWidth});
   check(b.nameFont>= (width>=1100?28:width>=768?24:23),engine+" "+width+" legible brand name",b.nameFont);
   check(b.nameFont>b.subFont,engine+" "+width+" name outranks description heading",{nameFont:b.nameFont,subFont:b.subFont});
   check(b.ctaHref==="/he-sinh-thai/dcg-"+["talent","studio","vision","entertainment"][i],engine+" "+width+" brand CTA",b.ctaHref);
   check(b.ctaDisplay==="inline-flex"&&Math.abs(b.ctaGap-8)<0.5,engine+" "+width+" arrow alignment",{display:b.ctaDisplay,gap:b.ctaGap});
   if(width<1100){
    check(b.photo.bottom<=b.body.y+3,engine+" "+width+" image should precede text",{photo:b.photo,body:b.body});
    check(b.body.width>=width-100,engine+" "+width+" single column brand width",b.body.width);
   }
  }
  const ent=m.brands[3];
  check(ent.logoUrl.includes("dcg-entertainment-emblem-transparent-preserved.png"),engine+" "+width+" use preserved full transparent image",ent.logoUrl);
  check(ent.logoNaturalWidth===979&&ent.logoNaturalHeight===875,engine+" "+width+" source 979x875");
  if(engine==="chromium")check(ent.logoAlphaCenter<255,engine+" "+width+" transparent negative space",ent.logoAlphaCenter);
  check(m.brands.every(b=>Math.abs(b.logoWidth-m.brands[0].logoWidth)<1),engine+" "+width+" equal logo box widths",m.brands.map(b=>b.logoWidth));
  if(width<768)check(Math.abs(ent.logoWidth-80)<1,engine+" "+width+" mobile 80px logos",ent.logoWidth);
  if(width>=768&&width<1100)check(Math.abs(ent.logoWidth-92)<1,engine+" "+width+" tablet 92px logos",ent.logoWidth);
  if(width>=1100)check(Math.abs(ent.logoWidth-108)<1,engine+" "+width+" desktop 108px logos",ent.logoWidth);
  if(engine==="chromium"&&snapshots.includes(width))await snap(p,"after-"+width);
  if(engine==="chromium"&&[390,834,1180].includes(width)){
   await p.goto(current+"/gioi-thieu",{waitUntil:"domcontentloaded"});
   check(await p.locator(".founder-message").innerText()===founderQuote,engine+" "+width+" quote shared About");
   check(await p.locator(".founder-section a").count()===0,engine+" "+width+" no self CTA About");
  }
  summary.push({engine,stage:"after",width,scale:m.visualScale,founderGrid:f.grid,portraitX:f.portrait.x,portraitY:f.portrait.y,copyX:f.copy.x,copyY:f.copy.y,brands:m.brands.map(b=>({name:b.name,bg:b.background,nameFont:b.nameFont,logoBox:b.logoWidth}))});
  console.log("PASS "+engine+" "+width+"px "+JSON.stringify({grid:f.grid,colors:m.brands.map(b=>b.background),logoSize:ent.logoWidth,zoom:m.visualScale}));
 }catch(e){issues.push(engine+" "+width+" exception "+e.message);await p.screenshot({path:out+"/failure-"+engine+"-"+width+".png",fullPage:true}).catch(()=>{});}
 await p.close();
}
const chrome=await chromium.launch({headless:true});
try{
 await baseline(chrome);
 for(const width of sizes)await after(chrome,"chromium",width);
 const page=await open(chrome,current+"/",390);
 await page.addStyleTag({content:"html{font-size:125% !important}"});
 const big=await collect(page);
 check(big.bodyScroll<=2,"large text 125% no page overflow",big.bodyScroll);
 check(big.brands.every(b=>b.nameRect.right<=391),"large text logo title not cropped",big.brands.map(b=>b.nameRect));
 summary.push({engine:"chromium",stage:"large-text-125%",width:390,scroll:big.bodyScroll});
 await page.close();
}finally{await chrome.close();}
try{
 const wk=await webkit.launch({headless:true});
 try{for(const width of [390,768,820,834,1024,1100])await after(wk,"webkit",width)}finally{await wk.close();}
}catch(e){issues.push("WebKit execution unavailable "+e.message);}
await fs.writeFile(out+"/measurements.json",JSON.stringify({summary,issues},null,2));
if(issues.length){console.error("FAILED "+issues.length+" checks:\n"+issues.join("\n"));process.exitCode=1;}else console.log("ALL LAYOUT CHECKS PASS, total viewport evaluations "+summary.filter(x=>x.stage==="after").length);
