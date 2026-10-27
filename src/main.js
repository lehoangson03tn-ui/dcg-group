import './site.css';
import './ggg.css';
import './design-system.css';
import { lumiqcPage } from './lumiqc-page.js';

const A = '/assets/';
const group = {name:'DCG GROUP', emblem:'dcg-group-emblem-safe.webp', image:'editorial/hcm-city-1600.webp'};
const brands = [
  {slug:'talent',name:'DCG TALENT',field:'CÔNG NGHỆ NHÂN LỰC',hero:'Kết nối cơ hội nghề nghiệp và phát triển kỹ năng',heading:'Nhân lực và cơ hội nghề nghiệp',summary:'Tập trung vào kết nối ứng viên với cơ hội việc làm phù hợp, đồng thời định hướng phát triển kỹ năng theo nhu cầu tuyển dụng.',description:'DCG TALENT hướng đến hành trình nghề nghiệp xuyên suốt: từ khám phá công việc, hiểu điểm mạnh đến thực hành những năng lực cần thiết. DCG GROWMATCH là sản phẩm công nghệ nhân lực của nhánh này.',image:'editorial/dcg-talent-vietnam-career-fair.webp',emblem:'dcg-talent-emblem-safe.webp',focus:[['Khám phá cơ hội','Đối sánh kỹ năng ứng viên với yêu cầu công việc qua những tiêu chí có thể giải thích.'],['Hiểu rõ năng lực','Phản hồi dựa trên bài đánh giá, tình huống và minh chứng thay vì suy đoán.'],['Phát triển tiếp','Luyện tập kỹ năng nghề nghiệp và theo dõi tiến bộ qua từng lần thực hành.']],action:{label:'TRẢI NGHIỆM DCG GROWMATCH',href:'https://dcg-growmatch.vercel.app',external:true}},
  {slug:'studio',name:'DCG STUDIO',field:'SÁNG TẠO & SẢN XUẤT NỘI DUNG',hero:'Từ ý tưởng đến hình ảnh và video',heading:'Ý tưởng và sản xuất hình ảnh',summary:'Phát triển nội dung hình ảnh và video, kết hợp tư duy sáng tạo với công cụ AI và CGI để thể hiện câu chuyện của thương hiệu.',description:'DCG STUDIO theo đuổi việc kết hợp tư duy thương hiệu, kịch bản và công nghệ mới để phát triển hình ảnh chuyển động, phim quảng cáo và sản phẩm truyền thông có cá tính riêng.',image:'editorial/dcg-studio-vietnam-students.webp',emblem:'dcg-studio-emblem-clean.webp',focus:[['Sản xuất hình ảnh','Phát triển ý tưởng, video, CGI và hình ảnh với sự hỗ trợ của AI.'],['Sáng tạo thương mại','Biến thông điệp thương hiệu thành nội dung rõ ràng, nhất quán và giàu cảm xúc.'],['Chất lượng sáng tạo','Tôn trọng nguồn tư liệu, bản quyền và sự trung thực trong nội dung sản xuất.']],action:{label:'TRAO ĐỔI VỀ SÁNG TẠO',href:'/lien-he'}},
  {slug:'vision',name:'DCG VISION',field:'THỊ GIÁC MÁY TÍNH',hero:'Quan sát và kiểm tra chất lượng bằng hình ảnh',heading:'Thị giác máy tính cho vận hành',summary:'Nghiên cứu ứng dụng thị giác máy tính vào quan sát và kiểm soát chất lượng, với định hướng phục vụ ngành thực phẩm và đồ uống.',description:'DCG VISION tập trung nghiên cứu ứng dụng phân tích hình ảnh vào các quy trình cần quan sát. Dự án LUMIQC hướng tới hỗ trợ nhân sự QA/QC ngành thực phẩm và đồ uống phát hiện những dấu hiệu cần kiểm tra.',image:'editorial/dcg-vision-vietnam-hospitality-training.webp',emblem:'dcg-vision-emblem-safe.webp',focus:[['Thị giác máy tính','Nghiên cứu nhận diện và phân tích hình ảnh dựa trên tiêu chí đo lường rõ ràng.'],['LUMIQC','Thiết kế hệ thống QR, kiểm soát SOP/thời gian bảo quản và hồ sơ ngoại lệ cho QA/QC F&B; AI Camera QC là hướng R&D.'],['Con người xác minh','Cảnh báo từ AI không phải kết luận vi phạm; con người có trách nhiệm đánh giá lại.']],action:{label:'TÌM HIỂU LUMIQC',href:'/du-an/lumiqc'}},
  {slug:'entertainment',name:'DCG ENTERTAINMENT',field:'GIẢI TRÍ SỐ',hero:'Khám phá nội dung và trải nghiệm giải trí',heading:'Sáng tạo nội dung giải trí',summary:'Định hướng phát triển phim, âm nhạc và nhân vật nguyên bản, với sự hỗ trợ của công nghệ AI trong quá trình sản xuất.',description:'DCG ENTERTAINMENT khám phá những hình thức giải trí mới từ phim, âm nhạc đến các nhân vật và thế giới hư cấu ứng dụng AI; kết nối công nghệ hiện đại với cảm hứng văn hóa Việt Nam.',image:'editorial/dcg-entertainment-nttu-studio.webp',emblem:'dcg-entertainment-emblem-transparent-preserved.png',focus:[['Phim & nội dung AI','Phát triển ý tưởng phim ngắn, hoạt hình và những câu chuyện nguyên bản.'],['Âm nhạc & hình ảnh','Khám phá MV, nhạc và trải nghiệm nghe nhìn ứng dụng công nghệ mới.'],['Nhân vật & thế giới','Xây dựng nhân vật có bản sắc, câu chuyện và hệ hình ảnh nhất quán.']],action:{label:'KẾT NỐI VỚI DCG ENTERTAINMENT',href:'/lien-he'}}
];

