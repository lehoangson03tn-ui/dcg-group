import assert from "node:assert/strict";
import {mkdir,writeFile} from "node:fs/promises";
import {chromium} from "playwright";

const base=process.env.SITE_URL||"http://127.0.0.1:5173";
const widths=[390,768,834,1024,1440];
const routes=["/","/gioi-thieu","/he-sinh-thai","/he-sinh-thai/dcg-talent","/he-sinh-thai/dcg-studio","/he-sinh-thai/dcg-vision","/he-sinh-thai/dcg-entertainment","/du-an/dcg-growmatch","/du-an/lumiqc","/giai-phap","/giai-phap/dcg-growmatch","/giai-phap/lumiqc"];
const photoIds=["FBA1C8B9","studio-crew","food-kitchen","vietnam-live-stage"];
const external={studio:"Jamie Webster",vision:"Adhitya Sibikumar",entertainment:"Tony Pham"};
const failures=[],results=[];
await mkdir("photo-realism-qa",{recursive:true});
const browser=await chromium.launch({headless:true});
async function load(p,route){
 const res=await p.goto(base+route,{waitUntil:"domcontentloaded",timeout:30000});
 assert.equal(res.status(),200,"HTTP "+route);
 await p.evaluate(()=>document.fonts.ready);
 return res;
}
async function decodeImgs(p,scope){
 await p.locator(scope+" img.editorial-photo").evaluateAll(async imgs=>{
  imgs.forEach(i=>i.loading="eager");
  await Promise.all(imgs.map(async img=>{
   if(!img.complete)await Promise.race([
    new Promise(resolve=>{img.addEventListener("load",resolve,{once:true});img.addEventListener("error",resolve,{once:true})}),
    new Promise(resolve=>setTimeout(resolve,12000))
   ]);
   await img.decode().catch(()=>{});
  }));
 });
}
try{
 for(const width of widths){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
  const errors=[];page.on("pageerror",e=>errors.push(e.message));
  try{
   await load(page,"/");
   await decodeImgs(page,"main");
   const home=await page.evaluate(()=>{
    const r=e=>{const v=e.getBoundingClientRect();return{x:v.x,y:v.y,w:v.width,h:v.height,right:v.right}};
    const img=document.querySelector(".home-hero-media>img.editorial-photo");
    const brands=[...document.querySelectorAll(".brand-row")];
    const heroTag=document.querySelector(".hero-media-tag").textContent;
    return {innerWidth:innerWidth,zoom:visualViewport.scale,overflow:document.documentElement.scrollWidth-innerWidth,hero:{
      src:img?.getAttribute("src"),srcset:img?.getAttribute("srcset"),alt:img?.alt,natural:img?[img.naturalWidth,img.naturalHeight]:[],
      filter:img?getComputedStyle(img).filter:null,fit:img?getComputedStyle(img).objectFit:null,tag:heroTag,rect:img?r(img):null
     },brands:brands.map(x=>{
       const im=x.querySelector(".brand-row-image img"),credit=x.querySelector(".editorial-photo-credit");
       return{name:x.querySelector(".brand-inline strong")?.textContent.trim(),src:im?.getAttribute("src"),alt:im?.alt,
        natural:im?[im.naturalWidth,im.naturalHeight]:[],fit:im?getComputedStyle(im).objectFit:null,
        filter:im?getComputedStyle(im).filter:null,srcset:im?.getAttribute("srcset"),credit:credit?.textContent.trim(),
        creditedUrl:credit?.querySelector("a")?.href,rect:r(x.querySelector(".brand-row-image")),child:r(im)};
     }),founderImg:document.querySelector(".founder-portrait img")?.getAttribute("src"),
     approvedQuote:document.querySelector(".founder-message")?.textContent||"",
     eventImage:document.querySelector(".growmatch-summary-image img")?.getAttribute("src"),
     logoImg:[...document.querySelectorAll(".brand-mark--row img")].map(x=>x.getAttribute("src")),
     heroMosaicCount:document.querySelectorAll(".hero-image-mosaic").length};
   });
   console.log("PHOTO_DEBUG",width,JSON.stringify(home).slice(0,10000));
   assert.equal(home.innerWidth,width);
   assert.equal(home.zoom,1);
   assert.ok(home.overflow<=2,"No horizontal scroll: "+home.overflow);
   assert.equal(home.heroMosaicCount,0);
   assert.ok(home.hero.src.includes("editorial/hcm-city-1600.webp"));
   assert.ok(home.hero.srcset.includes("hcm-city-960.webp"));
   assert.ok(home.hero.natural[0]>=900);
   assert.equal(home.hero.filter,"none");
   assert.ok(home.hero.tag.includes("TP.HCM")||home.hero.tag.includes("Hồ Chí Minh"));
   assert.deepEqual(home.brands.map(x=>x.name),["DCG TALENT","DCG STUDIO","DCG VISION","DCG ENTERTAINMENT"]);
   home.brands.forEach((b,i)=>{
    assert.ok(b.src.includes(photoIds[i]),"Correct branch photo "+b.name);
    assert.ok(b.natural[0]>=900,"Loaded real-photo "+b.name);
    assert.equal(b.filter,"none","No synthetic brightness/saturation "+b.name);
    assert.ok(b.credit.includes(i===0?"Tư liệu thật":"Ảnh minh họa"),"Proper status credit "+b.name);
    assert.ok(b.creditedUrl.startsWith("https://"));
    if(i===0){
     assert.equal(b.fit,"contain","Event image no crop");
     assert.ok(!b.srcset,"Source original unmodified");
    }else{
     assert.ok(b.alt.toLowerCase().includes("minh họa"),"Third party image clear");
     assert.ok(b.srcset.includes("-960.webp"));
    }
   });
   assert.equal(home.founderImg,"/assets/dcg-founder-portrait.png");
   assert.ok(home.approvedQuote.includes("Tôi tin vào sức sáng tạo của người Việt."));
   assert.equal(home.eventImage,"/assets/recognition/NTTU_0058.jpeg");
   assert.equal(home.logoImg.length,4);
   if([390,834,1440].includes(width)){
     await page.locator(".home-hero").screenshot({path:"photo-realism-qa/hero-"+width+".png",animations:"disabled"});
     await page.locator(".brands-home").screenshot({path:"photo-realism-qa/ecosystem-"+width+".png",animations:"disabled",timeout:30000});
   }
   for(const route of routes.slice(1)){
    await load(page,route);
    const doc=await page.evaluate(()=>({
      overflow:document.documentElement.scrollWidth-innerWidth,
      badOld:[...document.querySelectorAll("main img")].filter(i=>/hero-(studio|group|talent|vision|entertainment)\.webp/.test(i.src)).map(i=>i.src),
      photos:[...document.querySelectorAll("main img.editorial-photo")].map(i=>({src:i.getAttribute("src"),alt:i.getAttribute("alt"),srcset:i.getAttribute("srcset")})),
      labels:[...document.querySelectorAll("main .editorial-photo-credit,main .editorial-card-credit,main .editorial-hero-caption")].map(i=>i.textContent.trim()),
      h1:document.querySelectorAll("main h1").length
    }));
    assert.ok(doc.overflow<=2,route+" horizontal overflow "+doc.overflow);
    assert.equal(doc.badOld.length,0,"No outdated hero assets "+route);
    assert.equal(doc.h1,1,"One page heading "+route);
    if(route.startsWith("/he-sinh-thai/dcg-")){
     assert.equal(doc.photos.length,1,route+" single branch source");
     assert.ok(doc.photos[0].alt,route+" descriptive alt");
     assert.ok(doc.labels.length>=1,route+" attribution");
    }
    if(route==="/du-an/dcg-growmatch"){
     assert.equal(await page.locator(".growmatch-award-figure").count(),2);
     assert.equal(await page.locator(".growmatch-award-figure img[src*='NTTU_0058']").count(),1);
    }
    if([390,1440].includes(width)&&route.startsWith("/he-sinh-thai/dcg-")){
      await decodeImgs(page,"main");
      await page.locator(".detail-head").screenshot({path:"photo-realism-qa/"+route.slice(1).replaceAll("/","-")+"-"+width+".png",animations:"disabled",timeout:20000});
    }
   }
   assert.deepEqual(errors,[],"No JavaScript runtime errors");
   results.push({width,status:"PASS",home});
   console.log("PASS EDITORIAL PHOTO LAYOUT",width+"px");
  }catch(e){failures.push(width+"px: "+e.message);console.error("FAIL",width,e.message);await page.screenshot({path:"photo-realism-qa/failure-"+width+".png",fullPage:true}).catch(()=>{});}
  finally{await page.close()}
 }
}finally{await browser.close()}
await writeFile("photo-realism-qa/measurements.json",JSON.stringify({results,failures},null,2));
if(failures.length){console.error(failures.join("\n"));process.exitCode=1;}else console.log("ALL FIVE PHOTO / ROUTE RESPONSIVE TESTS PASS");
