import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium, webkit } from "playwright";

const BEFORE="http://127.0.0.1:5174";
const AFTER="http://127.0.0.1:5173";
const WIDTHS=[390,834,1180];
await fs.mkdir("layout-visual",{recursive:true});

async function capture(browser,url,label,width){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
 await page.goto(url,{waitUntil:"domcontentloaded",timeout:20000});
 await page.locator(".founder-section").waitFor({state:"visible"});
 await page.locator(".brand-rows img").evaluateAll(imgs=>imgs.forEach(img=>{img.loading="eager";}));
 await page.locator(".founder-section img").first().evaluate(async img=>{await img.decode().catch(()=>{});});
 const face=page.locator(".founder-section");
 const eco=page.locator(".brands-home");
 await face.screenshot({path:"layout-visual/"+label+"-"+width+"-CEO.png",animations:"disabled",timeout:15000});
 await eco.screenshot({path:"layout-visual/"+label+"-"+width+"-ECOSYSTEM.png",animations:"disabled",timeout:15000});
 const measured=await page.evaluate(()=>{
  const x=e=>{const a=e.getBoundingClientRect();return {x:a.x,y:a.y,width:a.width,height:a.height}};
  return {
    viewport:{innerWidth:innerWidth,scale:window.visualViewport?.scale,rootFont:getComputedStyle(document.documentElement).fontSize},
    founder:{grid:getComputedStyle(document.querySelector(".founder-layout")).gridTemplateColumns,
      portrait:x(document.querySelector(".founder-portrait")),copy:x(document.querySelector(".founder-copy"))},
    brands:[...document.querySelectorAll(".brand-row")].map(e=>({
      name:e.querySelector(".brand-inline strong").textContent.trim(),
      bg:getComputedStyle(e).backgroundColor,
      identityBg:getComputedStyle(e.querySelector(".brand-inline")).backgroundColor,
      logoSize:x(e.querySelector(".brand-mark")).width,
      font:getComputedStyle(e.querySelector(".brand-inline strong")).fontSize
    }))
  };
 });
 console.log("SNAPSHOT "+label+" "+width+" "+JSON.stringify(measured));
 await page.close();
 return measured;
}
const chrome=await chromium.launch({headless:true});
const report={screenshots:[],webkit:[]};
try{
 for(const width of WIDTHS){
  report.screenshots.push({width,before:await capture(chrome,BEFORE,"BEFORE",width),after:await capture(chrome,AFTER,"AFTER",width)});
 }
}finally{await chrome.close()}
const wk=await webkit.launch({headless:true});
try{
 for(const width of [390,768,834,1024,1100]){
  const page=await wk.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
  try{
   await page.goto(AFTER,{waitUntil:"networkidle",timeout:30000});
   await page.evaluate(()=>document.fonts.ready);
   await page.waitForTimeout(250);
   const a=await page.evaluate(()=>{
    const face=document.querySelector(".founder-portrait").getBoundingClientRect();
    const copy=document.querySelector(".founder-copy").getBoundingClientRect();
    return {width:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,face:{x:face.x,y:face.y,width:face.width,bottom:face.bottom},copy:{x:copy.x,y:copy.y},
      brands:[...document.querySelectorAll(".brand-row")].map(x=>({bg:getComputedStyle(x).backgroundColor,ident:getComputedStyle(x.querySelector(".brand-inline")).backgroundColor}))};
   });
   console.log("WEBKIT_MEASURE "+width+" "+JSON.stringify(a));
   assert.equal(a.width,width);
   assert.ok(a.overflow<=2,"No horizontal scroll: "+a.overflow+"px");
   assert.ok(a.brands.every(x=>x.bg==="rgb(240, 245, 250)"&&x.ident==="rgba(0, 0, 0, 0)"),"Uniform ecosystem");
   if(width>=768)assert.ok(a.copy.x>=a.face.x+a.face.width+27,"CEO two columns");
   else assert.ok(a.copy.y>=a.face.bottom+24,"CEO one column");
   report.webkit.push({width,status:"PASS",state:a});
   console.log("PASS WEBKIT "+width+"px");
  }finally{await page.close()}
 }
}finally{await wk.close()}
await fs.writeFile("layout-visual/measurements.json",JSON.stringify(report,null,2));
console.log("PASS: before/after captures and WebKit layouts");
