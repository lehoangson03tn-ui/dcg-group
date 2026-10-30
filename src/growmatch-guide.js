
import './growmatch-guide.css';

const PRODUCT_URL = 'https://dcg-growmatch.vercel.app/';
const IMAGE_DIR = '/assets/guide/';
const screens = {
 home: {src: IMAGE_DIR + 'growmatch-home-public-20261030.jpg',alt:'Ảnh chụp thực tế trang chủ DCG GROWMATCH khi chưa đăng nhập'},
 jobs: {src: IMAGE_DIR + 'growmatch-jobs-public-20261030.jpg',alt:'Ảnh chụp thực tế trang Việc làm, bộ lọc từ khóa, địa điểm và hình thức'},
 register: {src: IMAGE_DIR + 'growmatch-register-public-20261030.jpg',alt:'Ảnh chụp thực tế màn hình Đăng ký và lựa chọn vai trò'},
 login: {src: IMAGE_DIR + 'growmatch-login-public-20261030.jpg',alt:'Ảnh chụp thực tế màn hình Đăng nhập DCG GROWMATCH'},
 employer: {src: IMAGE_DIR + 'growmatch-employer-public-20261030.jpg',alt:'Ảnh chụp thực tế khu vực giới thiệu dành cho doanh nghiệp'},
 develop: {src: IMAGE_DIR + 'growmatch-develop-public-20261030.jpg',alt:'Ảnh chụp thực tế trang giới thiệu Phát triển kỹ năng và nhân sự'}
};
const flows = [
 {
  id:'overview',label:'Khám phá nhanh',
  intro:'Dành cho người lần đầu truy cập và ban giám khảo muốn xem nhanh hành trình sử dụng mà không cần tài khoản.',
  steps:[
   {screen:'home',name:'Mở trang chủ',title:'Nhận biết các khu vực chính',summary:'Bắt đầu tại DCG GROWMATCH và chọn nhu cầu của bạn trước khi tạo tài khoản.',items:['Xem thanh điều hướng: Trang chủ, Việc làm, Ứng viên, Doanh nghiệp và Phát triển.','Chọn “Tìm việc phù hợp” để tìm cơ hội hoặc “Dành cho doanh nghiệp” để xem giải pháp.'],href:'#home',cta:'Mở trang chủ sản phẩm',access:'Có thể xem khi chưa đăng nhập'},
   {screen:'jobs',name:'Xem việc làm',title:'Tìm và đọc thông tin tuyển dụng',summary:'Dùng các bộ lọc thực tế của nền tảng để tìm vị trí quan tâm.',items:['Nhập từ khóa về công việc, kỹ năng hoặc công ty.','Chọn địa điểm, hình thức làm việc rồi bấm “Xem chi tiết”.','Chú ý nhãn “Dữ liệu thử nghiệm” nếu xuất hiện trên tin.'],href:'#jobs',cta:'Mở khu vực Việc làm',access:'Có thể xem danh sách công khai'},
   {screen:'employer',name:'Xem doanh nghiệp',title:'Tìm hiểu góc nhìn nhà tuyển dụng',summary:'Khu vực này giới thiệu cách doanh nghiệp sử dụng thông tin và bằng chứng để hỗ trợ quyết định.',items:['Mở mục “Doanh nghiệp” trên menu.','Xem các bước xác định yêu cầu, đối chiếu, kiểm tra bằng chứng và quyết định.','Muốn quản lý tuyển dụng phải có tài khoản và quyền phù hợp.'],href:'#employer',cta:'Mở trang Doanh nghiệp',access:'Giới thiệu công khai, thao tác quản trị cần quyền'}
  ]
 },
 {
  id:'candidate',label:'Dành cho ứng viên',
  intro:'Đi từ xem công việc, tạo tài khoản đến quản lý hồ sơ; bài đánh giá hoặc luyện tập chỉ xuất hiện khi được cấp quyền.',
  steps:[
   {screen:'jobs',name:'Tìm việc',title:'Chọn cơ hội phù hợp',summary:'Bạn có thể tìm hiểu tin tuyển dụng trước khi đăng ký.',items:['Chọn “Việc làm”, lọc theo vị trí, địa điểm hoặc hình thức.','Mở “Xem chi tiết” để đọc yêu cầu và điều kiện công việc.','Chỉ ứng tuyển khi đã xem kỹ thông tin cần thiết.'],href:'#jobs',cta:'Tìm việc làm',access:'Không cần tài khoản để xem tin công khai'},
   {screen:'register',name:'Tạo tài khoản',title:'Đăng ký với vai trò ứng viên',summary:'Tài khoản ứng viên giúp quản lý hồ sơ và theo dõi quá trình ứng tuyển.',items:['Bấm “Đăng ký” hoặc “Tạo tài khoản mới”.','Chọn đúng vai trò “Ứng viên / Nhân sự” và điền thông tin biểu mẫu.','Hoàn tất các bước xác nhận mà hệ thống hiển thị.'],href:'#register',cta:'Mở màn hình Đăng ký',access:'Không cung cấp mật khẩu cho người khác'},
   {screen:'login',name:'Hồ sơ & ứng tuyển',title:'Đăng nhập để tiếp tục hồ sơ',summary:'Sau khi đăng nhập, mở không gian “Hồ sơ & ứng tuyển” để quản lý dữ liệu của mình.',items:['Điền email và mật khẩu tại màn hình Đăng nhập.','Mở “Hồ sơ & ứng tuyển”, cập nhật thông tin và theo dõi vị trí quan tâm.','Ứng tuyển vị trí phù hợp theo các bước hiển thị.'],href:'#login',cta:'Mở màn hình Đăng nhập',access:'Phần hồ sơ riêng tư chỉ mở với tài khoản hợp lệ'},
   {screen:'develop',name:'Phát triển kỹ năng',title:'Theo dõi luyện tập khi được cấp quyền',summary:'Đánh giá năng lực gắn với vị trí tuyển dụng và quyền mà doanh nghiệp đã cấp.',items:['Sau khi ứng tuyển, kiểm tra xem vị trí có bài đánh giá được mở hay không.','Chỉ bắt đầu bài luyện AI khi tài khoản được doanh nghiệp cấp quyền.','Xem phản hồi và quá trình phát triển trong phạm vi được phép; AI không thay quyết định của người phụ trách.'],href:'#develop',cta:'Xem giới thiệu Phát triển',access:'Ảnh chỉ thể hiện trang giới thiệu công khai, không phải phiên luyện riêng tư'}
  ]
 },
 {
  id:'employer',label:'Dành cho doanh nghiệp',
  intro:'Tìm hiểu giải pháp, tạo tài khoản doanh nghiệp, hoàn thiện hồ sơ xác minh và sử dụng khu vực tuyển dụng theo quyền.',
  steps:[
   {screen:'employer',name:'Tìm hiểu giải pháp',title:'Xem quy trình tuyển dụng có căn cứ',summary:'Trang Doanh nghiệp trình bày cách định nghĩa yêu cầu vị trí, đối chiếu và xem xét bằng chứng.',items:['Từ menu chọn “Doanh nghiệp”.','Đọc luồng 4 bước và các nguyên tắc an toàn dữ liệu.','Chọn tạo tài khoản doanh nghiệp nếu muốn sử dụng công cụ quản lý.'],href:'#employer',cta:'Mở giới thiệu Doanh nghiệp',access:'Có thể xem khi chưa đăng nhập'},
   {screen:'register',name:'Tạo tài khoản',title:'Đăng ký đúng vai trò doanh nghiệp',summary:'Dữ liệu và chức năng của doanh nghiệp được tách khỏi tài khoản ứng viên.',items:['Mở Đăng ký và chọn vai trò “Nhà tuyển dụng / Doanh nghiệp”.','Nhập thông tin theo biểu mẫu hiện tại.','Đăng nhập sau khi hoàn tất các yêu cầu xác nhận tài khoản.'],href:'#register',cta:'Mở màn hình Đăng ký',access:'Chỉ đăng ký cho tổ chức mà bạn có thẩm quyền'},
   {screen:'login',name:'Xác minh tổ chức',title:'Mở không gian tuyển dụng',summary:'Sau đăng nhập, quyền quản lý gắn với tổ chức và trạng thái thẩm định hồ sơ.',items:['Đăng nhập bằng tài khoản doanh nghiệp.','Vào “Không gian tuyển dụng” và bổ sung hồ sơ pháp lý theo yêu cầu hệ thống.','Công ty cần được xác minh và tin tuyển dụng cần được duyệt trước khi công khai.'],href:'#login',cta:'Mở màn hình Đăng nhập',access:'Ảnh là màn hình đăng nhập công khai, không chụp hồ sơ doanh nghiệp riêng tư'},
   {screen:'develop',name:'Tuyển dụng & hỗ trợ',title:'Xem xét hồ sơ, đồng hành cùng nhân sự',summary:'Doanh nghiệp có thể sử dụng công cụ theo vai trò và quyền đã được cấp.',items:['Tạo tin tuyển dụng, theo dõi trạng thái phê duyệt và xem hồ sơ ứng viên trong phạm vi quyền.','Cấp quyền đánh giá hoặc luyện tập khi tính năng và điều kiện được đáp ứng.','Kiểm tra nhận xét AI cùng bằng chứng trước khi ra quyết định nhân sự.'],href:'#develop',cta:'Xem giới thiệu Phát triển',access:'Các thao tác nội bộ cần tài khoản và quyền quản lý phù hợp'}
  ]
 }
];