/* Editorial photos use verifiable authorship; they are not employees or premises of DCG. */
const visualSources=Object.freeze({
 group:{alt:'Đô thị và cầu tại Thành phố Hồ Chí Minh, ảnh chụp minh họa',author:'Kate Le',url:'https://unsplash.com/photos/city-skyline-view-with-river-and-bridge-TJvH2nqycvE',label:'Ảnh minh họa đô thị TP.HCM',width:1600,height:2262,kind:'illustration'},
 talent:{alt:'Ngày hội tư vấn nghề nghiệp tại Việt Nam, ảnh tư liệu minh họa, không phải hoạt động của DCG TALENT',author:'Ảnh do dự án cung cấp',url:'',label:'Ảnh tư liệu ngày hội nghề nghiệp Việt Nam',width:1578,height:934,kind:'illustration'},
 studio:{alt:'Nhóm sinh viên Việt Nam thực hành quay phim, ảnh tư liệu minh họa, không phải đội ngũ DCG STUDIO',author:'Ảnh do dự án cung cấp',url:'',label:'Ảnh tư liệu sinh viên thực hành quay phim',width:1248,height:825,kind:'illustration'},
 vision:{alt:'Minh họa bằng AI buổi thực hành phục vụ bàn tại Việt Nam, không phải hoạt động của DCG VISION hoặc thử nghiệm LUMIQC',author:'Hình minh họa AI biên tập từ ảnh người dùng cung cấp',url:'',label:'Minh họa đào tạo dịch vụ nhà hàng tại Việt Nam',width:1448,height:1086,kind:'illustration'},
 entertainment:{alt:'Trường quay Đại học Nguyễn Tất Thành, ảnh tư liệu minh họa, không phải cơ sở của DCG ENTERTAINMENT',author:'Ảnh do dự án cung cấp',url:'',label:'Ảnh tư liệu trường quay NTTU',width:1600,height:1002,kind:'illustration'}
});
const photoMeta=(key)=>visualSources[key]||visualSources.group;
function editorialImage(filename,key,priority=false){
 const meta=photoMeta(key);
 const srcset=filename.endsWith('-1600.webp')
   ? ' srcset="'+A+filename.replace('-1600.webp','-960.webp')+' 960w, '+A+filename+' 1600w" sizes="(max-width:1099px) 100vw, (max-width:1500px) 52vw, 800px"'
   : '';
 const load=priority?'fetchpriority="high" loading="eager"':'loading="lazy"';
 return '<img class="editorial-photo editorial-photo--'+key+'" src="'+A+filename+'"'+srcset+' alt="'+esc(meta.alt)+'" width="'+meta.width+'" height="'+meta.height+'" '+load+' decoding="async">';
}
const menus = [['/','Trang chủ'],['/gioi-thieu','Giới thiệu'],['/he-sinh-thai','Hệ sinh thái'],...brands.map(b=>['/he-sinh-thai/dcg-'+b.slug,b.name]),['/giai-phap','Giải pháp'],['/du-an','Dự án'],['/lien-he','Liên hệ']];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const logo=(name,css='logo-icon')=>`<img class="${css}" src="${A+name}" alt="" width="200" height="200" decoding="async">`;
const brandMark=(b,size='row')=>`<span class="brand-mark brand-mark--${size}" aria-hidden="true">${logo(b.emblem,'brand-mark__image')}</span>`;
const cta=(text,href,css='link-arrow',external=false)=>`<a class="${css}" href="${href}"${external?' target="_blank" rel="noopener noreferrer"':''}><span>${text}</span><span aria-hidden="true">↗</span></a>`;
function shell(content,route){return `<a class="skip-link" href="#content">Bỏ qua điều hướng</a>
<header class="site-header" id="site-header"><div class="site-header-inner">
<a href="/" class="logo-lockup" aria-label="DCG GROUP - Trang chủ">${logo(group.emblem)}<span><strong>DCG GROUP</strong><small>CÔNG NGHỆ & SÁNG TẠO</small></span></a>
<nav class="nav-primary" aria-label="Điều hướng chính"><a href="/gioi-thieu"${['/gioi-thieu','/ve-dcg'].includes(route)?' aria-current="page"':''}>Giới thiệu</a><a href="/he-sinh-thai"${route.startsWith('/he-sinh-thai')?' aria-current="page"':''}>Hệ sinh thái</a><a href="/giai-phap"${route.startsWith('/giai-phap')?' aria-current="page"':''}>Giải pháp</a><a href="/du-an"${route.startsWith('/du-an')?' aria-current="page"':''}>Dự án</a><a href="/lien-he"${route==='/lien-he'?' aria-current="page"':''}>Liên hệ</a></nav>
<button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Mở menu"><span></span><span></span><span></span></button></div></header>
<div class="mobile-menu" id="mobile-menu" aria-hidden="true" inert><div class="mobile-menu-inner"><p class="eyebrow">KHÁM PHÁ DCG GROUP</p><nav aria-label="Menu toàn bộ">${menus.map(([url,label],i)=>`<a href="${url}"${route===url?' aria-current="page"':''}><span>${String(i+1).padStart(2,'0')}</span><strong>${label}</strong><span aria-hidden="true">↗</span></a>`).join('')}</nav><p class="menu-note">HỆ SINH THÁI DCG GROUP</p></div></div>
<main id="content">${content}</main>
<footer class="site-footer"><div class="container"><div class="footer-columns"><div class="footer-brand"><a href="/" class="footer-logo">${logo(group.emblem)}<strong>DCG GROUP</strong></a><p>Kết nối con người, công nghệ và sức sáng tạo qua những giải pháp hướng đến giá trị thực.</p></div><div><p class="footer-title">TÌM HIỂU</p><a href="/gioi-thieu">Giới thiệu</a><a href="/he-sinh-thai">Hệ sinh thái</a><a href="/giai-phap">Giải pháp</a><a href="/du-an">Dự án</a><a href="/lien-he">Liên hệ</a></div><div><p class="footer-title">THƯƠNG HIỆU</p>${brands.map(b=>`<a href="/he-sinh-thai/dcg-${b.slug}">${b.name}</a>`).join('')}</div></div><div class="footer-bottom"><span>© 2026 DCG GROUP. Thông tin giới thiệu các định hướng phát triển.</span><span><a href="/thong-tin-du-lieu">Thông tin xử lý dữ liệu</a> · Giới thiệu hệ sinh thái DCG GROUP.</span></div></div></footer>`}
const sectionTop=(n,caption)=>`<div class="section-serial"><span>${n} <i>/</i> ${caption}</span><span>DCG GROUP</span></div>`;
const eyebrow=text=>`<p class="eyebrow">${text}</p>`;

