import './site.css';
import './ggg.css';
import './editorial.css';
import {editorial} from './editorial.js';

const A = '/assets/';
const group = {name:'DCG GROUP', emblem:'dcg-group-emblem.webp', image:'hero-group.webp'};
const brands = [
  {slug:'talent',name:'DCG TALENT',field:'CÔNG NGHỆ NHÂN LỰC',hero:'Năng lực được thấu hiểu. Tương lai được mở lối.',heading:'Phát triển con người trong kỷ nguyên AI.',summary:'Đối sánh công việc, đánh giá năng lực và phát triển kỹ năng nghề nghiệp.',description:'DCG TALENT hướng đến hành trình nghề nghiệp xuyên suốt: từ khám phá công việc, hiểu điểm mạnh đến thực hành những năng lực cần thiết. DCG GROWMATCH là sản phẩm công nghệ nhân lực của nhánh này.',image:'hero-talent.webp',emblem:'dcg-talent-emblem.webp',focus:[['Khám phá cơ hội','Đối sánh kỹ năng ứng viên với yêu cầu công việc qua những tiêu chí có thể giải thích.'],['Hiểu rõ năng lực','Phản hồi dựa trên bài đánh giá, tình huống và minh chứng thay vì suy đoán.'],['Phát triển tiếp','Luyện tập kỹ năng nghề nghiệp và theo dõi tiến bộ qua từng lần thực hành.']],action:{label:'TRẢI NGHIỆM DCG GROWMATCH',href:'https://dcg-growmatch.vercel.app',external:true}},
  {slug:'studio',name:'DCG STUDIO',field:'SÁNG TẠO & SẢN XUẤT NỘI DUNG',hero:'Mỗi ý tưởng xứng đáng có một hình hài riêng.',heading:'Công nghệ mở rộng ngôn ngữ sáng tạo.',summary:'Sản xuất video AI, CGI, hình ảnh và nội dung thương mại.',description:'DCG STUDIO theo đuổi việc kết hợp tư duy thương hiệu, kịch bản và công nghệ mới để phát triển hình ảnh chuyển động, phim quảng cáo và sản phẩm truyền thông có cá tính riêng.',image:'hero-studio.webp',emblem:'dcg-studio-emblem.webp',focus:[['Sản xuất hình ảnh','Phát triển concept, video, CGI và chất liệu hình ảnh ứng dụng AI.'],['Sáng tạo thương mại','Biến thông điệp thương hiệu thành nội dung rõ ràng, nhất quán và giàu cảm xúc.'],['Chất lượng sáng tạo','Tôn trọng nguồn tư liệu, bản quyền và sự trung thực trong nội dung sản xuất.']],action:{label:'TRAO ĐỔI VỀ SÁNG TẠO',href:'/lien-he'}},
  {slug:'vision',name:'DCG VISION',field:'THỊ GIÁC MÁY TÍNH',hero:'Nhìn rõ hơn. Hiểu đúng hơn. Vận hành tốt hơn.',heading:'Đưa thị giác máy tính đến gần vận hành.',summary:'Nghiên cứu camera AI hỗ trợ quan sát và kiểm soát chất lượng.',description:'DCG VISION tập trung nghiên cứu ứng dụng phân tích hình ảnh vào các quy trình cần quan sát. Dự án Mắt Thần hướng tới hỗ trợ nhân sự QA/QC ngành F&B phát hiện những dấu hiệu cần kiểm tra.',image:'hero-vision.webp',emblem:'dcg-vision-emblem.webp',focus:[['Thị giác máy tính','Nghiên cứu nhận diện và phân tích hình ảnh dựa trên tiêu chí đo lường rõ ràng.'],['Mắt Thần AI','Hướng phát triển camera AI hỗ trợ theo dõi quy trình QA/QC trong ngành F&B.'],['Con người xác minh','Cảnh báo từ AI không phải kết luận vi phạm; con người có trách nhiệm đánh giá lại.']],action:{label:'TÌM HIỂU DỰ ÁN MẮT THẦN',href:'/mat-than-ai'}},
  {slug:'entertainment',name:'DCG ENTERTAINMENT',field:'GIẢI TRÍ SỐ',hero:'Một thế giới mới bắt đầu từ trí tưởng tượng.',heading:'Kể những câu chuyện theo cách chưa từng có.',summary:'Phim AI, âm nhạc AI và phát triển nhân vật sáng tạo nguyên bản.',description:'DCG ENTERTAINMENT khám phá những hình thức giải trí mới từ phim, âm nhạc đến các nhân vật và thế giới hư cấu ứng dụng AI; kết nối công nghệ hiện đại với cảm hứng văn hóa Việt Nam.',image:'hero-entertainment.webp',emblem:'dcg-entertainment-emblem.webp',focus:[['Phim & nội dung AI','Phát triển ý tưởng phim ngắn, hoạt hình và những câu chuyện nguyên bản.'],['Âm nhạc & hình ảnh','Khám phá MV, nhạc và trải nghiệm nghe nhìn ứng dụng công nghệ mới.'],['Nhân vật & thế giới','Xây dựng nhân vật có bản sắc, câu chuyện và hệ hình ảnh nhất quán.']],action:{label:'KẾT NỐI VỚI DCG ENTERTAINMENT',href:'/lien-he'}}
];

/* Approved-to-preview editorial text is centralized; no changes to existing product functionality. */
brands.forEach(b=>{
 const e=editorial.brands[b.slug];
 if(!e)return;
 b.field=e.field; b.heading=e.title; b.summary=e.card; b.detailSummary=e.summary; b.description=e.intro.join(" ");
 b.hero=e.introTitle;b.intro=e.intro;b.focus=e.focus.map(x=>[x.title,x.description]);b.faq=e.faq;
});