const escapeHtml = (text) => String(text).replace(/[&<>"']/g, char => ({
 '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[char]));

function renderStep(step,index,flowId){
 const screen=screens[step.screen];
 return `<article class="gm-guide-stage" data-gm-guide-stage="${index}" ${index?'hidden':''}>
   <div class="gm-guide-media">
    <div class="gm-guide-browser" aria-label="Ảnh chụp trang web thực tế">
     <div class="gm-guide-browser-top"><span class="gm-guide-browser-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>dcg-growmatch.vercel.app</span><span class="gm-guide-browser-capture">Giao diện thật</span></div>
     <img src="${screen.src}" width="1440" height="900" loading="lazy" decoding="async" alt="${escapeHtml(screen.alt)}">
    </div>
    <button class="gm-guide-zoom" type="button" data-gm-guide-zoom aria-label="Phóng to ảnh màn hình ${escapeHtml(step.name)}">Phóng to ảnh <span aria-hidden="true">⤢</span></button>
   </div>
   <div class="gm-guide-explain">
    <p class="gm-guide-step-kicker">BƯỚC ${String(index+1).padStart(2,'0')} / ${String(flows.find(f=>f.id===flowId).steps.length).padStart(2,'0')}</p>
    <h3>${escapeHtml(step.title)}</h3>
    <p class="gm-guide-summary">${escapeHtml(step.summary)}</p>
    <ol>${step.items.map(item=>`<li><span class="gm-guide-item-text">${escapeHtml(item)}</span></li>`).join('')}</ol>
    <p class="gm-guide-access"><span aria-hidden="true">●</span> ${escapeHtml(step.access)}</p>
    <a class="gm-button gm-button-primary" href="${PRODUCT_URL+step.href}" target="_blank" rel="noopener noreferrer">${escapeHtml(step.cta)} <span aria-hidden="true">↗</span></a>
   </div>
  </article>`;
}
function renderFlow(flow,index){
 return `<div class="gm-guide-flow" id="gm-guide-panel-${flow.id}" role="tabpanel" tabindex="0" aria-labelledby="gm-guide-tab-${flow.id}" data-gm-guide-flow="${flow.id}" ${index?'hidden':''}>
    <p class="gm-guide-flow-intro">${escapeHtml(flow.intro)}</p>
    <nav class="gm-guide-stepper" aria-label="Các bước trong hành trình ${escapeHtml(flow.label)}">
      ${flow.steps.map((step,i)=>`<button type="button" data-gm-guide-step="${i}" aria-current="${i===0?'step':'false'}"><span>${String(i+1).padStart(2,'0')}</span>${escapeHtml(step.name)}</button>`).join('')}
    </nav>
    <div class="gm-guide-stage-wrap" data-gm-guide-swipe-zone>
      ${flow.steps.map((step,i)=>renderStep(step,i,flow.id)).join('')}
    </div>
    <div class="gm-guide-pager">
      <button type="button" class="gm-guide-page-btn" data-gm-guide-prev disabled aria-label="Xem bước trước">← Bước trước</button>
      <span class="gm-guide-page-count" aria-live="polite"><b>01</b> / ${String(flow.steps.length).padStart(2,'0')}</span>
      <button type="button" class="gm-guide-page-btn" data-gm-guide-next>Tiếp theo →</button>
    </div>
  </div>`;
}
export function growmatchGuideHtml(){
 return `<section class="gm-guide gm-section" id="gm-guide" aria-labelledby="gm-guide-title">
   <div class="gm-container">
    <div class="gm-guide-header">
      <div><p class="gm-kicker">HƯỚNG DẪN / TRẢI NGHIỆM SẢN PHẨM</p><h2 id="gm-guide-title">Bắt đầu cùng <span>DCG GROWMATCH</span></h2><p class="gm-guide-subtitle">Hướng dẫn từng bước bằng hình ảnh giao diện thực tế. Chọn vai trò để biết nên bắt đầu từ đâu và thực hiện bước tiếp theo như thế nào.</p></div>
      <div class="gm-guide-verification" role="note" aria-label="Nguồn ảnh hướng dẫn"><span class="gm-guide-verified-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4.5 4.5L19 7"/></svg></span><span class="gm-guide-verification-text"><strong>Ảnh chụp từ website sản phẩm</strong><small>Trang công khai, không chứa dữ liệu cá nhân</small></span></div>
    </div>
    <div class="gm-guide-tabs" role="tablist" aria-label="Chọn hành trình hướng dẫn">
      ${flows.map((flow,index)=>`<button type="button" id="gm-guide-tab-${flow.id}" role="tab" aria-controls="gm-guide-panel-${flow.id}" aria-selected="${index===0?'true':'false'}" tabindex="${index===0?'0':'-1'}" data-gm-guide-tab="${flow.id}">${escapeHtml(flow.label)}</button>`).join('')}
    </div>
    ${flows.map(renderFlow).join('')}
    <div class="gm-guide-limits">
      <div><b>Không cần đăng nhập</b><p>Xem trang chủ, các tin tuyển dụng công khai và phần giới thiệu giải pháp.</p></div>
      <div><b>Ứng viên cần tài khoản</b><p>Quản lý hồ sơ, ứng tuyển và theo dõi tiến trình. Bài đánh giá chỉ xuất hiện khi được cấp quyền.</p></div>
      <div><b>Doanh nghiệp cần được xác minh</b><p>Hồ sơ tổ chức và tin tuyển dụng được kiểm duyệt trước khi công khai, theo quyền của từng tài khoản.</p></div>
    </div>
    <p class="gm-guide-disclaimer">Hình được chụp từ những màn hình công khai của DCG GROWMATCH tại thời điểm biên soạn. Khu vực tài khoản riêng tư, bài đánh giá và luyện tập AI không được dựng giả làm ảnh chụp thật. Mọi kết quả AI đều cần người có trách nhiệm xem xét.</p>
   </div>
   <dialog id="gm-guide-image-dialog" class="gm-guide-dialog" aria-label="Phóng to ảnh chụp giao diện DCG GROWMATCH">
    <div class="gm-guide-dialog-bar"><b>Ảnh giao diện DCG GROWMATCH</b><button type="button" data-gm-guide-close aria-label="Đóng ảnh phóng to">Đóng ×</button></div><img alt="">
   </dialog>
 </section>`;
}

export function initGrowmatchGuide(){
 const root=document.getElementById('gm-guide');
 if(!root) return;
 const tabs=[...root.querySelectorAll('[data-gm-guide-tab]')];
 const panels=[...root.querySelectorAll('[data-gm-guide-flow]')];
 const modal=root.querySelector('#gm-guide-image-dialog');

 function activateStep(panel,index,focus=false){
   const stepButtons=[...panel.querySelectorAll('[data-gm-guide-step]')];
   const stages=[...panel.querySelectorAll('[data-gm-guide-stage]')];
   const target=Math.min(Math.max(index,0),stages.length-1);
   stages.forEach((stage,i)=>{stage.hidden=i!==target;});
   stepButtons.forEach((btn,i)=>{btn.setAttribute('aria-current',i===target?'step':'false');});
   const prev=panel.querySelector('[data-gm-guide-prev]'),next=panel.querySelector('[data-gm-guide-next]');
   prev.disabled=target===0;next.disabled=target===stages.length-1;
   panel.querySelector('.gm-guide-page-count b').textContent=String(target+1).padStart(2,'0');
   panel.dataset.guideCurrent=String(target);
   if(focus)stepButtons[target]?.focus({preventScroll:true});
 }
 function activateRole(id,focus=false){
   tabs.forEach(tab=>{
     const selected=tab.dataset.gmGuideTab===id;
     tab.setAttribute('aria-selected',String(selected));
     tab.tabIndex=selected?0:-1;
     if(selected && focus)tab.focus({preventScroll:true});
   });
   panels.forEach(panel=>{panel.hidden=panel.dataset.gmGuideFlow!==id;});
 }
 tabs.forEach((tab,i)=>{
   tab.addEventListener('click',()=>activateRole(tab.dataset.gmGuideTab));
   tab.addEventListener('keydown',event=>{
     let target=null;
     if(event.key==='ArrowRight')target=(i+1)%tabs.length;
     if(event.key==='ArrowLeft')target=(i+tabs.length-1)%tabs.length;
     if(event.key==='Home')target=0;
     if(event.key==='End')target=tabs.length-1;
     if(target===null)return;
     event.preventDefault();activateRole(tabs[target].dataset.gmGuideTab,true);
   });
 });
 panels.forEach(panel=>{
   const steps=[...panel.querySelectorAll('[data-gm-guide-step]')];
   steps.forEach((btn,i)=>{
     btn.addEventListener('click',()=>activateStep(panel,i));
     btn.addEventListener('keydown',event=>{
       const cur=Number(panel.dataset.guideCurrent||0);
       let target=null;
       if(event.key==='ArrowRight')target=Math.min(cur+1,steps.length-1);
       if(event.key==='ArrowLeft')target=Math.max(cur-1,0);
       if(event.key==='Home')target=0;
       if(event.key==='End')target=steps.length-1;
       if(target===null)return;
       event.preventDefault();activateStep(panel,target,true);
     });
   });
   panel.querySelector('[data-gm-guide-prev]').addEventListener('click',()=>activateStep(panel,Number(panel.dataset.guideCurrent||0)-1));
   panel.querySelector('[data-gm-guide-next]').addEventListener('click',()=>activateStep(panel,Number(panel.dataset.guideCurrent||0)+1));
   let start=null;
   const zone=panel.querySelector('[data-gm-guide-swipe-zone]');
   zone.addEventListener('touchstart',event=>{const t=event.changedTouches[0];start=t?{x:t.clientX,y:t.clientY}:null},{passive:true});
   zone.addEventListener('touchend',event=>{
     if(!start)return;
     const t=event.changedTouches[0];if(!t){start=null;return}
     const dx=t.clientX-start.x,dy=t.clientY-start.y;start=null;
     if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.35)activateStep(panel,Number(panel.dataset.guideCurrent||0)+(dx<0?1:-1));
   },{passive:true});
   activateStep(panel,0);
 });
 root.querySelectorAll('[data-gm-guide-zoom]').forEach(btn=>btn.addEventListener('click',()=>{
   const image=btn.closest('.gm-guide-stage')?.querySelector('.gm-guide-browser img');
   if(!image)return;
   if(typeof modal.showModal!=='function')return;
   const preview=modal.querySelector('img');
   preview.src=image.currentSrc||image.src;
   preview.alt=image.alt;
   modal.showModal();
 }));
 root.querySelector('[data-gm-guide-close]').addEventListener('click',()=>modal.close());
 modal.addEventListener('click',event=>{if(event.target===modal)modal.close()});
 activateRole('overview');
}
