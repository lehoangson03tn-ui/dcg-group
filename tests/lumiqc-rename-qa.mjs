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
  for(const width of [360,390,768,1024,1440]){
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
          assert.ok(data.text.includes('LUMIQC'),'project is identified '+route);
          assert.ok(data.title.includes('LUMIQC'),'browser title updated '+route);
        }
        if(route==='/du-an/lumiqc'){
          for(const phrase of ['ĐÀN CÁ GỖ','Lê Hoàng Sơn','Trương Quốc Huy','Trace-Safe','Policy-Time Twin','HOLD/RELEASE','VECoM']){
            assert.ok(data.text.toLowerCase().includes(phrase.toLowerCase()),'competition page missing '+phrase);
          }
          assert.ok(data.hrefs.some(x=>x.href==='#doi-thi'),'team anchor is present');
          const imageSources=await page.locator('.lq img').evaluateAll(els=>els.map(e=>e.getAttribute('src')));
          for(const src of imageSources){
            const imageResponse=await page.request.get(base+src);
            assert.equal(imageResponse.status(),200,'project image missing '+src);
          }
          const teamCards=await page.locator('.lq-person').count();
          assert.equal(teamCards,2,'team must contain exactly two profiles');
          for(const section of ['bai-toan','giai-phap','quy-trinh','giao-dien','doi-thi','lo-trinh-vecom']){
            assert.equal(await page.locator('#'+section).count(),1,'missing section '+section);
          }
          assert.equal(await page.locator('.lq .lq-title').count(),1,'editorial hero');
          const visualRules=await page.evaluate(()=>{
            const root=document.querySelector('.lq');
            const headings=[...root.querySelectorAll('h1,h2,h3,h4')].map(el=>el.textContent.trim());
            const cssColor=selector=>getComputedStyle(root.querySelector(selector)).color;
            const fontSize=selector=>Number.parseFloat(getComputedStyle(root.querySelector(selector)).fontSize);
            return {
              headings,
              hero:cssColor('.lq-title'),
              problemTitle:cssColor('#lq-problem-title'),
              problemEmphasis:cssColor('#lq-problem-title em'),
              heroAccent:cssColor('.lq-title>span'),
              solutionAccent:cssColor('#lq-solution-title em'),
              workflowAccent:cssColor('#lq-workflow-title em'),
              closingAccent:cssColor('#lq-closing-title em'),
              introSize:fontSize('.lq-editorial-lede>p:last-child')
            };
          });
          assert.ok(visualRules.headings.every(h=>!h.includes('.')),'remove full stops from all main headings: '+visualRules.headings.filter(h=>h.includes('.')));
          assert.equal(visualRules.problemTitle,visualRules.problemEmphasis,'problem headline must use a single color');
          assert.equal(visualRules.problemTitle,'rgb(15, 23, 42)','problem headline should be uniform navy');
          assert.notEqual(visualRules.hero,visualRules.heroAccent,'hero emphasis should have its own color');
          assert.equal(visualRules.heroAccent,'rgb(12, 104, 99)','hero title accent should be teal');
          assert.equal(visualRules.solutionAccent,'rgb(11, 110, 101)','solution heading emphasis should be teal');
          assert.equal(visualRules.workflowAccent,'rgb(169, 231, 221)','dark workflow accent must be legible');
          assert.equal(visualRules.closingAccent,'rgb(157, 229, 215)','dark closing accent must be legible');
          assert.ok(visualRules.introSize>=14,'body content font size should stay readable');

          assert.equal(await page.locator('.lq-swimlane').count(),3,'three operational swimlanes');
          assert.equal(await page.locator('.lq-tablist [role="tab"]').count(),3,'three product concepts');
          await page.locator('#lq-tab-check').click();
          assert.equal(await page.locator('#lq-tab-check').getAttribute('aria-selected'),'true','checklist tab selected');
          assert.ok(await page.locator('#lq-panel-check').isVisible(),'checklist concept visible');
          assert.ok(!(await page.locator('#lq-panel-take').isVisible()),'previous concept hidden');
          await page.locator('#lq-tab-qc').click();
          assert.ok(await page.locator('#lq-panel-qc').isVisible(),'QA center concept visible');
          await page.locator('#lq-tab-qc').press('Home');
          assert.ok(await page.locator('#lq-panel-take').isVisible(),'keyboard Home activates first tab');
          const headings=await page.locator('.lq h1,.lq h2').evaluateAll(els=>els.map(el=>({
            tag:el.tagName,
            lineHeight:Number.parseFloat(getComputedStyle(el).lineHeight)/Number.parseFloat(getComputedStyle(el).fontSize)
          })));
          assert.ok(headings.every(x=>x.lineHeight>=1.22),'Vietnamese headings need adequate line height '+JSON.stringify(headings));
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
