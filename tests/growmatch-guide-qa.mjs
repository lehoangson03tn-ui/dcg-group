
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium,webkit} from 'playwright';

const assets=['home','jobs','register','login','employer','develop'];
assets.forEach(x=>assert.ok(existsSync('public/assets/guide/growmatch-'+x+'-public-20261030.jpg'),'missing REAL public screen '+x));
const browsers=[['chromium',chromium,[360,390,768,820,1024,1440]],['webkit',webkit,[390,820,1440]]];
const base=process.env.SITE_URL || 'http://127.0.0.1:5173';
const result=[];
mkdir('qa-growmatch-guide',{recursive:true});

for(const [engine,driver,widths] of browsers){
 const browser=await driver.launch({headless:true});
 try{
  for(const width of widths){
   const page=await browser.newPage({viewport:{width,height:930},deviceScaleFactor:1,reducedMotion:'reduce'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   try{
    const response=await page.goto(base+'/du-an/dcg-growmatch#gm-guide',{waitUntil:'networkidle',timeout:45000});
    assert.equal(response.status(),200);
    const guide=page.locator('#gm-guide');
    assert.equal(await guide.count(),1);
    assert.ok((await guide.locator('h2').innerText()).includes('Bắt đầu cùng'));
    // Visual regression: source note is a compact provenance cue, not a large empty card.
    const note=guide.locator('.gm-guide-verification');
    assert.equal(await note.count(),1);
    assert.ok((await note.locator('strong').innerText()).includes('Ảnh chụp từ website'));
    assert.equal(await note.locator('.gm-guide-verified-icon svg').count(),1);
    const noteMetrics=await guide.evaluate(el=>{
      const get=x=>x.getBoundingClientRect();
      const head=get(el.querySelector('.gm-guide-header'));
      const label=get(el.querySelector('.gm-guide-verification'));
      const tabs=get(el.querySelector('.gm-guide-tabs'));
      const subtitle=get(el.querySelector('.gm-guide-subtitle'));
      const content=get(el.querySelector('.gm-container'));
      return {
        note:{x:label.x,y:label.y,width:label.width,height:label.height,bottom:label.bottom},
        head:{x:head.x,width:head.width,bottom:head.bottom},
        subtitleBottom:subtitle.bottom,
        tabs:{x:tabs.x,y:tabs.y,width:tabs.width},
        content:{x:content.x,width:content.width}
      }
    });
    assert.ok(noteMetrics.note.height>=50 && noteMetrics.note.height<=90,
      'verification cue must be short and tidy '+JSON.stringify(noteMetrics));
    assert.ok(noteMetrics.note.width<=460 && noteMetrics.note.width>200,
      'verification cue must not stretch into large white box '+JSON.stringify(noteMetrics));
    assert.ok(Math.abs(noteMetrics.note.x-noteMetrics.content.x)<=2,
      'verification cue aligned with content '+JSON.stringify(noteMetrics));
    assert.ok(noteMetrics.note.y>=noteMetrics.subtitleBottom+8 &&
              noteMetrics.note.y<=noteMetrics.subtitleBottom+30,
      'verification follows subtitle without excessive whitespace '+JSON.stringify(noteMetrics));
    assert.ok(noteMetrics.tabs.y>=noteMetrics.note.bottom+12 &&
              noteMetrics.tabs.y<=noteMetrics.note.bottom+40,
      'tabs follow compact verification with balanced spacing '+JSON.stringify(noteMetrics));
    if(width<=690){
      assert.ok(Math.abs(noteMetrics.note.width-noteMetrics.content.width)<=2,
        'mobile provenance note fits same container '+JSON.stringify(noteMetrics));
    }
    const tabs=guide.locator('[role="tab"]');
    assert.equal(await tabs.count(),3,'3 role flows');
    assert.equal(await guide.locator('[data-gm-guide-flow]').count(),3);
    assert.equal(await guide.locator('img[src*="growmatch-"]').count(),11,'all walkthrough screens');
    assert.equal(await page.locator('.growmatch-award-figure').count(),2,'original CEO article preserved');


    // Regression: numbered badges share a stable first-line axis with their
    // text on phones, iPads and desktop, even when a sentence wraps.
    const assertNumberedRows=async(stage,label,expectedCount=3)=>{
      const layout=await stage.locator('.gm-guide-explain ol').evaluate(ol=>{
        const rows=[...ol.querySelectorAll(':scope > li')];
        return rows.map(li=>{
          const copy=li.querySelector('.gm-guide-item-text');
          const item=li.getBoundingClientRect();
          const word=copy?.getBoundingClientRect();
          const badge=getComputedStyle(li,'::before');
          const grid=getComputedStyle(li);
          return {labelX:item.left,copyX:word?.left,copyY:word?.top,
            itemY:item.top,itemRight:item.right,copyRight:word?.right,
            badgePosition:badge.position,badgeWidth:parseFloat(badge.width),
            badgeHeight:parseFloat(badge.height),
            gap:parseFloat(grid.columnGap),columns:grid.gridTemplateColumns,
            copyHeight:word?.height,overflow:li.scrollWidth>li.clientWidth+2};
        });
      });
      assert.equal(layout.length,expectedCount,label+' should have '+expectedCount+' numbered instructions');
      assert.ok(layout.every(x=>x.badgePosition==='static'),
        label+' badges must remain in the document layout');
      assert.ok(layout.every(x=>x.badgeWidth>=27&&x.badgeHeight>=27),
        label+' all number boxes should have equal visible size');
      assert.ok(layout.every(x=>Math.abs(x.copyY-x.itemY)<=2),
        label+' text and number start on the same horizontal axis: '+JSON.stringify(layout));
      assert.ok(layout.every(x=>Math.abs((x.copyX-x.labelX)-(x.badgeWidth+x.gap))<=3),
        label+' text columns must have uniform indents: '+JSON.stringify(layout));
      assert.ok(layout.every(x=>!x.overflow&&x.copyRight<=x.itemRight+2),
        label+' numbered instructions must not overflow: '+JSON.stringify(layout));
      assert.ok(layout.every(x=>Math.abs(x.copyX-layout[0].copyX)<2),
        label+' all three text rows must align: '+JSON.stringify(layout));
    };
    const overview=guide.locator('[data-gm-guide-flow="overview"]');
    assert.ok(await overview.isVisible());
    assert.ok(await overview.locator('[data-gm-guide-stage="0"]').isVisible());
    await assertNumberedRows(overview.locator('[data-gm-guide-stage="0"]'),'overview step 01',2);
    await overview.locator('[data-gm-guide-next]').click();
    assert.ok(await overview.locator('[data-gm-guide-stage="1"]').isVisible(),'next button works');
    await overview.locator('[data-gm-guide-step="2"]').click();
    assert.ok(await overview.locator('[data-gm-guide-stage="2"]').isVisible(),'step navigator works');
    await assertNumberedRows(overview.locator('[data-gm-guide-stage="2"]'),'overview step 03');

    await guide.locator('[data-gm-guide-tab="candidate"]').click();
    assert.equal(await overview.isVisible(),false);
    const candidate=guide.locator('[data-gm-guide-flow="candidate"]');
    assert.ok(await candidate.isVisible());
    assert.equal(await candidate.locator('[data-gm-guide-stage]').count(),4);
    await candidate.locator('[data-gm-guide-step="1"]').click();
    const register=candidate.locator('[data-gm-guide-stage="1"]');
    await assertNumberedRows(candidate.locator('[data-gm-guide-stage="1"]'),'candidate jobs step 02');
    if([390,820,1440].includes(width)){
      await candidate.locator('[data-gm-guide-stage="1"] .gm-guide-explain ol')
        .screenshot({path:'qa-growmatch-guide/numbered-steps-'+engine+'-'+width+'.png',animations:'disabled'});
    }
    assert.ok(await register.isVisible());
    assert.ok((await register.locator('img').getAttribute('src')).includes('register-public'));
    assert.equal(await register.locator('a.gm-button').getAttribute('href'),'https://dcg-growmatch.vercel.app/#register');
    const img=register.locator('img');
    await img.evaluate(async element=>{element.loading='eager';await element.decode()});
    assert.ok(await img.evaluate(element=>element.naturalWidth>=1000),'real screenshot must be bundled and load');
    await register.locator('[data-gm-guide-zoom]').click();
    assert.equal(await guide.locator('#gm-guide-image-dialog').evaluate(el=>el.open),true,'image zoom opens');
    await guide.locator('[data-gm-guide-close]').click();
    assert.equal(await guide.locator('#gm-guide-image-dialog').evaluate(el=>el.open),false,'image zoom closes');
    await candidate.locator('[data-gm-guide-next]').click();
    assert.ok(await candidate.locator('[data-gm-guide-stage="2"]').isVisible(),'next step from candidate');
    await candidate.locator('[data-gm-guide-step="2"]').focus();
    await page.keyboard.press('ArrowRight');
    assert.ok(await candidate.locator('[data-gm-guide-stage="3"]').isVisible(),'arrow-key changes steps');

    await guide.locator('[data-gm-guide-tab="employer"]').click();
    const employer=guide.locator('[data-gm-guide-flow="employer"]');
    assert.ok(await employer.isVisible());
    assert.equal(await employer.locator('[data-gm-guide-stage]').count(),4);
    await assertNumberedRows(employer.locator('[data-gm-guide-stage="0"]'),'employer step 01');
    assert.ok(await employer.locator('[data-gm-guide-stage="0"] img').getAttribute('src').then(x=>x.includes('employer-public')));
    const measurements=await page.evaluate(()=>{
      const root=document.querySelector('#gm-guide').getBoundingClientRect();
      return {overflow:document.documentElement.scrollWidth-innerWidth,rootWidth:root.width,left:root.left,right:root.right}
    });
    assert.ok(measurements.overflow<=2,'no horizontal overflow '+JSON.stringify(measurements));
    assert.deepEqual(errors,[],'JS errors');
    if(width===390||width===820||width===1440){
     await guide.locator('[data-gm-guide-tab="overview"]').click();
     const first=guide.locator('[data-gm-guide-flow="overview"] [data-gm-guide-stage="0"] img');
     await first.evaluate(async element=>{element.loading='eager';await element.decode()});
     await guide.screenshot({path:'qa-growmatch-guide/'+engine+'-'+width+'.png',animations:'disabled'});
     await guide.locator('.gm-guide-header').screenshot({path:'qa-growmatch-guide/verification-'+engine+'-'+width+'.png',animations:'disabled'});
    }
    result.push({engine,width,status:'PASS'});console.log('PASS GUIDE',engine,width);
   }catch(e){
    result.push({engine,width,status:'FAIL',error:e.message});
    console.error('FAIL GUIDE',engine,width,e.message);
   }finally{await page.close()}
  }
 }finally{await browser.close()}
}
writeFile('qa-growmatch-guide/results.json',JSON.stringify(result,null,2));
if(result.some(x=>x.status==='FAIL'))process.exitCode=1;
