import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const root = process.env.SITE_URL || 'http://127.0.0.1:5173';
const sizes = [360,390,768,1024,1440];
const browser = await chromium.launch({ headless:true });
const issues = [];
await mkdir('visual-qa', { recursive:true });

try {
  for(const width of sizes){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
    try {
      const failures=[];
      page.on('pageerror', err=>failures.push('JavaScript: '+err.message));
      await page.goto(root+'/',{waitUntil:'networkidle',timeout:45000});
      await page.locator('#nha-sang-lap img').evaluate(async img=>{if(!img.complete)await new Promise((ok,no)=>{img.onload=ok;img.onerror=no});});
      const checks=await page.evaluate(()=>{
        const founder=document.querySelector('#nha-sang-lap');
        const about=document.querySelector('.about-home');
        const ecosystem=document.querySelector('.brands-home');
        const img=founder.querySelector('img');
        const badge=[...document.querySelectorAll('.brand-mark__image')];
        const headings=[...document.querySelectorAll('main h1,main h2,main h3,main h4,main h5,main h6')];
        return {
          h1:document.querySelectorAll('main h1').length,
          founderVisible:!!(founder.getBoundingClientRect().width&&founder.getBoundingClientRect().height),
          founderOrder:!!(about.compareDocumentPosition(founder)&Node.DOCUMENT_POSITION_FOLLOWING)&&!!(founder.compareDocumentPosition(ecosystem)&Node.DOCUMENT_POSITION_FOLLOWING),
          portrait:{loaded:img.complete&&img.naturalWidth>0,width:img.naturalWidth,height:img.naturalHeight,fit:getComputedStyle(img).objectFit},
          overflow:document.documentElement.scrollWidth-window.innerWidth,
          headings:headings.filter(h=>getComputedStyle(h).color!=='rgb(20, 45, 78)'||/\.\s*$/.test(h.textContent.trim())).map(h=>({text:h.textContent.trim().slice(0,75),color:getComputedStyle(h).color})),
          logos:badge.map(img=>({src:img.getAttribute('src'),fit:getComputedStyle(img).objectFit,loaded:img.complete&&img.naturalWidth>0})),
          quoteVisible:!!document.querySelector('blockquote'),
          founderName:founder.querySelector('.founder-signature strong')?.textContent?.trim(),
          ctas:[...document.querySelectorAll('.home-hero .hero-actions a')].map(a=>a.getAttribute('href'))
        }
      });
      assert.equal(checks.h1,1,'one H1');
      assert.equal(checks.founderVisible,true,'founder visible');
      assert.equal(checks.founderOrder,true,'founder section between overview and ecosystem');
      assert.equal(checks.portrait.loaded,true,'portrait loads');
      assert.ok(checks.portrait.width>=640,'portrait original resolution');
      assert.equal(checks.portrait.fit,'contain','no portrait crop');
      assert.ok(checks.overflow<=2,'no horizontal scroll');
      assert.deepEqual(checks.headings,[],'all headings navy and no trailing period');
      assert.ok(checks.logos.some(x=>x.src.includes('dcg-entertainment-emblem-safe.webp')),'approved Entertainment image used');
      assert.ok(checks.logos.every(x=>x.fit==='contain'&&x.loaded),'all logo assets loaded and uncropped');
      assert.equal(checks.quoteVisible,false,'draft quote not public');
      assert.equal(checks.founderName,'Trương Quốc Huy');
      assert.deepEqual(checks.ctas,['/he-sinh-thai','/gioi-thieu']);
      assert.deepEqual(failures,[],'no JS runtime errors');
      if(width===390||width===1440){
        await page.screenshot({path:'visual-qa/home-'+width+'.png',fullPage:true,animations:'disabled'});
        await page.locator('#nha-sang-lap').screenshot({path:'visual-qa/founder-'+width+'.png',animations:'disabled'});
      }
      console.log('PASS homepage '+width+'px');
    } catch(err){
      issues.push(width+'px: '+err.message);
      console.error('FAIL '+width+'px: '+err.message);
      await page.screenshot({path:'visual-qa/failure-'+width+'.png',fullPage:true}).catch(()=>{});
    } finally{await page.close();}
  }
  const page=await browser.newPage({viewport:{width:390,height:844}});
  for(const route of ['/gioi-thieu','/he-sinh-thai','/he-sinh-thai/dcg-talent','/he-sinh-thai/dcg-studio','/he-sinh-thai/dcg-vision','/he-sinh-thai/dcg-entertainment','/giai-phap','/du-an','/du-an/dcg-growmatch','/du-an/mat-than-ai','/lien-he']){
    try {
      const response=await page.goto(root+route,{waitUntil:'domcontentloaded',timeout:30000});
      assert.equal(response.status(),200);
      assert.equal(await page.locator('main h1').count(),1);
      assert.equal(await page.locator('.error-404').count(),0);
      if(route==='/gioi-thieu')assert.equal(await page.locator('#nha-sang-lap').count(),1);
      console.log('PASS route '+route);
    }catch(e){issues.push(route+': '+e.message);}
  }
  await page.goto(root+'/?ceo-draft=1',{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('.founder-editorial-note blockquote').count(),1);
  assert.match(await page.locator('.founder-editorial-note strong').innerText(),/CHƯA ĐƯỢC PHÊ DUYỆT/);
  await page.close();
} finally { await browser.close(); }
if(issues.length){console.error(issues.join('\n'));process.exitCode=1;}