/* Shared, reviewed founder identity; quoted text is editorial-only until approved. */
/* One confirmed message and identity, shared by home and About. */
const founder = Object.freeze({
  name: 'Trương Quốc Huy',
  role: 'Nhà sáng lập & Tổng giám đốc DCG GROUP',
  image: 'dcg-founder-portrait.png',
  message: 'Tôi tin vào sức sáng tạo của người Việt. Chúng tôi xây dựng DCG để kết nối con người và công nghệ, biến những ý tưởng tốt thành sản phẩm có ích cho cuộc sống.'
});
function founderSection(context='home'){
 const onAbout=context==='about';
 return `<section class="founder-section page-section" id="nha-sang-lap" aria-labelledby="founder-heading">
  <div class="container founder-layout">
   <figure class="founder-portrait"><img src="${A+founder.image}" alt="Chân dung ${esc(founder.name)}, Nhà sáng lập DCG GROUP" width="640" height="910" loading="lazy" decoding="async"></figure>
   <div class="founder-copy">
    <h2 id="founder-heading">Thông điệp từ nhà sáng lập</h2>
    <blockquote class="founder-message">“${esc(founder.message)}”</blockquote>
    <div class="founder-signature"><strong>${esc(founder.name)}</strong><span>${esc(founder.role)}</span></div>
    ${onAbout?'':cta('Tìm hiểu về DCG','/gioi-thieu#nha-sang-lap','button-secondary')}
   </div>
  </div>
 </section>`;
}
function home(){return `
<section class="home-hero">
 <div class="home-hero-copy"><div class="home-hero-copy-inner">
  ${eyebrow('DCG GROUP')}
  <h1>Kết nối con người <span>Công nghệ và sáng tạo</span></h1>
  <p>DCG phát triển hệ sinh thái trong các lĩnh vực nhân lực, sản xuất nội dung, thị giác máy tính và giải trí. Mỗi hướng đi bắt đầu từ một nhu cầu cụ thể của con người và doanh nghiệp.</p>
  <div class="hero-actions">${cta('Khám phá hệ sinh thái','/he-sinh-thai','button-dark')}${cta('Tìm hiểu về DCG','/gioi-thieu','button-secondary')}</div>
 </div></div>
 <div class="home-hero-media">${editorialImage(group.image,'group',true)}</div>
</section>
<section class="about-home page-section"><div class="container">${sectionTop('01','GIỚI THIỆU')}
 <div class="about-home-grid"><div>${eyebrow('VỀ DCG GROUP')}<h2>Bốn lĩnh vực <span>Một định hướng chung</span></h2></div>
 <div><p class="lead">Mỗi lĩnh vực có cách tiếp cận riêng, cùng bắt đầu từ những nhu cầu thực tế.</p>
 <p>DCG GROUP kết nối bốn thương hiệu: DCG TALENT, DCG STUDIO, DCG VISION và DCG ENTERTAINMENT. Mỗi thương hiệu theo đuổi một lĩnh vực riêng, cùng hướng đến việc đưa công nghệ và sáng tạo vào những nhu cầu thực tế.</p>
 <p>Định hướng của DCG là bắt đầu từ vấn đề cần giải quyết, lựa chọn cách làm phù hợp và từng bước hoàn thiện sản phẩm qua thử nghiệm.</p>
 ${cta('Tìm hiểu về DCG','/gioi-thieu')}</div></div>
</div></section>
${founderSection()}
<section class="brands-home page-section"><div class="container">${sectionTop('02','HỆ SINH THÁI')}
 <div class="section-intro"><div>${eyebrow('BỐN THƯƠNG HIỆU')}<h2>Hệ sinh thái DCG</h2></div><p>Khám phá định hướng phát triển và các sản phẩm của từng thương hiệu.</p></div>
</div>${brandRows()}</section>
<section class="philosophy page-section"><div class="container">${sectionTop('03','CÁCH TIẾP CẬN')}
 <div class="philosophy-heading">${eyebrow('NGUYÊN TẮC ĐỊNH HƯỚNG')}<h2>Cách DCG tiếp cận mỗi ý tưởng</h2></div>
 <div class="philosophy-grid">
 <article><span>01</span><h3>Hiểu đúng nhu cầu</h3><p>Làm rõ người sử dụng, khó khăn họ gặp phải và kết quả họ cần trước khi lựa chọn giải pháp.</p></article>
 <article><span>02</span><h3>Chọn công nghệ phù hợp</h3><p>Đánh giá công nghệ theo khả năng giải quyết vấn đề, tính khả thi và điều kiện sử dụng thực tế.</p></article>
 <article><span>03</span><h3>Hoàn thiện qua phản hồi</h3><p>Dùng phản hồi để nhận ra điểm chưa phù hợp và xác định điều cần cải thiện tiếp theo.</p></article>
 </div></div></section>
<section class="projects-home page-section">
 <div class="container">${sectionTop('04','SẢN PHẨM VÀ DỰ ÁN')}
 <div class="section-intro"><div>${eyebrow('HƯỚNG PHÁT TRIỂN')}<h2>Từ định hướng đến sản phẩm</h2></div><p>Tìm hiểu các sản phẩm và hướng nghiên cứu trong hệ sinh thái DCG.</p></div>
 </div>
 <div class="growmatch-project-group">
   <div class="container growmatch-project-container">
     <div class="project-list growmatch-project-intro"><a href="/du-an/dcg-growmatch" class="project-line project-line--showcase"><span>01</span><div><small>DCG TALENT · SẢN PHẨM CÓ WEBSITE RIÊNG</small><h3>DCG GROWMATCH</h3><p>Nền tảng hướng đến việc kết nối ứng viên và nhà tuyển dụng dựa trên thông tin nghề nghiệp, năng lực và nhu cầu tuyển dụng.</p></div><figure class="project-line-media project-line-media--website"><img src="/assets/projects/dcg-growmatch-real-website.webp" alt="Ảnh chụp giao diện trang chủ DCG GROWMATCH thực tế ngày 18 tháng 10 năm 2026, do người sáng lập cung cấp" width="1600" height="697" loading="lazy" decoding="async"></figure><b aria-hidden="true">↗</b></a></div>
   </div>
 </div>
 <div class="container growmatch-following-container">
   <div class="project-list growmatch-following-project"><a href="/du-an/lumiqc" class="project-line project-line--showcase"><span>02</span><div><small>DCG VISION · ĐỘI ĐÀN CÁ GỖ · VECOM 2026</small><h3>LUMIQC</h3><p>Giải pháp số hóa QA/QC F&B: truy vết QR, kiểm soát thời gian bảo quản, nhật ký ngoại lệ và phối hợp QC trung tâm.</p></div><figure class="project-line-media project-line-media--lumiqc"><img src="/assets/projects/lumiqc-approved-lotus-logo.webp" alt="Logo minh họa tạm LUMIQC đã được phê duyệt: hoa sen Việt Nam và biểu tượng thị giác máy tính, sắc xanh và vàng" width="900" height="900" loading="lazy" decoding="async"></figure><b aria-hidden="true">↗</b></a></div>
 </div>
 </section>${endBanner()}`;
}