const menus = [['/','Trang chủ'],['/gioi-thieu','Giới thiệu'],['/gioi-thieu#ban-lanh-dao','Ban lãnh đạo'],['/he-sinh-thai','Hệ sinh thái'],...brands.map(b=>['/he-sinh-thai/dcg-'+b.slug,b.name]),['/giai-phap','Giải pháp'],['/du-an','Dự án'],['/goc-nhin','Góc nhìn'],['/lien-he','Liên hệ']];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const logo=(name,css='logo-icon')=>`<img class="${css}" src="${A+name}" alt="" decoding="async">`;
const cta=(text,href,css='link-arrow',external=false)=>`<a class="${css}" href="${href}"${external?' target="_blank" rel="noopener noreferrer"':''}><span>${text}</span><span aria-hidden="true">↗</span></a>`;
function shell(content,route){return `<a class="skip-link" href="#content">Bỏ qua điều hướng</a>
<header class="site-header" id="site-header"><div class="site-header-inner">
<a href="/" class="logo-lockup" aria-label="DCG GROUP - Trang chủ">${logo(group.emblem)}<span><strong>DCG GROUP</strong><small>CÔNG NGHỆ & SÁNG TẠO</small></span></a>
<nav class="nav-primary" aria-label="Điều hướng chính"><a href="/gioi-thieu"${['/gioi-thieu','/ve-dcg'].includes(route)?' aria-current="page"':''}>Giới thiệu</a><a href="/he-sinh-thai"${route.startsWith('/he-sinh-thai')?' aria-current="page"':''}>Hệ sinh thái</a><a href="/giai-phap"${route.startsWith('/giai-phap')?' aria-current="page"':''}>Giải pháp</a><a href="/du-an"${route.startsWith('/du-an')?' aria-current="page"':''}>Dự án</a><a href="/goc-nhin"${route.startsWith('/goc-nhin')?' aria-current="page"':''}>Góc nhìn</a><a href="/lien-he"${route==='/lien-he'?' aria-current="page"':''}>Liên hệ</a></nav>
<button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Mở menu"><span></span><span></span><span></span></button></div></header>
<div class="mobile-menu" id="mobile-menu" aria-hidden="true" inert><div class="mobile-menu-inner"><p class="eyebrow">KHÁM PHÁ DCG GROUP</p><nav aria-label="Menu toàn bộ">${menus.map(([url,label],i)=>`<a href="${url}"${route===url?' aria-current="page"':''}><span>${String(i+1).padStart(2,'0')}</span><strong>${label}</strong><span aria-hidden="true">↗</span></a>`).join('')}</nav><p class="menu-note">VIỆT NAM · 2026</p></div></div>
<main id="content">${content}</main>
<footer class="site-footer"><div class="container"><div class="footer-columns"><div class="footer-brand"><a href="/" class="footer-logo">${logo(group.emblem)}<strong>DCG GROUP</strong></a><p>DCG đang xây dựng hệ sinh thái trong lĩnh vực nhân lực, sáng tạo nội dung, giải trí và ứng dụng AI. Tìm hiểu từng nhánh để bắt đầu từ nhu cầu phù hợp.</p></div><div><p class="footer-title">TÌM HIỂU</p><a href="/gioi-thieu">Giới thiệu</a><a href="/gioi-thieu#ban-lanh-dao">Ban lãnh đạo</a><a href="/he-sinh-thai">Hệ sinh thái</a><a href="/giai-phap">Giải pháp</a><a href="/du-an">Dự án</a><a href="/goc-nhin">Góc nhìn</a><a href="/lien-he">Liên hệ</a></div><div><p class="footer-title">THƯƠNG HIỆU</p>${brands.map(b=>`<a href="/he-sinh-thai/dcg-${b.slug}">${b.name}</a>`).join('')}</div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} DCG GROUP. Thông tin giới thiệu các định hướng phát triển.</span><span><a href="/thong-tin-du-lieu">Thông tin xử lý dữ liệu</a> · Kiến tạo từ bản sắc Việt Nam.</span></div></div></footer>`}

// Single source of truth for DCG GROUP leadership profile.
// Portrait remains null until an authentic, owner-approved photo of Trương Quốc Huy is supplied.
const leadership = Object.freeze({
  name: 'Trương Quốc Huy',
  role: 'Founder & CEO',
  title: 'Nhà sáng lập & Tổng giám đốc DCG GROUP',
  portrait: '/images/ceo-founder-dcg.png',
  portraitAlt: 'Trương Quốc Huy — Founder & CEO DCG GROUP'
});
function leadershipSection(full=false){
 const photo = leadership.portrait
  ? `<img class="leader-photo" src="${esc(leadership.portrait)}" alt="${esc(leadership.portraitAlt)}" width="640" height="910" loading="lazy" decoding="async">`
  : `<div class="leader-photo-pending" role="note" aria-label="Ảnh chân dung Trương Quốc Huy chưa được xác minh"><div class="leader-photo-motif" aria-hidden="true"><img src="/assets/dcg-group-emblem.webp" alt="" width="110" height="110" loading="lazy"></div><p>HÌNH ẢNH LÃNH ĐẠO</p><span>Đang chờ ảnh chân dung được xác minh</span></div>`;
 return `<section class="leadership-section page-section" id="${full?'ban-lanh-dao':'lanh-dao'}" aria-labelledby="leadership-heading">
   <div class="container">
     ${sectionTop(full?'03':'04','BAN LÃNH ĐẠO')}
     <div class="leadership-layout">
       <div class="leader-portrait-frame">${photo}</div>
       <div class="leader-content">
          <p class="eyebrow">BAN LÃNH ĐẠO</p>
          <h2 id="leadership-heading">${leadership.name}</h2>
          <p class="leader-role">${leadership.role}</p>
          <p class="leader-title">${leadership.title}</p>
          <div class="leader-rule" aria-hidden="true"></div>
          ${full?cta('KHÁM PHÁ HỆ SINH THÁI','/he-sinh-thai','link-arrow'):cta('TÌM HIỂU BAN LÃNH ĐẠO','/gioi-thieu#ban-lanh-dao','link-arrow')}
       </div>
     </div>
   </div>
 </section>`;
}

