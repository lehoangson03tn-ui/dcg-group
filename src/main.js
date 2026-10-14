import "./styles.css";

const site = {
  group: {name:"DCG GROUP",type:"THE CORPORATE ECOSYSTEM",subtitle:"Công nghệ, con người và sức sáng tạo.",heading:"Kiến tạo hệ sinh thái AI và sáng tạo.",description:"Kết nối công nghệ, con người và những ý tưởng khác biệt để hướng đến những giá trị bền vững.",path:"/ve-dcg",image:"/_cdn/static/58caedfe-fe2d-40c4-a675-08076d9d5597.png",cta:"KHÁM PHÁ DCG GROUP"},
  talent: {name:"DCG TALENT",type:"HUMAN TECHNOLOGY",subtitle:"Kết nối tiềm năng. Kiến tạo phát triển.",heading:"Hiểu đúng năng lực. Mở lối phát triển.",description:"Công nghệ tuyển dụng, đối sánh năng lực và phát triển nghề nghiệp; DCG GROWMATCH là sản phẩm chủ lực.",path:"/talent",image:"/_cdn/static/079cbf09-206f-4c9f-b390-747eb968f393.png",cta:"KHÁM PHÁ DCG TALENT"},
  studio: {name:"DCG STUDIO",type:"CREATIVE PRODUCTION",subtitle:"Biến ý tưởng thành trải nghiệm.",heading:"Sáng tạo được dẫn dắt bằng cảm xúc và công nghệ.",description:"Sản xuất video AI, CGI, quảng cáo và nội dung thương mại với ngôn ngữ hình ảnh riêng biệt.",path:"/studio",image:"/_cdn/static/9d477f50-cbe4-4dad-a273-fdd999177471.png",cta:"KHÁM PHÁ DCG STUDIO"},
  vision: {name:"DCG VISION",type:"COMPUTER VISION",subtitle:"Quan sát thông minh. Nâng tầm chất lượng.",heading:"Biến hình ảnh thành thông tin hữu ích.",description:"Hướng phát triển thị giác máy tính và camera AI, khởi đầu với Mắt Thần hỗ trợ QA/QC ngành F&B.",path:"/vision",image:"/_cdn/static/6a156ddb-434f-4a3c-be39-7e7f7274b476.png",cta:"KHÁM PHÁ DCG VISION"},
  entertainment: {name:"DCG ENTERTAINMENT",type:"AI ENTERTAINMENT",subtitle:"Mở ra những thế giới giải trí mới.",heading:"Khi trí tưởng tượng không còn giới hạn.",description:"Khám phá phim, âm nhạc, nhân vật AI và thế giới nội dung nguyên bản của DCG.",path:"/entertainment",image:"/_cdn/static/ec2e6767-a145-4ca6-8405-7a5d7bab4675.png",cta:"KHÁM PHÁ DCG ENTERTAINMENT"}
};
const approvedLogos=Object.fromEntries(['group','talent','studio','vision','entertainment'].map(k=>[k,{emblem:`/assets/dcg-${k}-emblem.webp`,full:`/assets/dcg-${k}-transparent.webp`}]));
const ownedImages={group:'/assets/hero-group.webp',talent:'/assets/hero-talent.webp',studio:'/assets/hero-studio.webp',vision:'/assets/hero-vision.webp',entertainment:'/assets/hero-entertainment.webp'};
Object.entries(site).forEach(([key,value])=>{value.image=ownedImages[key];value.logo=approvedLogos[key].full;value.emblem=approvedLogos[key].emblem;});
const order=["group","talent","studio","vision","entertainment"], branches=["talent","studio","vision","entertainment"];
const nav=[["/","Trang chủ"],["/ve-dcg","Về DCG GROUP"],["/he-sinh-thai","Hệ sinh thái"],["/talent","DCG TALENT"],["/studio","DCG STUDIO"],["/vision","DCG VISION"],["/entertainment","DCG ENTERTAINMENT"],["/mat-than-ai","Mắt Thần AI"],["/lien-he","Liên hệ"]];
const content = {
"/ve-dcg":{name:"DCG GROUP",headline:"Một tầm nhìn. Nhiều chân trời.",description:"Hệ sinh thái ứng dụng AI trong nhân lực, sáng tạo, giải trí và thị giác máy tính.",sections:[
["Về DCG GROUP","DCG GROUP là thương hiệu mẹ kết nối bốn định hướng hoạt động: DCG TALENT, DCG STUDIO, DCG VISION và DCG ENTERTAINMENT. Mỗi thương hiệu mang một sứ mệnh riêng, hướng tới việc ứng dụng công nghệ có ích cho con người và doanh nghiệp."],
["Tầm nhìn","Từng bước kiến tạo một hệ sinh thái AI và sáng tạo có bản sắc Việt Nam, dựa trên năng lực thực tế và sự hợp tác lâu dài."],
["Giá trị cốt lõi","Con người là trung tâm. Sản phẩm dựa trên bằng chứng. Sáng tạo có mục đích. Tôn trọng bản quyền, dữ liệu và trách nhiệm quyết định của con người."]]},
"/talent":{name:"DCG TALENT",headline:site.talent.heading,description:site.talent.description,image:site.talent.image,sections:[
["Công nghệ nhân lực","DCG TALENT tập trung từ khám phá cơ hội, đối sánh công việc đến hỗ trợ đánh giá năng lực và phát triển kỹ năng nghề nghiệp."],
["Sản phẩm DCG GROWMATCH","DCG GROWMATCH đang được xây dựng và vận hành tại một website riêng. Trải nghiệm đối sánh, đánh giá và luyện tập được phát triển theo từng giai đoạn; AI hỗ trợ nhận xét, con người quyết định."],
["Nguyên tắc","Phù hợp trước – Phát triển tiếp – Con người quyết định. Ứng viên sở hữu tài khoản cá nhân; lịch sử riêng tư không tự động mở cho doanh nghiệp."]],action:{text:"DÙNG DCG GROWMATCH",url:"https://dcg-growmatch.vercel.app"}},
"/studio":{name:"DCG STUDIO",headline:site.studio.heading,description:site.studio.description,image:site.studio.image,sections:[
["Sản xuất video AI & CGI","Phát triển kịch bản, concept, hình ảnh, cảnh quay và hậu kỳ phù hợp mục đích truyền thông hoặc quảng cáo."],
["Sáng tạo thương mại","Tập trung vào thông điệp thương hiệu, tính nhất quán của hình ảnh và trải nghiệm người xem."],
["Chất lượng và quyền sử dụng","Portfolio sẽ phân biệt tác phẩm đã sản xuất, bản demo và đề xuất; đảm bảo quyền sử dụng âm nhạc, hình ảnh, nhân vật và công cụ."]]},
"/vision":{name:"DCG VISION",headline:site.vision.heading,description:site.vision.description,image:site.vision.image,sections:[
["Thị giác máy tính","Nghiên cứu các ứng dụng nhận diện, phân tích hình ảnh và hỗ trợ vận hành bằng AI."],
["Camera AI Mắt Thần","Hướng phát triển đầu tiên hỗ trợ bộ phận QA/QC ngành thực phẩm và đồ uống, xác định các tín hiệu cần kiểm tra trong quy trình có thể quan sát qua camera."],
["Con người kiểm chứng","Cảnh báo AI không phải là kết luận vi phạm; cần đánh giá dữ liệu, tỷ lệ báo sai, bảo vệ quyền riêng tư và xác minh của nhân sự có trách nhiệm."]],action:{text:"TÌM HIỂU MẮT THẦN AI",url:"/mat-than-ai"}},
"/entertainment":{name:"DCG ENTERTAINMENT",headline:site.entertainment.heading,description:site.entertainment.description,image:site.entertainment.image,sections:[
["Phim & series","Định hướng phát triển phim ngắn, series, hoạt hình và các thế giới kể chuyện nguyên bản ứng dụng công nghệ AI."],
["Âm nhạc & MV","Khai thác âm nhạc, hình ảnh chuyển động và hình thức biểu diễn mới, tôn trọng bản quyền và quyền nhân thân."],
["Nhân vật AI","Phát triển nhân vật hư cấu với tính cách, bối cảnh và câu chuyện nhất quán để xây dựng nội dung lâu dài."]]},
"/mat-than-ai":{name:"DCG VISION / MẮT THẦN",headline:"Mắt Thần AI cho QA/QC F&B.",description:"Dự án nghiên cứu ứng dụng camera AI hỗ trợ giám sát chất lượng và quy trình ngành F&B.",image:site.vision.image,sections:[
["Bài toán cần giải quyết","Hoạt động QA/QC phải quan sát nhiều thao tác và điểm kiểm tra. Dữ liệu hình ảnh có thể hỗ trợ phát hiện dấu hiệu sai lệch cần con người xác minh."],
["Hướng công nghệ","Nghiên cứu thị giác máy tính, cảnh báo theo tiêu chí xác định, ghi lại tình huống phù hợp và truy xuất thông tin kiểm tra."],
["Giới hạn kiểm chứng","Mắt Thần đang trong quá trình phát triển; chưa công bố tỷ lệ chính xác hay tuyên bố triển khai thương mại khi chưa có bằng chứng kiểm định thực tế."]]}
};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const icon=(name)=>({arrow:'↗',down:'↓',left:'←',right:'→',menu:'☰',close:'✕'}[name]||"");
function shell(body){
 return `<a class="skip" href="#main">Chuyển đến nội dung</a><header class="header"><a href="/" class="wordmark" aria-label="DCG GROUP — về trang chủ"><span class="wordmark__logo"><img src="${approvedLogos.group.emblem}" alt="" width="52" height="52" decoding="async"></span><span class="wordmark__text">DCG GROUP<small>AI · TECHNOLOGY · CREATIVITY</small></span></a><nav class="nav-inline" aria-label="Menu chính"><a href="/ve-dcg">VỀ DCG</a><a href="/he-sinh-thai">HỆ SINH THÁI</a><a href="/vision">DCG VISION</a><a href="/lien-he">LIÊN HỆ</a></nav><button type="button" class="menu-toggle" aria-controls="drawer" aria-expanded="false" aria-label="Mở menu">☰</button></header><div class="drawer" id="drawer" aria-hidden="true"><div class="drawer__head">KHÁM PHÁ DCG GROUP</div><nav aria-label="Điều hướng toàn trang">${nav.map(([href,label],i)=>`<a href="${href}"><small>${String(i+1).padStart(2,"0")}</small><span>${label}</span><span>↗</span></a>`).join("")}</nav><div class="drawer__foot">VIỆT NAM · 2026</div></div><main id="main">${body}</main><footer class="footer"><div class="footer__grid"><div><p class="eyebrow">DCG GROUP / CONNECT</p><h2>Cùng kiến tạo<br>giá trị mới.</h2><a href="/lien-he" class="text-link">KẾT NỐI VỚI DCG GROUP ↗</a></div><nav aria-label="Thương hiệu thành viên">${branches.map(k=>`<a href="${site[k].path}">${site[k].name} ↗</a>`).join("")}<a href="/mat-than-ai">MẮT THẦN AI ↗</a></nav></div><div class="footer__bottom"><span class="footer-approved-logo"><img src="${approvedLogos.group.full}" alt="DCG GROUP" loading="lazy" decoding="async"></span><span>© 2026 DCG GROUP · Website hệ sinh thái AI & sáng tạo</span></div></footer>`;
}
function home(){
 return `<section class="story" data-story aria-label="Câu chuyện hệ sinh thái DCG GROUP gồm 5 cảnh"><div class="story__sticky">${order.map((key,i)=>{let x=site[key];return `<article class="story-slide ${i===0?"is-active":""}" data-slide="${i}" aria-hidden="${i!==0}"><img src="${x.image}" alt="" ${i>1?'loading="lazy"':''}><div class="story-slide__shade"></div><div class="story-approved-logo"><img src="${x.logo}" alt="" ${i===0?'fetchpriority="high"':'loading="lazy"'} decoding="async"></div><div class="story-slide__content"><p class="eyebrow"><span class="gold-line"></span>${esc(x.type)}</p><div class="slide-identity"><span class="slide-identity__mark"><img src="${x.emblem}" alt="" loading="lazy" decoding="async"></span><span class="slide-brand">${esc(x.name)}</span></div>${i===0?`<h1>${esc(x.heading)}</h1>`:`<h2>${esc(x.heading)}</h2>`}<p class="slide-desc">${esc(x.description)}</p><a class="text-link" href="${x.path}" tabindex="${i===0?0:-1}">${esc(x.cta)} ↗</a></div></article>`}).join("")}<div class="story-progress"><div class="story-progress__count"><span data-count>01</span> / 05</div><div class="story-progress__dots">${order.map((k,i)=>`<button class="story-dot ${i===0?'is-active':''}" data-jump="${i}" aria-label="Đến cảnh ${i+1}: ${site[k].name}" ${i===0?'aria-current="step"':''}><span></span></button>`).join("")}</div><div class="story-progress__nav"><button data-prev aria-label="Cảnh trước" disabled>↑</button><button data-next aria-label="Cảnh tiếp theo">↓</button></div><span class="scroll-label">CUỘN ĐỂ KHÁM PHÁ ↓</span></div></div></section>
 <section class="intro paper" id="intro"><div class="section-meta">01 / VỀ DCG GROUP <span>OUR PHILOSOPHY</span></div><div class="intro__grid"><div><p class="eyebrow">A CREATIVE TECHNOLOGY ECOSYSTEM</p><h2>Một hệ sinh thái.<br>Nhiều tiềm năng.</h2></div><div><h3>Công nghệ là phương tiện. Con người là trung tâm.</h3><p>DCG GROUP phát triển những hướng đi trong nhân lực, sản xuất sáng tạo, thị giác máy tính và giải trí ứng dụng AI. Mỗi lĩnh vực có định hướng riêng, cùng theo đuổi giá trị thực, trách nhiệm và phát triển lâu dài.</p><a href="/ve-dcg" class="dark-link">TÌM HIỂU VỀ CHÚNG TÔI ↗</a></div></div></section>
 <section class="ecosystem dark"><div class="section-meta">02 / OUR ECOSYSTEM <span>FOUR FIELDS. ONE VISION.</span></div><div class="heading-grid"><h2>Hệ sinh thái<br>DCG GROUP</h2><p>Bốn thương hiệu với những năng lực khác biệt, kết nối qua một định hướng chung: ứng dụng AI có trách nhiệm và sáng tạo có mục đích.</p></div><div class="brand-grid">${branches.map((k,i)=>{let x=site[k];return `<a class="brand-card" href="${x.path}"><img src="${x.image}" alt="" loading="lazy"><span class="brand-card__top">0${i+1} / 04 <span>${x.type}</span></span><div class="brand-card__body"><div class="card-approved-logo"><img src="${x.logo}" alt="Logo ${esc(x.name)}" loading="lazy" decoding="async"></div><h3>${x.subtitle}</h3><p>${x.description}</p><span class="brand-card__cta">KHÁM PHÁ THƯƠNG HIỆU ↗</span></div></a>`}).join("")}</div></section>
 <section class="feature paper"><div class="section-meta">03 / DỰ ÁN NỔI BẬT <span>IDEAS INTO ACTION</span></div><div class="heading-grid"><h2>Giá trị thực.<br>Tầm nhìn dài hạn.</h2><p>Khám phá những sản phẩm và dự án đang được phát triển trong hệ sinh thái DCG.</p></div><div class="feature__grid"><a class="feature__card" href="/talent"><img src="${site.talent.image}" alt="" loading="lazy"><div><span>DCG TALENT / HR TECHNOLOGY</span><h3>DCG GROWMATCH</h3><p>Đối sánh năng lực và phát triển nghề nghiệp.</p></div></a><a class="feature__card" href="/mat-than-ai"><img src="${site.vision.image}" alt="" loading="lazy"><div><span>DCG VISION / COMPUTER VISION</span><h3>MẮT THẦN AI</h3><p>Dự án camera AI hỗ trợ QA/QC F&B.</p></div></a></div></section>
 <section class="closing"><p class="eyebrow">OUR NEXT CHAPTER</p><h2>Giá trị của tương lai<br>bắt đầu từ hôm nay.</h2><a href="/lien-he" class="text-link">ĐỒNG HÀNH CÙNG DCG GROUP ↗</a></section>`;
}
function inside(d,path){
 const img=d.image||site.group.image;
 const brandKey=Object.keys(site).find(key=>String(d.name).startsWith(site[key].name))||"group";
 const brandLogo=approvedLogos[brandKey].full;
 return `<section class="inner-hero" style="--inner-bg:url('${img}')"><div class="inner-hero__content"><div class="inner-approved-logo"><img src="${brandLogo}" alt="Logo ${esc(d.name)}" decoding="async"></div><p class="eyebrow"><span class="gold-line"></span>DCG GROUP / ${esc(d.name)}</p><h1>${esc(d.headline)}</h1><p>${esc(d.description)}</p><a href="#content" class="text-link">KHÁM PHÁ NỘI DUNG ↓</a></div></section><section class="details paper" id="content"><div class="section-meta">THÔNG TIN & ĐỊNH HƯỚNG <span>${esc(d.name)}</span></div><div class="details__grid">${d.sections.map((s,i)=>`<article class="detail"><span>0${i+1}</span><div><h2>${esc(s[0])}</h2><p>${esc(s[1])}</p></div></article>`).join("")}</div>${d.action?`<a class="dark-link" href="${d.action.url}" ${d.action.url.startsWith("https")?'target="_blank" rel="noopener noreferrer"':''}>${esc(d.action.text)} ↗</a>`:""}</section><section class="closing"><p class="eyebrow">DCG GROUP</p><h2>Cùng kiến tạo<br>giá trị mới.</h2><a class="text-link" href="/lien-he">LIÊN HỆ HỢP TÁC ↗</a></section>`;
}
function ecosystemPage(){return `<section class="inner-hero inner-hero--text"><div class="inner-hero__content"><div class="inner-approved-logo"><img src="${approvedLogos.group.full}" alt="Logo DCG GROUP" decoding="async"></div><p class="eyebrow">DCG GROUP / OUR ECOSYSTEM</p><h1>Những lĩnh vực. Một tầm nhìn.</h1><p>Bốn thương hiệu với bản sắc riêng trong cùng một hệ sinh thái công nghệ và sáng tạo.</p></div></section><section class="ecosystem dark"><div class="section-meta">HỆ SINH THÁI <span>01 — 04</span></div><div class="brand-grid">${branches.map((k,i)=>{let x=site[k];return `<a class="brand-card" href="${x.path}"><img src="${x.image}" alt="" loading="lazy"><span class="brand-card__top">0${i+1} / 04 <span>${x.type}</span></span><div class="brand-card__body"><div class="card-approved-logo"><img src="${x.logo}" alt="Logo ${esc(x.name)}" loading="lazy" decoding="async"></div><h3>${x.subtitle}</h3><p>${x.description}</p><span class="brand-card__cta">KHÁM PHÁ ↗</span></div></a>`}).join("")}</div></section><section class="intro paper"><div class="section-meta">DỰ ÁN THÀNH VIÊN <span>DCG VISION</span></div><div class="intro__grid"><h2>Mắt Thần AI</h2><div><p>Dự án camera AI hỗ trợ quan sát, đánh giá và cảnh báo các dấu hiệu cần kiểm tra trong quy trình QA/QC ngành F&B.</p><a href="/mat-than-ai" class="dark-link">TÌM HIỂU DỰ ÁN ↗</a></div></div></section>`;}
function contact(){
 return `<section class="inner-hero inner-hero--text"><div class="inner-hero__content"><div class="inner-approved-logo"><img src="${approvedLogos.group.full}" alt="Logo DCG GROUP" decoding="async"></div><p class="eyebrow">DCG GROUP / CONNECT</p><h1>Khởi đầu một kết nối.</h1><p>Một ý tưởng, một dự án thương mại hoặc một đề nghị hợp tác đều bắt đầu từ cuộc trò chuyện.</p></div></section><section class="contact paper"><div class="section-meta">KẾT NỐI VỚI DCG <span>LET'S CREATE TOGETHER</span></div><div class="contact__grid"><div><h2>Cùng nhau tạo nên khác biệt.</h2><p>Hãy cho biết lĩnh vực bạn quan tâm. Form hiện giúp soạn và sao chép lời nhắn; chưa có hộp thư tiếp nhận chính thức nên không tự gửi thông tin.</p><div class="contact__nav">${branches.map(k=>`<a href="${site[k].path}">${site[k].name} ↗</a>`).join("")}</div></div><form id="contact-form"><h3>Soạn nội dung hợp tác</h3><label for="contact-name">Họ tên *</label><input id="contact-name" name="name" required minlength="2" autocomplete="name" maxlength="120" placeholder="Tên người liên hệ"><label for="contact-email">Email *</label><input id="contact-email" name="email" required type="email" autocomplete="email" maxlength="200" placeholder="name@example.com"><label for="contact-brand">Lĩnh vực quan tâm</label><select id="contact-brand" name="brand">${["DCG GROUP",...branches.map(k=>site[k].name)].map(n=>`<option>${n}</option>`).join("")}</select><label for="contact-message">Nội dung *</label><textarea id="contact-message" name="message" rows="5" required minlength="10" maxlength="4000" placeholder="Mô tả nhu cầu hợp tác (ít nhất 10 ký tự)"></textarea><button class="submit" type="submit">SAO CHÉP THƯ NGỎ ↗</button><p class="form-note" role="status" id="contact-status">Thông tin chỉ được xử lý ngay trên trình duyệt của bạn.</p></form></div></section>`;
}
function render(){
  const path=location.pathname.replace(/\/$/,"")||"/";
  const body=path==="/"?home():path==="/he-sinh-thai"?ecosystemPage():path==="/lien-he"?contact():content[path]?inside(content[path],path):`<section class="inner-hero inner-hero--text"><div class="inner-hero__content"><h1>Không tìm thấy trang</h1><a class="text-link" href="/">VỀ TRANG CHỦ ↗</a></div></section>`;
  document.getElementById("app").innerHTML=shell(body);
  document.title=(content[path]?.name||(path==="/he-sinh-thai"?"Hệ sinh thái":path==="/lien-he"?"Liên hệ":"DCG GROUP"))+" | DCG GROUP";
  document.querySelector(".menu-toggle").addEventListener("click",()=>setMenu(!document.querySelector(".drawer").classList.contains("is-open")));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false)});
  document.querySelectorAll(".drawer a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
  if(path==="/")initStory();
  if(path==="/lien-he")initContact();
}
function setMenu(open){
 const d=document.querySelector(".drawer"),b=document.querySelector(".menu-toggle");
 if(!d||!b)return;
 d.classList.toggle("is-open",open);d.setAttribute("aria-hidden",String(!open));
 b.setAttribute("aria-expanded",String(open));b.textContent=open?"✕":"☰";b.setAttribute("aria-label",open?"Đóng menu":"Mở menu");
 document.body.classList.toggle("is-menu-open",open);
}
function initStory(){
 const section=document.querySelector("[data-story]");if(!section)return;
 let active=-1,lock=0,acc=0,lastDirection=0;const N=order.length;
 const step=()=>section.getBoundingClientRect().height/N;
 const start=()=>section.getBoundingClientRect().top+scrollY;
 function display(i){
  let next=Math.min(N-1,Math.max(0,i));
  if(active===next)return;active=next;
  section.querySelectorAll("[data-slide]").forEach((el,n)=>{let current=n===next;el.classList.toggle("is-active",current);el.setAttribute("aria-hidden",String(!current));el.querySelectorAll("a").forEach(a=>a.tabIndex=current?0:-1)});
  section.querySelector("[data-count]").textContent=String(next+1).padStart(2,"0");
  section.querySelectorAll("[data-jump]").forEach((el,n)=>{el.classList.toggle("is-active",n===next);if(n===next)el.setAttribute("aria-current","step");else el.removeAttribute("aria-current")});
  section.querySelector("[data-prev]").disabled=next===0;
  section.querySelector("[data-next]").setAttribute("aria-label",next===N-1?"Tiếp tục xuống trang chủ":"Cảnh tiếp theo");
 }
 function go(i){const target=Math.max(0,Math.min(N,i));if(target<N)display(target);scrollTo({top:start()+step()*target,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}
 const update=()=>{let p=(scrollY-start())/step();display(Math.max(0,Math.min(N-1,Math.round(p))))};
 section.querySelectorAll("[data-jump]").forEach(b=>b.addEventListener("click",()=>go(Number(b.dataset.jump))));
 section.querySelector("[data-prev]").addEventListener("click",()=>go(active-1));
 section.querySelector("[data-next]").addEventListener("click",()=>go(active+1));
 addEventListener("scroll",update,{passive:true});
 addEventListener("resize",update,{passive:true});update();
 addEventListener("wheel",e=>{
   if(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||document.body.classList.contains("is-menu-open"))return;
   const p=(scrollY-start())/step(),dir=Math.sign(e.deltaY);
   if(p<-.02||p>N+.02||(p>N-.03&&dir>0)||(p<.02&&dir<0))return;
   if(!dir)return;
   e.preventDefault();
   if(Date.now()<lock)return;
   acc=lastDirection===dir?acc+Math.abs(e.deltaY):Math.abs(e.deltaY);
   lastDirection=dir;if(acc<40)return;
   acc=0;lock=Date.now()+800;
   go(Math.min(N,Math.max(0,Math.round(p)+dir)));
 },{passive:false});
}
function initContact(){
 document.getElementById("contact-form")?.addEventListener("submit",async e=>{
  e.preventDefault();const f=e.currentTarget;
  if(!f.reportValidity())return;
  const data=new FormData(f);
  const text=`ĐỀ NGHỊ HỢP TÁC — DCG GROUP\n\nHọ tên: ${data.get("name")}\nEmail: ${data.get("email")}\nLĩnh vực: ${data.get("brand")}\n\nNội dung:\n${data.get("message")}`;
  const status=document.getElementById("contact-status");
  try{await navigator.clipboard.writeText(text);status.textContent="Đã sao chép. Bạn có thể dán nội dung vào kênh liên hệ chính thức khi được công bố."}
  catch{const box=document.createElement("textarea");box.value=text;box.rows=9;box.readOnly=true;box.setAttribute("aria-label","Nội dung thư ngỏ sao chép thủ công");status.replaceChildren(box);box.select()}
 });
}
render();