const growmatchAwardAssets=Object.freeze({
  main:'/assets/recognition/NTTU_0058.jpeg',
  secondary:'/assets/recognition/FBA1C8B9-ED38-42D6-8EF9-50CBECBFA44D.jpeg',
  nttu:'https://ntt.edu.vn/nttu-tim-kiem-nha-quan-tri-tuong-lai-qua-cuoc-thi-ceo-thoi-dai-so/'
});
function growmatchAwardFigure(kind){
 const main=kind==='main';
 const src=main?growmatchAwardAssets.main:growmatchAwardAssets.secondary;
 const event=main?'Cùng đội thi DCG GROWMATCH tại lễ trao giải':'Cùng đội thi DCG GROWMATCH tham dự CEO thời đại số';
 return `<figure class="growmatch-award-figure">
  <button type="button" class="recognition-photo-trigger" data-photo="${kind}" aria-label="Mở lớn ảnh tư liệu: ${event}" aria-haspopup="dialog">
   <img src="${src}" width="1536" height="1024" alt="${main?'Ảnh đội ĐÀN CÁ GỖ trên sân khấu lễ trao giải CEO thời đại số':'Ảnh Trương Quốc Huy và thành viên tham dự cuộc thi CEO thời đại số tại bàn'}" loading="lazy" decoding="async">
  </button>
  <figcaption>
   <span class="award-caption-person"><span class="award-caption-name">Trương Quốc Huy</span><span class="award-caption-dash" aria-hidden="true"> — </span><span class="award-caption-role">Nhà sáng lập &amp; CEO DCG GROUP</span></span>
   <span class="award-caption-event">${event}</span>
  </figcaption>
 </figure>`;
}
function growmatchRecognitionArticle(){return `
<section id="thanh-tich" class="recognition-section growmatch-award-section page-section" aria-labelledby="growmatch-award-section-title">
 <div class="container growmatch-award-shell">
  <header class="growmatch-award-header">
   <h2 id="growmatch-award-section-title" class="growmatch-award-section-title">Thành tích và ghi nhận</h2>
   <p class="growmatch-award-brand">DCG GROWMATCH · 2026</p>
   <h3 class="growmatch-award-title">DCG GROWMATCH ghi dấu ấn tại CEO thời đại số</h3>
   <p class="growmatch-award-result">Top 5 vòng chung kết</p>
  </header>
  <div class="growmatch-award-prose growmatch-award-intro">
   <p>Đội thi của DCG GROWMATCH, tham dự dưới tên ĐÀN CÁ GỖ, đã vào Top 5 vòng chung kết và nhận giải tại cuộc thi “Nhà quản trị tương lai lần 6: CEO thời đại số”. Kết quả ghi nhận nỗ lực của tập thể trong việc đưa ý tưởng ứng dụng AI vào bài toán đánh giá năng lực và kết nối cơ hội nghề nghiệp.</p>
  </div>
  ${growmatchAwardFigure('main')}
  <div class="growmatch-award-prose">
   <p>Cuộc thi do Khoa Quản trị Kinh doanh, Trường Đại học Nguyễn Tất Thành tổ chức, yêu cầu các đội trình bày dự án và bảo vệ phương án trước hội đồng giám khảo gồm các chuyên gia, đại diện doanh nghiệp. Đây là dịp để đội thi kiểm nghiệm cách tiếp cận của mình qua những câu hỏi về quản trị và khả năng triển khai.</p>
   <h4>Đưa bài toán nghề nghiệp đến sân chơi quản trị</h4>
   <p>DCG GROWMATCH tham dự với đề tài “Ứng dụng trí tuệ nhân tạo trong đánh giá năng lực và kết nối sinh viên với cơ hội việc làm phù hợp”. Trọng tâm của đề tài là hỗ trợ sinh viên hiểu rõ năng lực, từ đó có thêm cơ sở để lựa chọn cơ hội nghề nghiệp phù hợp.</p>
   <p>Tại vòng chung kết, đội trình bày dự án và trực tiếp trả lời các câu hỏi phản biện của hội đồng giám khảo. Quá trình này đòi hỏi các thành viên kết nối ý tưởng công nghệ với tư duy quản trị, giải thích phương án và bảo vệ những lựa chọn của đội.</p>
  </div>
  ${growmatchAwardFigure('secondary')}
  <div class="growmatch-award-prose growmatch-award-conclusion">
   <h4>Sự ghi nhận dành cho nỗ lực tập thể</h4>
   <p>Thành tích tại CEO thời đại số là niềm tự hào chung của đội ngũ DCG GROWMATCH. Phía sau kết quả là công sức xây dựng đề tài, chuẩn bị nội dung và cùng nhau bảo vệ dự án. Với tập thể, dấu mốc này tiếp thêm động lực để hoàn thiện giải pháp, hướng đến việc giúp người trẻ hiểu năng lực của mình và chủ động hơn trên hành trình nghề nghiệp.</p>
   <a class="recognition-source" href="${growmatchAwardAssets.nttu}" target="_blank" rel="noopener noreferrer"><span>Xem bài viết trên NTTU</span><span aria-hidden="true">↗</span></a>
  </div>
 </div>
</section>
${growmatchLightbox()}`;
}
function growmatchLightbox(){return `<dialog id="recognition-lightbox" class="recognition-lightbox" aria-label="Xem ảnh tư liệu DCG GROWMATCH tại CEO thời đại số">
 <div class="recognition-lightbox-content">
  <button type="button" class="recognition-lightbox-close" aria-label="Đóng ảnh phóng lớn">Đóng <span aria-hidden="true">×</span></button>
  <img src="" alt="" width="1536" height="1024" decoding="async">
  <p id="recognition-lightbox-caption"></p>
 </div>
</dialog>`;}
function initRecognitionLightbox(){
 const dialog=document.getElementById('recognition-lightbox');
 if(!dialog||typeof dialog.showModal!=='function')return;
 const image=dialog.querySelector('img');
 const caption=dialog.querySelector('#recognition-lightbox-caption');
 const close=dialog.querySelector('.recognition-lightbox-close');
 const photos={
  main:{src:growmatchAwardAssets.main,caption:'Trương Quốc Huy — Nhà sáng lập & CEO DCG GROUP. Cùng đội thi DCG GROWMATCH tại lễ trao giải',alt:'Đội thi ĐÀN CÁ GỖ trên sân khấu trao giải'},
  secondary:{src:growmatchAwardAssets.secondary,caption:'Trương Quốc Huy — Nhà sáng lập & CEO DCG GROUP. Cùng đội thi DCG GROWMATCH tham dự CEO thời đại số',alt:'Ảnh tư liệu Trương Quốc Huy và thành viên tham dự tại bàn'}
 };
 let opener=null;
 document.querySelectorAll('.growmatch-award-figure .recognition-photo-trigger').forEach(button=>{
  button.addEventListener('click',()=>{
   const selected=photos[button.dataset.photo];if(!selected)return;
   opener=button;image.src=selected.src;image.alt=selected.alt;caption.textContent=selected.caption;
   dialog.showModal();close.focus();
  });
 });
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 dialog.addEventListener('close',()=>{opener?.focus({preventScroll:true})});
}
function brandRows(){return `<div class="brand-rows">${brands.map((b,i)=>`<article class="brand-row${i%2?' reverse':''}">
 <div class="brand-row-copy"><div class="brand-row-copy-inner">
  <div class="brand-row-identity">
   <p class="micro-index">${String(i+1).padStart(2,'0')} <span>/</span> 04 · ${b.field}</p>
   <div class="brand-inline">${brandMark(b,'row')}<strong>${b.name}</strong></div>
   <h3>${b.heading}</h3>
  </div>
  <div class="brand-row-narrative">
   <p>${b.summary}</p>
   ${cta('Khám phá thương hiệu','/he-sinh-thai/dcg-'+b.slug)}
  </div>
 </div></div>
 <figure class="brand-row-image">
  <div class="brand-row-photo-frame">${editorialImage(b.image,b.slug)}</div>
 </figure>
</article>`).join('')}</div>`}
function endBanner(){return `<section class="end-banner"><div class="container"><div>${eyebrow('KẾT NỐI VỚI DCG GROUP')}<h2>Cùng trao đổi về điều bạn đang cần</h2><p>Chia sẻ bài toán, ý tưởng hoặc nhu cầu hợp tác của bạn để bắt đầu cuộc trao đổi với DCG.</p></div>${cta('Liên hệ DCG','/lien-he','button-outline')}</div></section>`}
function innerHero(kicker,title,description,image=''){return `<section class="inner-hero${image?' with-image':''}"><div class="inner-hero-text"><div class="inner-hero-text-inner">${eyebrow(kicker)}<h1>${title}</h1><p>${description}</p></div></div>${image?`<figure class="inner-hero-media">${editorialImage(image,image===group.image?'group':'vision',true)}</figure>`:''}</section>`}