const sectionTop=(n,caption)=>`<div class="section-serial"><span>${n} <i>/</i> ${caption}</span><span>DCG GROUP</span></div>`;
const eyebrow=text=>`<p class="eyebrow">${text}</p>`;

function home(){
 const e=editorial.home;
 return `
<section class="home-hero"><div class="home-hero-copy"><div class="home-hero-copy-inner">
 ${eyebrow('DCG GROUP')}
 <h1>${esc(e.heroTitle)}</h1><p>${esc(e.heroDescription)}</p>
 <div class="hero-actions">${cta('KHÁM PHÁ HỆ SINH THÁI','/he-sinh-thai','button-dark')}${cta('LIÊN HỆ HỢP TÁC','/lien-he','button-secondary')}</div>
 <div class="hero-accent"><span>DCG GROUP</span><div></div><span>${esc(e.heroTagline)}</span></div>
 </div></div>
 <div class="home-hero-media"><div class="hero-image-mosaic" role="img" aria-label="Bốn lĩnh vực nhân lực, hình ảnh, giải trí và camera AI của DCG GROUP">
 ${brands.map((b,i)=>`<img src="${A+b.image}" alt="" ${i===0?'fetchpriority="high"':'loading="eager"'} decoding="async">`).join('')}
 </div><div class="hero-media-tag"><span>DCG GROUP</span><span>VIỆT NAM</span></div></div></section>
<section class="about-home page-section"><div class="container">
 ${sectionTop('01','VỀ DCG')}
 <div class="about-home-grid"><div>${eyebrow('GIỚI THIỆU')}<h2>${esc(e.aboutTitle)}</h2></div>
 <div>${e.about.map((p,i)=>`<p class="${i===0?'lead':''}">${esc(p)}</p>`).join('')}
 ${cta('TÌM HIỂU VỀ DCG','/gioi-thieu')}</div></div></div></section>
<section class="brands-home page-section"><div class="container">
 ${sectionTop('02','HỆ SINH THÁI')}
 <div class="section-intro"><div>${eyebrow('BỐN LĨNH VỰC')}<h2>${esc(e.ecosystemTitle)}</h2></div><p>${esc(e.ecosystemIntro)}</p></div></div>
 ${brandRows()}</section>
<section class="need-section page-section"><div class="container">
 ${sectionTop('03','CHỌN THEO NHU CẦU')}<div class="section-intro"><div>${eyebrow('BẮT ĐẦU TỪ VẤN ĐỀ')}<h2>Bạn đang muốn giải quyết việc gì?</h2></div><p>Không cần bắt đầu bằng một bản yêu cầu hoàn chỉnh. Hãy chọn vấn đề gần nhất với công việc của bạn.</p></div>
 <div class="need-grid">${e.needs.map((n,i)=>`<a href="/lien-he?linh-vuc=${['talent','studio','entertainment','vision'][i]}" class="need-card">
  <span class="need-count">0${i+1}</span><h3>${esc(n.title)}</h3><p>${esc(n.description)}</p><span class="need-link">${esc(n.button)} ↗</span></a>`).join('')}</div>
 </div></section>
<section class="workflow-section page-section"><div class="container">
 ${sectionTop('04','CÁCH TIẾP CẬN')}<div class="section-intro"><div>${eyebrow('QUY TRÌNH ĐỀ XUẤT')}<h2>Rõ từ nhu cầu đến phần việc.</h2></div><p>Cách tiếp cận đề xuất, được điều chỉnh theo phạm vi và điều kiện thống nhất ở từng dự án.</p></div>
 <div class="workflow-grid">${e.steps.map(step=>`<article><span>0${step.num}</span><h3>${esc(step.title)}</h3><p>${esc(step.description)}</p></article>`).join('')}</div>
 </div></section>
 ${leadershipSection(false)}
 <section class="projects-home page-section"><div class="container">
 ${sectionTop('06','DỰ ÁN VÀ SẢN PHẨM')}<div class="section-intro"><div>${eyebrow('TỪ Ý TƯỞNG ĐẾN SẢN PHẨM')}<h2>Từ ý tưởng đến sản phẩm.</h2></div><p>Xem các sản phẩm, nội dung và thử nghiệm của DCG. Mỗi dự án ghi rõ mục tiêu, phần việc thực hiện và giai đoạn phát triển.</p></div>
 <div class="project-list"><a href="/du-an/dcg-growmatch" class="project-line"><span>01</span><div><small>DCG TALENT · ĐANG PHÁT TRIỂN</small><h3>DCG GROWMATCH</h3><p>Hỗ trợ đánh giá, đối sánh và phát triển năng lực nghề nghiệp.</p></div><b aria-hidden="true">↗</b></a>
 <a href="/du-an/mat-than-ai" class="project-line"><span>02</span><div><small>DCG VISION · NGHIÊN CỨU</small><h3>Mắt Thần AI</h3><p>Hướng nghiên cứu camera AI hỗ trợ QA/QC ngành F&B.</p></div><b aria-hidden="true">↗</b></a></div></div></section>
 <section class="insights-home page-section"><div class="container">
 ${sectionTop('07','GÓC NHÌN')}<div class="section-intro"><div>${eyebrow('NỘI DUNG BIÊN SOẠN')}<h2>Những điều đáng nghĩ trước khi bắt tay làm.</h2></div><p>Góc nhìn của DCG về công việc, sáng tạo và ứng dụng công nghệ trong những tình huống cụ thể.</p></div>
 ${insightCards()}<div class="section-read-all">${cta('ĐỌC THÊM GÓC NHÌN','/goc-nhin')}</div></div></section>
 ${endBanner()}`;
}
function brandRows(){return `<div class="brand-rows">${brands.map((b,i)=>`<article class="brand-row${i%2?' reverse':''}"><div class="brand-row-image"><img src="${A+b.image}" alt="Hình minh họa cho lĩnh vực ${b.name}" loading="lazy" decoding="async"></div><div class="brand-row-copy"><div class="brand-row-copy-inner"><p class="micro-index">${String(i+1).padStart(2,'0')} <span>/</span> 04 · ${esc(b.field)}</p><div class="brand-inline">${logo(b.emblem)}<strong>${b.name}</strong></div><h3>${esc(b.heading)}</h3><p>${esc(b.summary)}</p>${cta('KHÁM PHÁ THƯƠNG HIỆU','/he-sinh-thai/dcg-'+b.slug)}</div></div></article>`).join('')}</div>`}
function endBanner(){return `<section class="end-banner"><div class="container"><div>${eyebrow('KẾT NỐI')}<h2>${esc(editorial.home.footerTitle)}</h2><p class="end-note">${esc(editorial.home.footerDescription)}</p></div>${cta('TRAO ĐỔI VỚI DCG','/lien-he','button-outline')}</div></section>`}
function innerHero(kicker,title,description,image=''){return `<section class="inner-hero${image?' with-image':''}"><div class="inner-hero-text"><div class="inner-hero-text-inner">${eyebrow(kicker)}<h1>${title}</h1><p>${description}</p></div></div>${image?`<div class="inner-hero-media"><img src="${A+image}" alt="" fetchpriority="high"></div>`:''}</section>`}

