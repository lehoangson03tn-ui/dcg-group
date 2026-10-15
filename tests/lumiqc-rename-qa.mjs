import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base=process.env.SITE_URL||'http://127.0.0.1:5173';
const routes=[
  ['/', 'LUMIQC'],
  ['/he-sinh-thai/dcg-vision','LUMIQC'],
  ['/giai-phap','LUMIQC'],
  ['/du-an','LUMIQC'],
  ['/du-an/lumiqc','LUMIQC'],
  ['/giai-phap/lumiqc','LUMIQC'],
  ['/du-an/mat-than-ai','LUMIQC'],
  ['/giai-phap/mat-than-ai','LUMIQC'],
  ['/mat-than-ai','LUMIQC'],
];
const browser=await chromium.launch({headless:true});
const failures=[];
try{
  for(const width of [390,768,1440]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
    try{
      for(const [route,term] of routes){
        const errors=[];const onError=e=>errors.push(e.message);page.on('pageerror',onError);
        const response=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:20000});
        assert.equal(response.status(),200,route+' should return 200');
        const data=await page.evaluate(()=>{
          const main=document.querySelector('main');
          return {text:main?.textContent||'',html:main?.innerHTML||'',h1:main?.querySelectorAll('h1').length||0,title:document.title,
           canonical:document.querySelector('link[rel="canonical"]')?.href,
           hrefs:[...main.querySelectorAll('a[href]')].map(e=>({text:e.textContent.trim(),href:e.getAttribute('href')})),
           overflow:document.documentElement.scrollWidth-window.innerWidth,
           path:location.pathname};
        });
        assert.equal(data.h1,1,'one H1 '+route);
        assert.ok(data.text.includes(term),'LUMIQC displayed '+route);
        assert.ok(!data.text.includes('Mắt Thần'),'old public name found '+route);
        assert.ok(data.overflow<=2,'horizontal overflow '+width+' '+route+': '+data.overflow);
        assert.equal(errors.length,0,'JavaScript errors '+route+' '+errors.join('; '));
        if(route==='/'){
          assert.ok(data.hrefs.some(x=>x.href==='/du-an/lumiqc'),'homepage new project CTA');
        }
        if(route==='/he-sinh-thai/dcg-vision'){
          assert.ok(data.hrefs.some(x=>x.href==='/du-an/lumiqc'),'Vision CTA targets new project');
        }
        if(route==='/du-an/lumiqc'||route==='/giai-phap/lumiqc'){
          assert.ok(data.text.includes('Dự án nghiên cứu'),'research status retained '+route);
          assert.ok(data.title.includes('LUMIQC'),'browser title updated '+route);
        }
        if(route.includes('mat-than-ai')){
          const destination=route.includes('/giai-phap/')?'/giai-phap/lumiqc':'/du-an/lumiqc';
          assert.equal(data.path,destination,'legacy route upgraded without losing page');
          assert.equal(data.canonical,'https://dcg-group.vercel.app'+destination,'legacy canonical normalized');
        }
        page.off('pageerror',onError);
        console.log('PASS',width,route,'=>',data.path);
      }
    }catch(err){failures.push(width+'px '+err.message)}
    finally{await page.close()}
  }
}finally{await browser.close()}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1}else console.log('LUMIQC ROUTE AND RESPONSIVE CHECKS PASS');