function about(){return `
${innerHero('GIỚI THIỆU · DCG GROUP','Công nghệ và sáng tạo bắt đầu từ nhu cầu con người','DCG GROUP kết nối bốn thương hiệu với các định hướng phát triển khác nhau, cùng theo đuổi những ứng dụng thực tế.',group.image)}
<section class="page-section about-long"><div class="container">${sectionTop('01','CÂU CHUYỆN DCG GROUP')}
 <div class="editorial-content"><div>${eyebrow('TỔNG QUAN')}<h2>Bốn lĩnh vực <span>Một định hướng chung</span></h2></div>
 <div><p class="lead">DCG GROUP là website giới thiệu hệ sinh thái công nghệ và sáng tạo.</p>
 <p>DCG TALENT tập trung vào nhân lực và nghề nghiệp. DCG STUDIO hướng đến sản xuất hình ảnh, video. DCG VISION nghiên cứu ứng dụng thị giác máy tính, còn DCG ENTERTAINMENT khám phá các hình thức giải trí số.</p>
 <p>Mỗi hướng phát triển có phạm vi khác nhau. DCG giới thiệu rõ sản phẩm đã có, dự án đang nghiên cứu và các định hướng chưa triển khai thương mại.</p></div></div>
 </div></section>
<section class="philosophy page-section"><div class="container">${sectionTop('02','ĐỊNH HƯỚNG PHÁT TRIỂN')}
 <div class="philosophy-heading">${eyebrow('CÁCH CHÚNG TÔI TIẾP CẬN')}<h2>Bắt đầu từ vấn đề cần giải quyết</h2></div>
 <div class="philosophy-grid"><article><span>01</span><h3>Con người</h3><p>Làm rõ nhu cầu và bối cảnh sử dụng trước khi chọn giải pháp.</p></article><article><span>02</span><h3>Công nghệ</h3><p>Ưu tiên phương pháp phù hợp với phạm vi, nguồn lực và khả năng kiểm chứng.</p></article><article><span>03</span><h3>Trách nhiệm</h3><p>Phân biệt ý tưởng với kết quả đã có; tôn trọng dữ liệu và vai trò quyết định của con người.</p></article></div>
 </div></section>
${founderSection('about')}
${endBanner()}`}
function ecosystem(){return `
<section class="directory-intro"><div class="container">
${breadcrumb([{name:"Trang chủ",href:"/"},{name:"Hệ sinh thái"}])}
<p class="eyebrow">DCG GROUP / BỐN THƯƠNG HIỆU</p>
<h1>Hệ sinh thái DCG</h1>
<p class="directory-subtitle">Khám phá định hướng phát triển và các sản phẩm của từng thương hiệu.</p>
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
function brandTile(b){return `<a class="directory-tile directory-tile--${b.slug}" href="/he-sinh-thai/dcg-${b.slug}" aria-label="Khám phá ${b.name}">
   <div class="tile-banner"><img src="${A+b.image}" alt="" loading="lazy" decoding="async"><span class="tile-banner-label">DCG GROUP · ${esc(b.field)}</span></div>
   <div class="tile-meta"><div class="tile-identity">${brandMark(b,'tile')}<div class="tile-identity-copy"><h2>${b.name}</h2><p>${b.field}</p></div></div></div>
   <p class="tile-summary">${b.summary}</p>
   <span class="tile-more">Khám phá ${b.name} <span aria-hidden="true">→</span></span>
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
function brandPage(b){return `
<section class="detail-intro"><div class="container">
${breadcrumb([{name:"Trang chủ",href:"/"},{name:"Hệ sinh thái",href:"/he-sinh-thai"},{name:b.name}])}
<div class="detail-head"><div class="detail-head-text"><p class="eyebrow">${b.field}</p><div class="detail-brand">${brandMark(b,'detail')}<span>${b.name}</span></div><h1>${b.heading}</h1><p>${b.summary}</p><div class="detail-status"><span>Hướng phát triển của DCG GROUP</span></div><div class="detail-brand-action">${cta(b.action.label,b.action.href,"button-secondary",!!b.action.external)}</div></div><figure class="editorial-detail-figure"><div class="detail-image">${editorialImage(b.image,b.slug,true)}</div></figure></div>
</div></section>
<section class="page-section detail-main"><div class="container">${sectionTop("01","TỔNG QUAN & ĐỐI TƯỢNG PHỤC VỤ")}
<div class="detail-main-grid"><div><p class="eyebrow">VỀ ${b.name}</p><h2>${b.hero}</h2></div><div><p class="lead">${b.description}</p><p>Đây là định hướng thuộc hệ sinh thái DCG GROUP. Quy mô, phạm vi triển khai và dịch vụ thương mại được công bố theo từng sản phẩm có bằng chứng thực tế.</p></div></div>
${b.slug==='studio'?`<figure class="studio-support-photo"><img src="${A}editorial/dcg-studio-vtv9-camera.webp" width="500" height="324" alt="Người tham gia trải nghiệm máy quay VTV9, ảnh tư liệu bổ trợ, không phải hoạt động sản xuất của DCG STUDIO" loading="lazy" decoding="async"><figcaption><strong>Tư liệu hình ảnh bổ trợ</strong><span>Trải nghiệm với máy quay VTV9 tại Việt Nam. Hình ảnh minh họa, không đại diện cho hoạt động sản xuất của DCG STUDIO.</span></figcaption></figure>`:''}
</div></section>
<section class="page-section focus-section"><div class="container">${sectionTop("02","NĂNG LỰC & HƯỚNG GIẢI PHÁP")}
<div class="focus-grid" aria-label="Năng lực và hướng giải pháp">${b.focus.map((item,i)=>`<article class="focus-card"><span>${String(i+1).padStart(2,"0")}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join("")}</div>
</div></section>
<section class="page-section detail-process"><div class="container">${sectionTop("03","CÁCH KẾT NỐI")}
<h2>Từ nhu cầu đến hướng triển khai</h2>
<div class="process-steps" aria-label="Ba bước kết nối"><article class="process-step"><b>01</b><h3>Chia sẻ nhu cầu</h3><p>Trao đổi mục tiêu, bối cảnh và vấn đề cần giải quyết.</p></article><article class="process-step"><b>02</b><h3>Xác định phạm vi</h3><p>Làm rõ yêu cầu, dữ liệu đầu vào và giới hạn của giải pháp.</p></article><article class="process-step"><b>03</b><h3>Thống nhất triển khai</h3><p>Thống nhất phạm vi, đầu ra và điều kiện trước khi triển khai.</p></article></div>
</div></section>
<section class="page-section detail-faq"><div class="container">${sectionTop("04","CÂU HỎI THƯỜNG GẶP")}
<details><summary>${b.name} đã cung cấp đầy đủ dịch vụ thương mại chưa?</summary><p>Các năng lực và dự án hiện được giới thiệu theo định hướng phát triển; từng sản phẩm chỉ được xác nhận sẵn sàng khi có thông tin triển khai thực tế.</p></details>
<details><summary>Tôi có thể trao đổi một nhu cầu cụ thể không?</summary><p>Bạn có thể chuẩn bị nội dung tại trang liên hệ. Biểu mẫu hiện hỗ trợ sao chép lời nhắn và chưa gửi tự động đến DCG.</p></details>
</div></section>
<section class="page-section related-brands"><div class="container">${sectionTop("05","KHÁM PHÁ THÊM")}
<h2>Thương hiệu liên quan</h2><div class="related-grid">${brands.filter(x=>x.slug!==b.slug).map(brandTile).join("")}</div></div></section>
${endBanner()}
`;}
function eye(){return `${innerHero('DCG VISION · DỰ ÁN NGHIÊN CỨU','LUMIQC — AI Visual Quality Control','Nghiên cứu ứng dụng camera AI nhằm hỗ trợ nhân sự quan sát chất lượng và quy trình.',brands[2].image)}<section class="page-section"><div class="container">${sectionTop('01','GIỚI THIỆU DỰ ÁN')}<div class="editorial-content"><div>${eyebrow('THỊ GIÁC MÁY TÍNH')}<h2>Hỗ trợ quan sát Không thay thế con người</h2></div><div><p class="lead">Những dấu hiệu AI phát hiện cần được xác minh trong bối cảnh thực tế.</p><p>LUMIQC là dự án nghiên cứu của DCG VISION, hướng đến hỗ trợ hoạt động QA/QC ngành thực phẩm và đồ uống. Dự án nghiên cứu khả năng dùng hình ảnh camera để nhận biết các điểm cần kiểm tra trong quá trình vận hành.</p><p>Đây là dự án đang phát triển, chưa công bố tỷ lệ chính xác hay kết quả triển khai thương mại khi chưa có kiểm định thực tế.</p>${cta('TÌM HIỂU DCG VISION','/vision')}</div></div></div></section>${endBanner()}`}
function contact(){return `${innerHero('LIÊN HỆ · DCG GROUP','Bắt đầu một cuộc trò chuyện','Mọi ý tưởng hợp tác đều bắt đầu từ việc lắng nghe và trao đổi rõ ràng.')}<section class="page-section"><div class="container">${sectionTop('01','THÔNG TIN KẾT NỐI')}<div class="contact-layout"><div><h2>Cùng trao đổi về điều bạn đang cần</h2><p>Hãy chuẩn bị lời nhắn về lĩnh vực bạn quan tâm. Hiện website chưa công bố địa chỉ tiếp nhận chính thức nên biểu mẫu chỉ giúp soạn và sao chép nội dung, không tự gửi hay lưu thông tin.</p><div class="contact-nav">${brands.map(b=>`<a href="/${b.slug}">${b.name} <span aria-hidden="true">↗</span></a>`).join('')}</div></div><form id="contact-form" class="contact-form"><p class="form-label">SOẠN LỜI NHẮN HỢP TÁC</p><label for="contact-name">Họ và tên *</label><input required minlength="2" maxlength="120" name="name" id="contact-name" autocomplete="name" placeholder="Tên người liên hệ"><label for="contact-email">Email *</label><input required type="email" maxlength="200" name="email" id="contact-email" autocomplete="email" placeholder="name@example.com"><label for="contact-topic">Lĩnh vực quan tâm</label><select name="topic" id="contact-topic"><option>DCG GROUP</option>${brands.map(b=>`<option>${b.name}</option>`).join('')}</select><label for="contact-note">Nội dung *</label><textarea required minlength="10" maxlength="4000" rows="5" name="note" id="contact-note" placeholder="Nhu cầu hoặc ý tưởng cần trao đổi"></textarea><button type="submit">SAO CHÉP LỜI NHẮN ↗</button><p class="form-status" id="form-status" role="status">Dữ liệu không được gửi lên máy chủ từ biểu mẫu này.</p></form></div></div></section>`}
const solutions=[
 {slug:"dcg-growmatch",name:"DCG GROWMATCH",branch:"DCG TALENT",state:"Sản phẩm có website riêng",summary:"Nền tảng hỗ trợ đánh giá, đối sánh và phát triển năng lực nghề nghiệp.",detail:"DCG GROWMATCH phát triển các chức năng hồ sơ ứng viên, bài đánh giá và luyện kỹ năng. Khả năng hoạt động từng tính năng phải được xác nhận trên hệ thống sản phẩm riêng.",img:brands[0].image,link:"https://dcg-growmatch.vercel.app",external:true},
 {slug:"sang-tao-video-ai",name:"Sáng tạo video AI & CGI",branch:"DCG STUDIO",state:"Định hướng phát triển",summary:"Khám phá các phương pháp ứng dụng AI trong hình ảnh chuyển động và nội dung thương mại.",detail:"Định hướng phát triển kịch bản, ý tưởng, hình ảnh và video với AI. Chưa công bố biểu giá, năng lực sản xuất hay số lần chỉnh sửa khi chưa được phê duyệt.",img:brands[1].image},
 {slug:"lumiqc",name:"LUMIQC",branch:"DCG VISION",state:"Đề án VECoM 2026 · ĐÀN CÁ GỖ",summary:"Đề án số hóa QA/QC ngành F&B bằng truy vết QR, quy tắc thời gian bảo quản và hồ sơ xử lý ngoại lệ.",detail:"Dự án đang ở giai đoạn thiết kế và nghiên cứu. Các tính năng, kết quả mô phỏng và giá trị kinh tế cần được kiểm chứng trước khi công bố là hiệu quả thương mại.",img:brands[2].image},
 {slug:"noi-dung-giai-tri-ai",name:"Nội dung giải trí AI",branch:"DCG ENTERTAINMENT",state:"Định hướng phát triển",summary:"Khám phá phim, âm nhạc và các nhân vật AI nguyên bản.",detail:"Định hướng kể chuyện và phát triển nội dung giải trí ứng dụng AI. Việc xuất bản sản phẩm cụ thể cần bảo đảm quyền sử dụng tài sản, âm nhạc và nhân vật.",img:brands[3].image}
];
function solutionVisual(item){
 if(item.slug==='dcg-growmatch')return '<img src="/assets/projects/dcg-growmatch-real-website.webp" alt="Giao diện thật trang chủ DCG GROWMATCH do người sáng lập cung cấp" width="1600" height="697" loading="lazy" decoding="async">';
 if(item.slug==='lumiqc')return '<img src="/assets/projects/lumiqc-approved-lotus-logo.webp" alt="Logo tạm LUMIQC đã duyệt: hoa sen Việt Nam kết hợp biểu tượng thị giác máy tính" width="900" height="900" loading="lazy" decoding="async">';
 return editorialImage(item.img,item.branch==='DCG STUDIO'?'studio':'entertainment');
}
function solutionCard(item,linkPrefix='/giai-phap',actionLabel='Xem phạm vi và điều kiện'){
 return `<a class="solution-card solution-card--${item.slug}" href="${linkPrefix}/${item.slug}">
 <figure class="solution-card-visual">${solutionVisual(item)}</figure>
 <div class="solution-card-body">
 <p class="solution-state">${esc(item.state)} · ${esc(item.branch)}</p>
 <h2>${esc(item.name)}</h2><p>${esc(item.summary)}</p>
 <span class="solution-card-action">${esc(actionLabel)} <span aria-hidden="true">↗</span></span>
 </div></a>`;
}
function solutionsPage(){return `
<section class="directory-intro solution-directory"><div class="container">${breadcrumb([{name:"Trang chủ",href:"/"},{name:"Giải pháp"}])}
<div class="solution-directory-heading"><div><p class="eyebrow">DCG GROUP / GIẢI PHÁP</p><h1>Ý tưởng và giải pháp</h1></div><p class="directory-subtitle">Tìm hiểu sản phẩm, ứng dụng công nghệ và các hướng nghiên cứu thuộc hệ sinh thái DCG. Mỗi giải pháp đều có trạng thái phát triển rõ ràng.</p></div>
<div class="solution-grid">${solutions.map(item=>solutionCard(item)).join("")}</div>
</div></section>`;}
function solutionDetail(item){return `<section class="directory-intro"><div class="container">
${breadcrumb([{name:"Trang chủ",href:"/"},{name:"Giải pháp",href:"/giai-phap"},{name:item.name}])}
<p class="eyebrow">${esc(item.branch)} / ${esc(item.state)}</p><h1>${esc(item.name)}</h1><p class="directory-subtitle">${esc(item.summary)}</p>
<div class="solution-detail"><div><figure class="editorial-project-figure editorial-project-figure--${item.slug}">${solutionVisual(item)}</figure><h2>Phạm vi và hướng phát triển</h2><p>${esc(item.detail)}</p><h2>Điều kiện và thông tin chưa công bố</h2><p>Giá bán, quy trình triển khai, yêu cầu dữ liệu và thời hạn thực hiện chỉ được xác nhận khi có thông tin chính thức. Nếu chưa có, vui lòng không coi các mô tả ở đây là cam kết cung cấp dịch vụ.</p></div>
<aside class="solution-aside"><p class="eyebrow">BƯỚC TIẾP THEO</p><h3>${esc(item.state)}</h3>${item.external?cta("MỞ WEBSITE SẢN PHẨM",item.link,"button-dark",true):cta("CHUẨN BỊ YÊU CẦU TRAO ĐỔI","/lien-he","button-dark")}
<p>Biểu mẫu tại DCG GROUP hiện chỉ giúp soạn và sao chép nội dung; chưa gửi tự động.</p></aside></div></div></section>`;}
function projectsPage(){return `<section class="directory-intro"><div class="container">${breadcrumb([{name:"Trang chủ",href:"/"},{name:"Dự án"}])}<p class="eyebrow">DCG GROUP / DỰ ÁN</p><h1>Dự án và sản phẩm</h1><p class="directory-subtitle">Các dự án được giới thiệu với trạng thái rõ ràng, không dùng số liệu thành tựu chưa có bằng chứng.</p>
<div class="solution-grid">${[solutions[0],solutions[2]].map(p=>solutionCard(p,"/du-an","Đọc giới thiệu dự án")).join("")}</div></div></section>`;}
function projectDetail(item){return `<section class="directory-intro"><div class="container">${breadcrumb([{name:"Trang chủ",href:"/"},{name:"Dự án",href:"/du-an"},{name:item.name}])}<p class="eyebrow">${esc(item.branch)} / ${esc(item.state)}</p><h1>${esc(item.name)}</h1><p class="directory-subtitle">${esc(item.summary)}</p><div class="solution-detail"><article><figure class="editorial-project-figure editorial-project-figure--${item.slug}">${solutionVisual(item)}</figure><h2>Bối cảnh và mục tiêu</h2><p>${esc(item.detail)}</p><h2>Giới hạn bằng chứng</h2><p>Trang này giới thiệu phạm vi và định hướng dự án. Chưa công bố số liệu kết quả, chứng nhận, hợp đồng hay trường hợp khách hàng thực tế khi không có nguồn kiểm chứng đi kèm.</p></article><aside class="solution-aside"><h3>Trao đổi dự án</h3>${cta("LIÊN HỆ HỢP TÁC","/lien-he","button-dark")}</aside></div></div></section>${item.slug==='dcg-growmatch'?growmatchRecognitionArticle():''}`;}
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
function init(){const requestedPath=location.pathname.replace(/\/$/,'')||'/';if(requestedPath==='/'&&location.hash==='#dau-an-va-ghi-nhan'){location.replace('/du-an/dcg-growmatch#thanh-tich');return;}const legacyRoutes={'/du-an/mat-than-ai':'/du-an/lumiqc','/giai-phap/mat-than-ai':'/giai-phap/lumiqc','/mat-than-ai':'/du-an/lumiqc'};const path=legacyRoutes[requestedPath]||requestedPath;if(path!==requestedPath)history.replaceState(history.state,'',path+location.search+location.hash);const brand=brands.find(b=>'/'+b.slug===path||'/he-sinh-thai/dcg-'+b.slug===path);
 const solution=solutions.find(x=>'/giai-phap/'+x.slug===path);
 const project=solutions.filter(x=>['dcg-growmatch','lumiqc'].includes(x.slug)).find(x=>'/du-an/'+x.slug===path);
 const content=path==='/'?home():['/ve-dcg','/gioi-thieu'].includes(path)?about():path==='/he-sinh-thai'?ecosystem():path==='/giai-phap'?solutionsPage():solution?solutionDetail(solution):path==='/du-an'?projectsPage():path==='/du-an/lumiqc'?lumiqcPage():project?projectDetail(project):path==='/lien-he'?contact():path==='/thong-tin-du-lieu'?dataInfo():brand?brandPage(brand):`<section class="error-404"><div class="container"><h1>Không tìm thấy trang</h1><p>Đường dẫn này không tồn tại hoặc nội dung chưa được xuất bản.</p>${cta('QUAY VỀ TRANG CHỦ','/')}</div></section>`;
document.getElementById('app').innerHTML=shell(content,path);if(location.hash){const anchor=document.getElementById(decodeURIComponent(location.hash.slice(1)));anchor?.scrollIntoView({block:'start',behavior:'instant'});}document.title=(brand?.name||solution?.name||project?.name||(path==='/ve-dcg'||path==='/gioi-thieu'?'Giới thiệu':path==='/he-sinh-thai'?'Hệ sinh thái':path==='/giai-phap'?'Giải pháp':path==='/du-an'?'Dự án':path==='/lien-he'?'Liên hệ':path==='/thong-tin-du-lieu'?'Thông tin dữ liệu':'DCG GROUP'))+' | DCG GROUP';
 const meta=document.querySelector('meta[name="description"]');if(meta)meta.content=(brand?.summary||solution?.summary||project?.summary||'DCG GROUP — hệ sinh thái công nghệ, sáng tạo, phát triển nhân lực và ứng dụng AI.');
 const canonical=document.querySelector('link[rel="canonical"]');if(canonical)canonical.href='https://dcg-group.vercel.app'+path;
 if(path==='/he-sinh-thai')initBrandSearch();if(path==='/du-an/dcg-growmatch')initRecognitionLightbox();const nav=document.getElementById('nav-toggle');nav.addEventListener('click',()=>setMenuState(nav.getAttribute('aria-expanded')!=='true'));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.getAttribute('aria-expanded')==='true')setMenuState(false);trapMenuFocus(e)});document.querySelectorAll('#mobile-menu a').forEach(a=>a.addEventListener('click',()=>setMenuState(false)));const form=document.getElementById('contact-form');if(form)form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form),msg=`ĐỀ NGHỊ HỢP TÁC — DCG GROUP\n\nHọ tên: ${data.get('name')}\nEmail: ${data.get('email')}\nLĩnh vực: ${data.get('topic')}\n\nNội dung:\n${data.get('note')}`;const status=document.getElementById('form-status');try{await navigator.clipboard.writeText(msg);status.textContent='Đã sao chép lời nhắn. Bạn có thể dán vào kênh liên hệ chính thức khi được công bố.';}catch{const t=document.createElement('textarea');t.rows=9;t.readOnly=true;t.value=msg;status.replaceChildren(t);t.select();}})}
init();