function about(){
 const a=editorial.about;
 return `${innerHero('VỀ DCG GROUP',esc(a.title),esc(a.intro),group.image)}
 <section class="page-section about-long"><div class="container">${sectionTop('01','CÂU CHUYỆN THƯƠNG HIỆU')}
 <div class="editorial-content"><div>${eyebrow('VỀ DCG')}<h2>${esc(a.storyTitle)}</h2></div><div>${a.story.map((p,i)=>`<p class="${i===0?'lead':''}">${esc(p)}</p>`).join('')}</div></div>
 </div></section>
 <section class="philosophy page-section" id="dinh-huong"><div class="container">${sectionTop('02','TẦM NHÌN & SỨ MỆNH')}
 <div class="philosophy-grid editorial-vision">
 <article><span>01</span><h3>${esc(a.visionTitle)}</h3><p>${esc(a.vision)}</p></article>
 <article><span>02</span><h3>${esc(a.missionTitle)}</h3><p>${esc(a.mission)}</p></article>
 </div></div></section>
 <section class="principles-section page-section"><div class="container">${sectionTop('03','NGUYÊN TẮC LÀM VIỆC')}
 <h2>Cách DCG lựa chọn làm việc.</h2>
 <div class="principles-grid">${a.principles.map((p,i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p></article>`).join('')}</div>
 </div></section>
 <section class="identity-section page-section"><div class="container">${sectionTop('04','BẢN SẮC')}
 <div class="editorial-content"><div>${eyebrow('TỪ VIỆT NAM')}<h2>${esc(a.identityTitle)}</h2></div>
 <div>${a.identity.map(p=>`<p>${esc(p)}</p>`).join('')}<p class="identity-line">Việt Nam – Kỷ nguyên vươn mình</p></div></div>
 </div></section>
 ${leadershipSection(true)}
 ${endBanner()}`;
}
function ecosystem(){return `
<section class="directory-intro"><div class="container">
${breadcrumb([{name:"Trang chủ",href:"/"},{name:"Hệ sinh thái"}])}
<p class="eyebrow">DCG GROUP / FOUR BRANDS</p>
<h1>Hệ sinh thái DCG</h1>
<p class="directory-subtitle">Tìm hiểu bốn thương hiệu và định hướng phát triển trong hệ sinh thái công nghệ, nhân lực và sáng tạo DCG GROUP.</p>
<form class="brand-search" id="brand-search" role="search" autocomplete="off">
  <label for="brand-keyword">Tìm thương hiệu hoặc lĩnh vực</label>
  <div class="brand-search-controls">
    <input id="brand-keyword" type="search" name="q" placeholder="Tìm thương hiệu hoặc lĩnh vực…" maxlength="80" aria-controls="brand-results">
    <button type="submit" class="search-submit">Tìm kiếm <span aria-hidden="true">→</span></button>
    <button type="button" id="clear-brand-search" class="search-reset" hidden>Xóa lọc</button>
  </div>
</form>
<p class="brand-result-count" id="brand-result-count" role="status" aria-live="polite">4 thương hiệu</p>
<div id="brand-results" class="brand-directory-grid">
  ${brands.map((b)=>brandTile(b)).join("")}
</div>
<div id="brand-empty" class="brand-empty" hidden>
  <h2>Không tìm thấy thương hiệu phù hợp</h2><p>Thử từ khóa khác hoặc xóa bộ lọc để xem toàn bộ hệ sinh thái.</p>
  <button type="button" id="empty-reset">Xem tất cả thương hiệu</button>
