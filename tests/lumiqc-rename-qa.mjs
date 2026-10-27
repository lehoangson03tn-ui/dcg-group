import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base=process.env.SITE_URL||'http://127.0.0.1:5173';
const routes=[
  ['/', 'LUMIQC'],
  ['/he-sinh-thai/dcg-vision','LUMIQC'],
  ['/giai-phap','LUMIQC'],
  ['/du-an','LUMIQC'],
  ['/lien-he','DCG GROUP'],
  ['/lien-he?topic=lumiqc','DCG GROUP'],
  ['/thong-tin-du-lieu','Thông tin xử lý dữ liệu'],
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
            if(src.startsWith('https://dcg-group-ecosystem.floot.app/')) continue; // CDN images checked once at desktop width.
            const imageResponse=await page.request.get(new URL(src,base).toString());
            assert.equal(imageResponse.status(),200,'project image missing '+src);
          }
          const illustratedPhotos=await page.locator('.lq-photo img').evaluateAll(els=>els.map(x=>({src:x.getAttribute('src'),alt:x.alt})));
          assert.equal(illustratedPhotos.length,3,'three distinct AI photos in problem and feature sections');
          assert.ok(illustratedPhotos.every(x=>x.alt.toLowerCase().includes('minh họa ai')),'AI photographs need clear alt labels');
          assert.equal(new Set(illustratedPhotos.map(x=>x.src)).size,3,'photos must not repeat');
          const bgImages=await page.locator('.lq-hero,.lq-workflow,.lq-closing').evaluateAll(els=>els.map(el=>({section:el.className,background:getComputedStyle(el).backgroundImage})));
          assert.ok(bgImages.every(x=>x.background.includes('floot.app/_cdn/static/')),'each editorial section must load its generated AI background '+JSON.stringify(bgImages));
          const expectedBgUrls=["https://dcg-group-ecosystem.floot.app/_cdn/static/e5a6d5a5-7c94-4cad-bd30-2d7b93e3a5f2.png","https://dcg-group-ecosystem.floot.app/_cdn/static/329cab55-1965-4198-ac7b-d56e5d92c719-lumiqc-workflow-ai-background.png","https://dcg-group-ecosystem.floot.app/_cdn/static/887228e0-5054-4309-8744-01ff4ff9fa56-lumiqc-closing-ai-background.png"];
          assert.ok(bgImages.every((x,i)=>x.background.includes(expectedBgUrls[i])),'illustrations missing from hero/workflow/closing CSS');
          const allAssetUrls=[...illustratedPhotos.map(x=>x.src),...expectedBgUrls];
          assert.equal(allAssetUrls.length,6,'require all six AI illustrations');
          if(width===1440) for(const u of allAssetUrls){
            const result=await page.request.get(u,{timeout:15000});
            assert.equal(result.status(),200,'AI asset unavailable '+u);
            assert.ok(result.headers()['content-type']?.startsWith('image/'),'AI URL is not an image '+u);
          }
          const teamCards=await page.locator('.lq-person').count();
          assert.equal(teamCards,2,'team must contain exactly two profiles');
          assert.equal(await page.locator('.lq-team-slide').count(),2,'exactly two member slides');
          assert.equal(await page.locator('.lq-team-slide:visible').count(),1,'display one member per slide');
          assert.equal(await page.locator('.lq-person-photo').count(),2,'actual meeting photographs on both profiles');
          assert.equal(await page.locator('.lq-team-logo img').count(),2,'real logo on both profiles');
          const memberAssets=await page.locator('.lq-person-photo,.lq-team-logo img').evaluateAll(els=>els.map(e=>e.getAttribute('src')));
          assert.equal(new Set(memberAssets).size,2,'only supplied original photo and real logo');
          assert.ok(memberAssets.every(src=>src.startsWith('https://dcg-group-ecosystem.floot.app/_cdn/static/')),'team assets must be uploaded and hosted');
          assert.equal(await page.locator('.lq-team-slide:visible h3').textContent(),'Lê Hoàng Sơn','original slide shows team lead');
          await page.locator('[data-lq-member-next]').click();
          assert.equal(await page.locator('.lq-team-slide:visible h3').textContent(),'Trương Quốc Huy','next button shows second member');
          assert.equal(await page.locator('.lq-team-index-current').textContent(),'02','pagination follows active slide');
          await page.locator('[data-lq-member-prev]').click();
          assert.equal(await page.locator('.lq-team-slide:visible h3').textContent(),'Lê Hoàng Sơn','previous returns to first member');
          await page.locator('[data-lq-member-dot="1"]').click();
          assert.equal(await page.locator('.lq-team-slide:visible h3').textContent(),'Trương Quốc Huy','dot navigation works');
          await page.locator('#lq-team-track').focus();
          await page.keyboard.press('ArrowLeft');
          assert.equal(await page.locator('.lq-team-slide:visible h3').textContent(),'Lê Hoàng Sơn','arrow keyboard navigation');
          if(width===1440){
            for(const img of [...new Set(memberAssets)]){
              const response=await page.request.get(img,{timeout:15000});
              assert.equal(response.status(),200,'real team photo or logo unavailable '+img);
              assert.ok(response.headers()['content-type']?.startsWith('image/'),'team asset must be image '+img);
            }
          }
          const cardGeom=await page.locator('.lq-team-slide:visible').evaluate(el=>{
            const pic=el.querySelector('.lq-person-media').getBoundingClientRect();
            const info=el.querySelector('.lq-person-info').getBoundingClientRect();
            return {pic:{x:pic.x,y:pic.y,w:pic.width,h:pic.height},info:{x:info.x,y:info.y,w:info.width,h:info.height}};
          });
          if(width>=768){
            assert.ok(cardGeom.pic.x < cardGeom.info.x,'profile photo should appear on left');
            assert.ok(Math.abs(cardGeom.pic.y-cardGeom.info.y)<=2,'team photo and details tops align');
          } else {
            assert.ok(cardGeom.info.y >= cardGeom.pic.y+cardGeom.pic.h-2,'on mobile photo stacks above details');
          }

          for(const section of ['bai-toan','giai-phap','quy-trinh','giao-dien','doi-thi','lo-trinh-vecom']){
            assert.equal(await page.locator('#'+section).count(),1,'missing section '+section);
          }
          assert.equal(await page.locator('.lq .lq-title').count(),1,'editorial hero');
          const balancedPairs=await page.locator('.lq-balanced-pair').evaluateAll(nodes=>nodes.map(parent=>{
            const left=parent.querySelector('.lq-balanced-left').getBoundingClientRect();
            const right=parent.querySelector('.lq-balanced-right').getBoundingClientRect();
            const figure=parent.querySelector('.lq-balanced-left .lq-photo')?.getBoundingClientRect();
            const parentRect=parent.getBoundingClientRect();
            return {
              type:parent.className,
              left:{top:left.top,bottom:left.bottom,width:left.width,height:left.height},
              right:{top:right.top,bottom:right.bottom,width:right.width,height:right.height},
              figure:figure?{height:figure.height,width:figure.width}:null,
              parentWidth:parentRect.width
            };
          }));
          assert.equal(balancedPairs.length,3,'three sections must use balanced paired layout');
          for(const pair of balancedPairs){
            assert.ok(pair.figure?.height>130,'left-side visual should be meaningful '+JSON.stringify(pair));
            if(width>=1024){
              assert.ok(Math.abs(pair.left.top-pair.right.top)<3,'top edges should align '+JSON.stringify(pair));
              assert.ok(Math.abs(pair.left.bottom-pair.right.bottom)<3,'bottom edges should align '+JSON.stringify(pair));
              assert.ok(Math.abs(pair.left.width-pair.right.width)<3,'columns should be equal width '+JSON.stringify(pair));
            }else{
              assert.ok(pair.right.top>=pair.left.bottom-2,'stack panels rather than squeeze mobile columns '+JSON.stringify(pair));
            }
          }

          const visualRules=await page.evaluate(()=>{
            const root=document.querySelector('.lq');
            const elements=[...root.querySelectorAll('h1,h2,h3,h4')];
            const check=el=>{
              const dark=Boolean(el.closest('.lq-workflow'));
              const color=getComputedStyle(el).color;
              const nested=[...el.querySelectorAll('span,em,strong')].map(x=>({text:x.textContent.trim(),color:getComputedStyle(x).color}));
              return {text:el.textContent.trim(),dark,color,nested};
            };
            const cssColor=selector=>getComputedStyle(root.querySelector(selector)).color;
            const fontSize=selector=>Number.parseFloat(getComputedStyle(root.querySelector(selector)).fontSize);
            return {
              headings:elements.map(check),
              bodyExamples:[
                cssColor('.lq-fracture p'),
                cssColor('.lq-feature-copy p'),
                cssColor('.lq-concept-copy p'),
                cssColor('.lq-person-info>p:not(.lq-person-badge)'),
                cssColor('.lq-roadmap-list p')
              ],
              darkCopy:cssColor('.lq-workflow .lq-section-intro--dark>p:last-child'),
              closingCopy:cssColor('.lq-closing>div p'),
              workflowBackground:getComputedStyle(root.querySelector('.lq-workflow')).backgroundColor,
              closingBackground:getComputedStyle(root.querySelector('.lq-closing')).backgroundColor,
              workflowCardBackground:getComputedStyle(root.querySelector('.lq-lane-steps li')).backgroundImage,
              workflowCardTitle:cssColor('.lq-lane-steps li strong'),
              closingButtonBackground:getComputedStyle(root.querySelector('.lq-closing-actions .lq-btn--light')).backgroundColor,
              workflowIntroFont:fontSize('.lq-workflow .lq-section-intro--dark>p:last-child'),
              closingIntroFont:fontSize('.lq-closing .lq-closing-grid p'),
              introSize:fontSize('.lq-editorial-lede>p:not(.lq-overline)'),
              pageOverflow:document.documentElement.scrollWidth-innerWidth
            };
          });
          assert.ok(visualRules.headings.every(x=>!x.text.includes('.')),'section headings contain periods');
          for(const h of visualRules.headings){
            const wanted=h.dark?'rgb(248, 250, 252)':'rgb(15, 23, 42)';
            assert.equal(h.color,wanted,'uniform heading color: '+h.text);
            for(const span of h.nested){
              assert.equal(span.color,wanted,'no different-color emphasis: '+h.text+' / '+span.text);
            }
          }
          assert.ok(visualRules.bodyExamples.every(c=>c==='rgb(59, 79, 96)'),'body paragraphs share one slate color: '+JSON.stringify(visualRules.bodyExamples));
          assert.equal(visualRules.darkCopy,'rgb(213, 226, 232)','workflow body text should have accessible inverse contrast');
          assert.equal(visualRules.closingCopy,'rgb(59, 79, 96)','light closing body copy should be readable slate');
          assert.equal(visualRules.workflowBackground,'rgb(11, 28, 37)','workflow dark background should be unified');
          assert.equal(visualRules.closingBackground,'rgb(246, 251, 250)','closing should switch to fresh light background');
          assert.ok(visualRules.workflowCardBackground.includes('linear-gradient')&&visualRules.workflowCardBackground.includes('25, 59, 78'),'workflow tiles need blue-teal gradient background');
          assert.equal(visualRules.workflowCardTitle,'rgb(248, 250, 252)','workflow tile titles should be bright white');
          assert.equal(visualRules.closingButtonBackground,'rgb(201, 240, 228)','closing CTA should visibly contrast dark background');
          assert.ok(visualRules.workflowIntroFont>=15,'workflow explanation too small');
          assert.ok(visualRules.closingIntroFont>=14,'closing explanation too small');
          assert.ok(visualRules.introSize>=14,'body content font size should stay readable');
          assert.ok(visualRules.pageOverflow<=2,'uniform palette should not change width');


          assert.equal(await page.locator('.lq-swimlane').count(),3,'three operational swimlanes');
          assert.equal(await page.locator('.lq-flow-v2 .lq-flow-step').count(),9,'workflow must include nine real HTML steps');
          assert.equal(await page.locator('.lq-flow-v2 .lq-lane-glyph svg').count(),3,'three lane identity icons');
          assert.equal(await page.locator('.lq-flow-v2 .lq-flow-symbol svg').count(),9,'all nine steps have illustrative SVG icons');
          assert.equal(await page.locator('.lq-flow-v2 .lq-flow-step--hold').count(),1,'HOLD state has unique styling');
          assert.equal(await page.locator('.lq-flow-v2 .lq-flow-step--release').count(),1,'decision state has unique styling');
          const processCards=await page.locator('.lq-flow-v2 .lq-flow-step').evaluateAll(nodes=>nodes.map(el=>({
            width:el.getBoundingClientRect().width,
            height:el.getBoundingClientRect().height,
            title:el.querySelector('strong')?.textContent?.trim(),
            titleColor:getComputedStyle(el.querySelector('strong')).color,
            hasIcon:!!el.querySelector('svg'),
            lane:el.closest('.lq-swimlane')?.className
          })));
          assert.ok(processCards.every(x=>x.width>90&&x.height>70),'workflow steps are too small '+JSON.stringify(processCards));
          assert.ok(processCards.every(x=>x.titleColor==='rgb(248, 250, 252)'),'workflow step title not readable '+JSON.stringify(processCards));
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
        if(route==='/lien-he?topic=lumiqc'){
          assert.equal(await page.locator('#contact-topic').inputValue(),'LUMIQC – ĐÀN CÁ GỖ','project CTA should preselect the topic');
        }
        if(route==='/lien-he'){
          assert.equal(await page.locator('#contact-form').count(),1,'contact form available');
          assert.equal(await page.locator('input[name="consent"][required]').count(),1,'mandatory data-use consent');
          assert.equal(await page.locator('input[name="website"]').count(),1,'honeypot exists');
          assert.equal(await page.locator('select[name="topic"] option').filter({hasText:'LUMIQC'}).count(),1,'LUMIQC can be selected');
          assert.ok((await page.locator('.contact-form button[type="submit"]').textContent()).includes('GỬI LỜI NHẮN'),'must offer real send, not copy');
          await page.route('https://mbynmifozkuvwoghvewi.supabase.co/functions/v1/dcg-contact-submit',async route=>{
            const data=route.request().postDataJSON();
            assert.equal(data.name,'Nguyen Van Demo','test sender');
            assert.equal(data.topic,'LUMIQC – ĐÀN CÁ GỖ','category');
            assert.ok(data.note.includes('nghiệp vụ'),'message included');
            await route.fulfill({status:201,contentType:'application/json',
              headers:{'Access-Control-Allow-Origin':base},
              body:JSON.stringify({ok:true,message:'Lời nhắn đã được ghi nhận'})});
          });
          await page.locator('#contact-name').fill('Nguyen Van Demo');
          await page.locator('#contact-email').fill('test@invalid.example');
          await page.locator('#contact-topic').selectOption({label:'LUMIQC – ĐÀN CÁ GỖ'});
          await page.locator('#contact-note').fill('Tôi muốn trao đổi thêm về nghiệp vụ truy vết lô nguyên liệu.');
          await page.locator('.contact-consent input').check();
          await page.locator('.contact-form button[type="submit"]').click();
          await page.locator('#form-status[data-state="success"]').waitFor({timeout:6000});
          assert.ok((await page.locator('#form-status').textContent()).includes('Gửi thành công'),'positive user feedback');
          assert.equal(await page.locator('#contact-email').inputValue(),'','reset after successful send');
          await page.unrouteAll();
          // A server error must not clear the visitor's message or falsely report success.
          await page.route('https://mbynmifozkuvwoghvewi.supabase.co/functions/v1/dcg-contact-submit',async route=>{
            await route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({ok:false,error:'Kênh đang bận'})});
          });
          await page.locator('#contact-name').fill('Nguyen Van Demo');
          await page.locator('#contact-email').fill('test@invalid.example');
          await page.locator('#contact-note').fill('Xin trao đổi về trường hợp cần kiểm soát ngoại lệ từ chi nhánh.');
          await page.locator('.contact-consent input').check();
          await page.locator('.contact-form button[type="submit"]').click();
          await page.locator('#form-status[data-state="error"]').waitFor({timeout:6000});
          assert.ok((await page.locator('#form-status').textContent()).includes('Kênh đang bận'),'API errors are visible');
          assert.equal(await page.locator('#contact-email').inputValue(),'test@invalid.example','retain form data when send fails');
          await page.unrouteAll();
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