</div>
</div></section>`;}
function breadcrumb(items){return `<nav class="breadcrumbs" aria-label="Đường dẫn trang">${items.map((item,i)=>i===items.length-1?`<span aria-current="page">${esc(item.name)}</span>`:`<a href="${item.href}">${esc(item.name)}</a><span aria-hidden="true">/</span>`).join("")}</nav>`;}
function brandTile(b){return `<a class="directory-tile" href="/he-sinh-thai/dcg-${b.slug}" aria-label="Khám phá ${b.name}">
   <div class="tile-banner"><img src="${A+b.image}" alt="" loading="lazy" decoding="async"><span class="tile-banner-label">DCG GROUP · ${esc(b.field)}</span></div>
   <div class="tile-meta"><div class="tile-identity">${logo(b.emblem,"tile-logo")}<div><h2>${b.name}</h2><p>${b.field}</p></div></div><span class="tile-arrow" aria-hidden="true">↗</span></div>
   <p class="tile-summary">${b.summary}</p>
   <span class="tile-more">Khám phá thương hiệu <span aria-hidden="true">→</span></span>
 </a>`;}
function normalizeSearch(value){return String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase().trim();}
function initBrandSearch(){
 const f=document.getElementById("brand-search");if(!f)return;
 const field=f.querySelector("#brand-keyword"),results=document.getElementById("brand-results"),count=document.getElementById("brand-result-count");
 const reset=document.getElementById("clear-brand-search"),empty=document.getElementById("brand-empty");
 const show=(q,writeHistory=false)=>{
   const needle=normalizeSearch(q).slice(0,80);
   const filtered=brands.filter(b=>normalizeSearch([b.name,b.field,b.summary,b.description].join(" ")).includes(needle));
   results.innerHTML=filtered.map(brandTile).join("");
   field.value=q;reset.hidden=!q.trim();empty.hidden=filtered.length>0;
   count.textContent=filtered.length+" / "+brands.length+" thương hiệu";
   if(writeHistory){const url=new URL(location.href);if(q.trim())url.searchParams.set("q",q.trim());else url.searchParams.delete("q");history.pushState(null,"",url.pathname+url.search)}
 };
 const clear=()=>{show("",true);field.focus()};
 f.addEventListener("submit",e=>{e.preventDefault();show(field.value,true)});
 field.addEventListener("input",()=>show(field.value,false));
 reset.addEventListener("click",clear);
 document.getElementById("empty-reset").addEventListener("click",clear);
 window.addEventListener("popstate",()=>show(new URLSearchParams(location.search).get("q")||"",false));
 show(new URLSearchParams(location.search).get("q")||"",false);
}

function brandPage(b){
 return `<section class="detail-intro"><div class="container">
 ${breadcrumb([{name:'Trang chủ',href:'/'},{name:'Hệ sinh thái',href:'/he-sinh-thai'},{name:b.name}])}
 <div class="detail-head"><div class="detail-head-text"><p class="eyebrow">${esc(b.field)}</p>
 <div class="detail-brand">${logo(b.emblem,'detail-emblem')}<span>${b.name}</span></div><h1>${esc(b.heading)}</h1><p>${esc(b.detailSummary)}</p><div class="detail-status"><span>Định hướng phát triển của DCG GROUP</span></div>
 ${cta('TRAO ĐỔI NHU CẦU','/lien-he?linh-vuc='+b.slug,'link-arrow')}
 </div><div class="detail-image"><img src="${A+b.image}" alt="Hình minh họa ${b.name}" fetchpriority="high"></div></div>
 </div></section>
 <section class="page-section detail-main"><div class="container">${sectionTop('01','GIỚI THIỆU')}
 <div class="detail-main-grid"><div>${eyebrow('VỀ '+b.name)}<h2>${esc(b.hero)}</h2></div>
 <div>${b.intro.map((p,i)=>`<p class="${i===0?'lead':''}">${esc(p)}</p>`).join('')}</div></div></div></section>
 <section class="page-section focus-section"><div class="container">${sectionTop('02','HƯỚNG PHÁT TRIỂN')}
 <div class="focus-grid">${b.focus.map((f,i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><h3>${esc(f[0])}</h3><p>${esc(f[1])}</p></article>`).join('')}</div>
 </div></section>
 ${b.slug==='talent'?`<section class="branch-special page-section"><div class="container">${sectionTop('03','DCG GROWMATCH')}<div class="branch-special-card"><div><p class="eyebrow">DCG TALENT / SẢN PHẨM</p><h2>Tìm hiểu DCG GROWMATCH</h2><p>DCG GROWMATCH được phát triển theo định hướng hỗ trợ tìm hiểu sự phù hợp giữa con người và công việc, kết hợp luyện tập và phản hồi để người dùng có cơ sở phát triển năng lực.</p><p class="branch-mantra">Phù hợp trước – phát triển tiếp – con người quyết định.</p></div>${cta('KHÁM PHÁ DCG GROWMATCH','https://dcg-growmatch.vercel.app','button-dark',true)}</div></div></section>`:''}
 ${b.slug==='vision'?`<section class="branch-special page-section"><div class="container">${sectionTop('03','DỮ LIỆU CAMERA')}<div class="branch-special-card"><div><h2>Điều cần đặt ra trước khi dùng dữ liệu camera</h2><p>Phạm vi ghi hình, mục đích sử dụng, người được truy cập và thời gian lưu cần được làm rõ. Một tín hiệu tự động cần được xem cùng bối cảnh, không dùng riêng để kết luận về hành vi hay đánh giá nhân sự.</p></div></div></div></section>`:''}
 <section class="page-section detail-faq"><div class="container">${sectionTop('04','CÂU HỎI THƯỜNG GẶP')}
 ${b.faq.map(q=>`<details><summary>${esc(q.question)}</summary><p>${esc(q.answer)}</p></details>`).join('')}
 </div></section>
 <section class="page-section related-brands"><div class="container">${sectionTop('05','KHÁM PHÁ THÊM')}<h2>Thương hiệu liên quan</h2><div class="related-grid">${brands.filter(x=>x.slug!==b.slug).map(brandTile).join('')}</div></div></section>
 ${endBanner()}`;
}
function eye(){return `${innerHero('DCG VISION · DỰ ÁN NGHIÊN CỨU','Mắt Thần AI<br>cho QA/QC F&B.','Nghiên cứu ứng dụng camera AI nhằm hỗ trợ nhân sự quan sát chất lượng và quy trình.',brands[2].image)}<section class="page-section"><div class="container">${sectionTop('01','GIỚI THIỆU DỰ ÁN')}<div class="editorial-content"><div>${eyebrow('THỊ GIÁC MÁY TÍNH')}<h2>Hỗ trợ quan sát.<br>Không thay thế con người.</h2></div><div><p class="lead">Những dấu hiệu AI phát hiện cần được xác minh trong bối cảnh thực tế.</p><p>Mắt Thần AI là hướng phát triển của DCG VISION dành cho hoạt động QA/QC ngành thực phẩm và đồ uống. Dự án nghiên cứu khả năng dùng hình ảnh camera để nhận biết các điểm cần kiểm tra trong quá trình vận hành.</p><p>Đây là dự án đang phát triển, chưa công bố tỷ lệ chính xác hay kết quả triển khai thương mại khi chưa có kiểm định thực tế.</p>${cta('TÌM HIỂU DCG VISION','/vision')}</div></div></div></section>${endBanner()}`}
function contact(){return `${innerHero('LIÊN HỆ · DCG GROUP','Bắt đầu một cuộc trò chuyện.','Mọi ý tưởng hợp tác đều bắt đầu từ việc lắng nghe và trao đổi rõ ràng.')}<section class="page-section"><div class="container">${sectionTop('01','THÔNG TIN KẾT NỐI')}<div class="contact-layout"><div><h2>Cùng tạo nên<br>những giá trị mới.</h2><p>Hãy chuẩn bị lời nhắn về lĩnh vực bạn quan tâm. Hiện website chưa công bố địa chỉ tiếp nhận chính thức nên biểu mẫu chỉ giúp soạn và sao chép nội dung, không tự gửi hay lưu thông tin.</p><div class="contact-nav">${brands.map(b=>`<a href="/${b.slug}">${b.name} <span aria-hidden="true">↗</span></a>`).join('')}</div></div><form id="contact-form" class="contact-form"><p class="form-label">SOẠN LỜI NHẮN HỢP TÁC</p><label for="contact-name">Họ và tên *</label><input required minlength="2" maxlength="120" name="name" id="contact-name" autocomplete="name" placeholder="Tên người liên hệ"><label for="contact-email">Email *</label><input required type="email" maxlength="200" name="email" id="contact-email" autocomplete="email" placeholder="name@example.com"><label for="contact-topic">Lĩnh vực quan tâm</label><select name="topic" id="contact-topic"><option>DCG GROUP</option>${brands.map(b=>`<option>${b.name}</option>`).join('')}</select><label for="contact-note">Nội dung *</label><textarea required minlength="10" maxlength="4000" rows="5" name="note" id="contact-note" placeholder="Nhu cầu hoặc ý tưởng cần trao đổi"></textarea><button type="submit">SAO CHÉP LỜI NHẮN ↗</button><p class="form-status" id="form-status" role="status">Dữ liệu không được gửi lên máy chủ từ biểu mẫu này.</p></form></div></div></section>`}
const solutions=[
 {slug:"dcg-growmatch",name:"DCG GROWMATCH",branch:"DCG TALENT",state:"Sản phẩm có website riêng",summary:"Nền tảng hỗ trợ đánh giá, đối sánh và phát triển năng lực nghề nghiệp.",detail:"DCG GROWMATCH phát triển các chức năng hồ sơ ứng viên, bài đánh giá và luyện kỹ năng. Khả năng hoạt động từng tính năng phải được xác nhận trên hệ thống sản phẩm riêng.",img:brands[0].image,link:"https://dcg-growmatch.vercel.app",external:true},
 {slug:"sang-tao-video-ai",name:"Sáng tạo video AI & CGI",branch:"DCG STUDIO",state:"Định hướng phát triển",summary:"Khám phá các phương pháp ứng dụng AI trong hình ảnh chuyển động và nội dung thương mại.",detail:"Định hướng phát triển kịch bản, ý tưởng, hình ảnh và video với AI. Chưa công bố biểu giá, năng lực sản xuất hay số lần chỉnh sửa khi chưa được phê duyệt.",img:brands[1].image},
 {slug:"mat-than-ai",name:"Mắt Thần AI",branch:"DCG VISION",state:"Dự án nghiên cứu",summary:"Nghiên cứu camera AI hỗ trợ các hoạt động quan sát và QA/QC ngành F&B.",detail:"Hướng nghiên cứu ứng dụng thị giác máy tính nhằm nhận diện các dấu hiệu cần con người xác minh. Không tuyên bố độ chính xác hay hiệu quả triển khai thương mại chưa đo lường.",img:brands[2].image},
 {slug:"noi-dung-giai-tri-ai",name:"Nội dung giải trí AI",branch:"DCG ENTERTAINMENT",state:"Định hướng phát triển",summary:"Khám phá phim, âm nhạc và các nhân vật AI nguyên bản.",detail:"Định hướng kể chuyện và phát triển nội dung giải trí ứng dụng AI. Việc xuất bản sản phẩm cụ thể cần bảo đảm quyền sử dụng tài sản, âm nhạc và nhân vật.",img:brands[3].image}
];
function solutionCard(item){return `<a class="solution-card" href="/giai-phap/${item.slug}"><img src="${A+item.img}" alt="" loading="lazy"><div class="solution-card-body"><p class="solution-state">${esc(item.state)} · ${esc(item.branch)}</p><h2>${esc(item.name)}</h2><p>${esc(item.summary)}</p><span>Xem phạm vi và điều kiện ↗</span></div></a>`;}
function solutionsPage(){return `
<section class="directory-intro"><div class="container">${breadcrumb([{name:"Trang chủ",href:"/"},{name:"Giải pháp"}])}<p class="eyebrow">DCG GROUP / GIẢI PHÁP</p><h1>Ý tưởng và giải pháp</h1><p class="directory-subtitle">Tìm hiểu các sản phẩm, hướng ứng dụng và nghiên cứu trong hệ sinh thái DCG. Trạng thái được phân biệt rõ theo thực tế.</p>
<div class="solution-grid">${solutions.map(solutionCard).join("")}</div>
</div></section>`;}
function solutionDetail(item){return `<section class="directory-intro"><div class="container">
${breadcrumb([{name:"Trang chủ",href:"/"},{name:"Giải pháp",href:"/giai-phap"},{name:item.name}])}
<p class="eyebrow">${esc(item.branch)} / ${esc(item.state)}</p><h1>${esc(item.name)}</h1><p class="directory-subtitle">${esc(item.summary)}</p>
<div class="solution-detail"><div><img src="${A+item.img}" alt="" decoding="async"><h2>Phạm vi và hướng phát triển</h2><p>${esc(item.detail)}</p><h2>Điều kiện và thông tin chưa công bố</h2><p>Giá bán, quy trình triển khai, yêu cầu dữ liệu và thời hạn thực hiện chỉ được xác nhận khi có thông tin chính thức. Nếu chưa có, vui lòng không coi các mô tả ở đây là cam kết cung cấp dịch vụ.</p></div>
<aside class="solution-aside"><p class="eyebrow">BƯỚC TIẾP THEO</p><h3>${esc(item.state)}</h3>${item.external?cta("MỞ WEBSITE SẢN PHẨM",item.link,"button-dark",true):cta("CHUẨN BỊ YÊU CẦU TRAO ĐỔI","/lien-he","button-dark")}
<p>Biểu mẫu tại DCG GROUP hiện chỉ giúp soạn và sao chép nội dung; chưa gửi tự động.</p></aside></div></div></section>`;}
function projectsPage(){return `<section class="directory-intro"><div class="container">${breadcrumb([{name:"Trang chủ",href:"/"},{name:"Dự án"}])}<p class="eyebrow">DCG GROUP / DỰ ÁN</p><h1>Dự án và sản phẩm</h1><p class="directory-subtitle">Các dự án được giới thiệu với trạng thái rõ ràng, không dùng số liệu thành tựu chưa có bằng chứng.</p>
<div class="solution-grid">${[solutions[0],solutions[2]].map(p=>`<a class="solution-card" href="/du-an/${p.slug}"><img src="${A+p.img}" alt=""><div class="solution-card-body"><p class="solution-state">${p.state}</p><h2>${p.name}</h2><p>${p.summary}</p><span>Đọc giới thiệu dự án ↗</span></div></a>`).join("")}</div></div></section>`;}
function projectDetail(item){return `<section class="directory-intro"><div class="container">${breadcrumb([{name:"Trang chủ",href:"/"},{name:"Dự án",href:"/du-an"},{name:item.name}])}<p class="eyebrow">${esc(item.branch)} / ${esc(item.state)}</p><h1>${esc(item.name)}</h1><p class="directory-subtitle">${esc(item.summary)}</p><div class="solution-detail"><article><img src="${A+item.img}" alt="Hình minh họa dự án"><h2>Bối cảnh và mục tiêu</h2><p>${esc(item.detail)}</p><h2>Giới hạn bằng chứng</h2><p>Trang này giới thiệu phạm vi và định hướng dự án. Chưa công bố số liệu kết quả, chứng nhận, hợp đồng hay trường hợp khách hàng thực tế khi không có nguồn kiểm chứng đi kèm.</p></article><aside class="solution-aside"><h3>Trao đổi dự án</h3>${cta("LIÊN HỆ HỢP TÁC","/lien-he","button-dark")}</aside></div></div></section>`;}
function dataInfo(){return `<section class="directory-intro"><div class="container">${breadcrumb([{name:"Trang chủ",href:"/"},{name:"Thông tin xử lý dữ liệu"}])}<p class="eyebrow">DCG GROUP / THÔNG TIN DỮ LIỆU</p><h1>Thông tin xử lý dữ liệu trên website</h1><div class="data-info"><h2>Biểu mẫu liên hệ</h2><p>Biểu mẫu tại trang liên hệ hiện giúp người dùng soạn và sao chép thông tin ngay trên thiết bị. Trang này chưa kết nối backend tiếp nhận, không lưu nội dung biểu mẫu lên máy chủ DCG qua chức năng đó.</p><h2>Website bên ngoài</h2><p>Liên kết đến DCG GROWMATCH và các website bên ngoài sẽ đưa bạn sang hệ thống khác với phương thức xử lý dữ liệu riêng. Hãy kiểm tra chính sách trên hệ thống đích trước khi cung cấp thông tin.</p><h2>Giới hạn</h2><p>Đây là thông tin về cách hoạt động hiện tại của biểu mẫu, chưa phải một chính sách bảo mật pháp lý hoàn chỉnh. Các thông tin về analytics, cookie và nhà cung cấp hạ tầng cần được xác minh và bổ sung trước khi công bố chính sách đầy đủ.</p></div></div></section>`;}

function setMenuState(open){
 const btn=document.getElementById('nav-toggle'),menu=document.getElementById('mobile-menu');
 if(!btn||!menu)return;
 btn.classList.toggle('is-active',open);btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Đóng menu':'Mở menu');
 menu.inert=!open;menu.classList.toggle('is-open',open);menu.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('menu-open',open);
 if(open){menu.querySelector('a')?.focus({preventScroll:true});}else{btn.focus({preventScroll:true});}
}
function trapMenuFocus(e){
 const menu=document.getElementById('mobile-menu');
 if(!menu||menu.getAttribute('aria-hidden')!=='false'||e.key!=='Tab')return;
 const items=[document.getElementById('nav-toggle'),...menu.querySelectorAll('a[href],button:not([disabled])')].filter(el=>el&&el.getClientRects().length);
 if(!items.length)return;
 const first=items[0],last=items[items.length-1];
 if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
 else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
}
function init(){const path=location.pathname.replace(/\/$/,'')||'/';const brand=brands.find(b=>'/'+b.slug===path||'/he-sinh-thai/dcg-'+b.slug===path);
 const solution=solutions.find(x=>'/giai-phap/'+x.slug===path);
 const project=solutions.filter(x=>['dcg-growmatch','mat-than-ai'].includes(x.slug)).find(x=>'/du-an/'+x.slug===path);
 const content=path==='/'?home():['/ve-dcg','/gioi-thieu'].includes(path)?about():path==='/he-sinh-thai'?ecosystem():path==='/giai-phap'?solutionsPage():solution?solutionDetail(solution):path==='/du-an'?projectsPage():project?projectDetail(project):path==='/mat-than-ai'?eye():path==='/lien-he'?contact():path==='/thong-tin-du-lieu'?dataInfo():brand?brandPage(brand):`<section class="error-404"><div class="container"><h1>Không tìm thấy trang</h1><p>Đường dẫn này không tồn tại hoặc nội dung chưa được xuất bản.</p>${cta('QUAY VỀ TRANG CHỦ','/')}</div></section>`;
document.getElementById('app').innerHTML=shell(content,path);document.title=(brand?.name||solution?.name||project?.name||(path==='/ve-dcg'||path==='/gioi-thieu'?'Giới thiệu':path==='/he-sinh-thai'?'Hệ sinh thái':path==='/giai-phap'?'Giải pháp':path==='/du-an'?'Dự án':path==='/mat-than-ai'?'Mắt Thần AI':path==='/lien-he'?'Liên hệ':path==='/thong-tin-du-lieu'?'Thông tin dữ liệu':'DCG GROUP'))+' | DCG GROUP';
 const meta=document.querySelector('meta[name="description"]');if(meta)meta.content=(brand?.summary||solution?.summary||project?.summary||'DCG GROUP — hệ sinh thái công nghệ, sáng tạo, phát triển nhân lực và ứng dụng AI.');
 const canonical=document.querySelector('link[rel="canonical"]');if(canonical)canonical.href='https://dcg-group.vercel.app'+(path==='/ve-dcg'?'/gioi-thieu':path);
 if(path==='/he-sinh-thai')initBrandSearch();const nav=document.getElementById('nav-toggle');nav.addEventListener('click',()=>setMenuState(nav.getAttribute('aria-expanded')!=='true'));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.getAttribute('aria-expanded')==='true')setMenuState(false);trapMenuFocus(e)});document.querySelectorAll('#mobile-menu a').forEach(a=>a.addEventListener('click',()=>setMenuState(false)));const form=document.getElementById('contact-form');if(form)form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form),msg=`ĐỀ NGHỊ HỢP TÁC — DCG GROUP\n\nHọ tên: ${data.get('name')}\nEmail: ${data.get('email')}\nLĩnh vực: ${data.get('topic')}\n\nNội dung:\n${data.get('note')}`;const status=document.getElementById('form-status');try{await navigator.clipboard.writeText(msg);status.textContent='Đã sao chép lời nhắn. Bạn có thể dán vào kênh liên hệ chính thức khi được công bố.';}catch{const t=document.createElement('textarea');t.rows=9;t.readOnly=true;t.value=msg;status.replaceChildren(t);t.select();}})}
function scrollToPageAnchor(){
  const raw=window.location.hash;
  if(!raw||raw.length>130)return;
  let id;
  try{id=decodeURIComponent(raw.slice(1))}catch{return}
  const target=document.getElementById(id);
  if(!target)return;
  const header=document.querySelector('.site-header');
  const offset=(header?.getBoundingClientRect().height||0)+18;
  const scroll=()=>{
    const rect=target.getBoundingClientRect();
    window.scrollTo({top:Math.max(0,window.scrollY+rect.top-offset),behavior:'instant'});
  };
  requestAnimationFrame(()=>requestAnimationFrame(scroll));
  if(document.fonts?.ready)document.fonts.ready.then(()=>requestAnimationFrame(scroll)).catch(()=>{});
}
window.addEventListener('hashchange',scrollToPageAnchor);

init();
scrollToPageAnchor();