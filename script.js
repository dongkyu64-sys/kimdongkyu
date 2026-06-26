/* =========================================================
   라이트박스: 후기 사진 클릭 시 크게 보기
   ========================================================= */
(function(){
  const lb=document.getElementById('lightbox');
  const lbImg=document.getElementById('lightboxImg');
  document.querySelectorAll('.rev-card .proof img').forEach(img=>{
    img.addEventListener('click', ()=>{
      lbImg.src=img.src; lbImg.alt=img.alt||'';
      lb.classList.add('open');
      document.body.style.overflow='hidden';
    });
  });
  function close(){
    lb.classList.remove('open');
    document.body.style.overflow='';
    lbImg.src='';
  }
  document.getElementById('lightboxClose').addEventListener('click', close);
  lb.addEventListener('click', e=>{ if(e.target===lb) close(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape' && lb.classList.contains('open')) close(); });
})();

/* =========================================================
   과정 데이터 (원본 사이트의 실제 링크로 연결)
   ========================================================= */
const COURSES = [
  {name:"학점은행제", cat:"기본 과정", group:"basic",
   desc:"학위·자격 취득의 출발점. 학점 설계부터 시작하세요.",
   detail:"학점은행제는 국가평생교육제도로, 교육부장관 명의 학위를 취득할 수 있습니다. 이는 정식 학위로 인정받아 이력서 기재도 가능하며, 대학 편입, 대학원 진학도 가능합니다. 1:1 학습 설계를 통해 안전하게 진행하실 수 있게 도와드립니다."},
  {name:"사회복지사", cat:"국가자격", group:"license",
   desc:"사회복지사 2급, 학점은행제로 안정적으로 취득.",
   detail:"학점은행제로 사회복지사 2급 자격을 취득할 수 있는 과정입니다. 필수 이수 과목과 실습까지 1:1로 안내해 드립니다."},
  {name:"보육교사 · 장애영유아보육교사", cat:"국가자격", group:"license",
   desc:"보육교사 2급 자격, 실습까지 함께 관리해 드립니다.",
   detail:"보육교사 2급 자격증과 장애영유아 보육교사 자격 취득 과정입니다. 보육교사 2급은 이론 수업과 대면 수업, 실습까지 함께 안내드립니다. 장애영유아 보육교사는 100% 온라인 과정으로, 중복 과목 확인 및 최소 과목으로 이수할 수 있도록 도와드립니다."},
  {name:"대학원 진학", cat:"진학", group:"degree",
   desc:"학사 학위 취득 후 대학원 진학까지 설계.",
   detail:"학점은행제로 학사 학위를 취득한 뒤, 원하시는 대학원에 진학할 수 있도록 학점 설계부터 진학 전략까지 안내해 드립니다."},
  {name:"대학교 편입", cat:"편입", group:"degree",
   desc:"편입을 위한 학점 준비와 전략을 안내합니다.",
   detail:"학점은행제 학점을 활용해 4년제 대학교 편입을 준비하는 과정입니다. 지원 가능 학교와 시기에 맞춘 학점 준비를 1:1로 도와드립니다."},
  {name:"산업기사 · 기사", cat:"국가기술자격", group:"license",
   desc:"산업안전·건설안전·소방·전기 등 기사 응시자격 확보.",
   detail:"산업안전기사, 건설안전기사, 소방설비기사, 전기기사 등 국가기술자격의 응시자격을 학점은행제로 확보할 수 있는 과정입니다."},
  {name:"청소년지도사", cat:"국가자격", group:"license",
   desc:"청소년지도사 자격 취득 경로를 안내합니다.",
   detail:"청소년지도사 자격 취득을 목표로 하는 과정입니다. 필수 이수 과목과 자격 요건에 맞춰 학습 계획을 함께 세워드립니다."},
  {name:"심리상담사 (국가자격증)", cat:"국가자격", group:"license",
   desc:"국가 공인 심리상담 관련 자격 취득 과정.",
   detail:"심리상담사 국가자격증(전문상담교사 2급, 임상심리사 2급, 청소년상담사 3급) 취득 과정입니다. 응시 자격에 필요한 학위 취득과 실습, 대학원 요건까지 1:1로 관리하고 준비합니다."},
  {name:"심리상담사 (학회자격증)", cat:"민간/학회", group:"license",
   desc:"학회 발급 심리상담 자격, 실무 중심 과정.",
   detail:"한국상담심리학회 상담심리사 2급, 한국상담학회 전문상담사 2급 자격증을 준비하는 과정입니다. 관련 학위 취득을 안내해 드립니다."},
  {name:"도서관 사서", cat:"국가자격", group:"license",
   desc:"정사서 2급 취득 과정.",
   detail:"학점은행제로 정사서 2급 자격을 취득하는 과정입니다. 필수 이수 과목을 1:1로 안내해 드립니다."},
  {name:"예체능 (체육 · 미용)", cat:"전공", group:"license",
   desc:"체육·미용 전공 학위 및 자격 과정.",
   detail:"체육학사 또는 미용 전공 학위와 종합미용면허증 취득 과정을 안내드립니다. 예체능 전공이지만 100% 온라인으로 준비할 수 있습니다."},
  {name:"기타 교육 과정", cat:"전체", group:"etc",
   desc:"위에 없는 분야도 문의 주시면 안내해 드립니다.",
   detail:"위 목록에 없는 분야도 학점은행제로 진행 가능한 경우가 많습니다. 어떤 자격·학위를 원하시는지 상담 시 안내해 드립니다."},
  {name:"스펙업 자격증", cat:"스펙업", group:"etc",
   desc:"취업·이직에 보탬이 되는 자격증을 모았습니다.",
   detail:"취업과 이직에 도움이 되는 다양한 스펙업 자격증을 준비할 수 있도록 안내해 드립니다. 이력서 기재용으로 필요하신 분들께 추천드립니다."},
  {name:"임상심리사 온라인 실습 수련", cat:"실습 수련", group:"etc",
   desc:"임상심리사 실습 수련을 온라인으로 진행.",
   detail:"임상심리사 2급 응시자격에 필요한 실습 수련을 줌(ZOOM)으로 진행할 수 있습니다."},
  {name:"ISO 국제심사원", cat:"국제자격", group:"etc",
   desc:"ISO 국제심사원 자격 취득 과정 안내.",
   detail:"내부심사원과 인증심사원, 승격 과정까지 온라인으로 편하게 준비할 수 있습니다.\n\nISO 9001 (품질 경영시스템)\nISO 19011 (심사 스킬 및 가이드)\nISO 14001 (환경 경영시스템)\nISO 45001 (안전보건 경영시스템)\nISO 13485 (의료기기 경영시스템)\nISO 22000 (식품안전 경영시스템)\nISO 22301 (비즈니스 연속성 경영시스템)\nISO 27001 (정보보안 경영시스템)\nISO 37001 (부패방지 경영시스템)\nISO 50001 (에너지 경영시스템)\nESG (환경 · 사회규범 · 지배구조)"},
];

/* 과정 카드 렌더링 */
const grid = document.getElementById('courseGrid');
function renderCourses(filter){
  grid.innerHTML = '';
  const list = COURSES.map((c,i)=>({c,i})).filter(o => filter==='all' || o.c.group===filter);
  list.forEach((o,k)=>{
    const c=o.c;
    const btn = document.createElement('button');
    btn.type='button';
    btn.dataset.idx = o.i;
    btn.className = 'course';
    btn.style.animationDelay = (k*0.04)+'s';
    btn.innerHTML = `
      <span class="cat">${c.cat}</span>
      <h4>${c.name}<span class="arrow">↗</span></h4>
      <p>${c.desc}</p>
    `;
    grid.appendChild(btn);
  });
}
// 카드 클릭 -> 모달 열기 (이벤트 위임)
document.getElementById('courseGrid').addEventListener('click', e=>{
  const card = e.target.closest('.course');
  if(!card) return;
  const c = COURSES[+card.dataset.idx];
  if(!c) return;
  document.getElementById('cmodalCat').textContent = c.cat;
  document.getElementById('cmodalName').textContent = c.name;
  document.getElementById('cmodalDetail').textContent = c.detail || c.desc;
  const m = document.getElementById('cmodal');
  m.classList.add('open');
  document.body.style.overflow='hidden';
});
function closeCmodal(){
  document.getElementById('cmodal').classList.remove('open');
  document.body.style.overflow='';
}
document.getElementById('cmodalClose').addEventListener('click', closeCmodal);
document.getElementById('cmodalApply').addEventListener('click', closeCmodal);
document.getElementById('cmodal').addEventListener('click', e=>{ if(e.target.id==='cmodal') closeCmodal(); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape' && document.getElementById('cmodal').classList.contains('open')) closeCmodal(); });
renderCourses('all');

/* 탭 필터 */
document.getElementById('tabs').addEventListener('click', e=>{
  const btn = e.target.closest('.tab');
  if(!btn) return;
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  renderCourses(btn.dataset.filter);
});

/* =========================================================
   헤더 스크롤 효과 + 맨 위로 버튼
   ========================================================= */
const topbar = document.getElementById('topbar');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  topbar.classList.toggle('scrolled', y > 8);
  toTop.classList.toggle('show', y > 600);
}, {passive:true});
toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

/* =========================================================
   모바일 메뉴
   ========================================================= */
const ham = document.getElementById('hamburger');
const drawer = document.getElementById('drawer');
function toggleMenu(force){
  const open = force ?? !drawer.classList.contains('open');
  drawer.classList.toggle('open', open);
  ham.classList.toggle('open', open);
  ham.setAttribute('aria-expanded', open);
}
ham.addEventListener('click', ()=>toggleMenu());
drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>toggleMenu(false)));

/* =========================================================
   스크롤 등장 애니메이션
   ========================================================= */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* =========================================================
   연락처 자동 하이픈
   ========================================================= */
const phone = document.getElementById('phone');
phone.addEventListener('input', ()=>{
  let v = phone.value.replace(/\D/g,'').slice(0,11);
  if(v.length < 4) phone.value = v;
  else if(v.length < 8) phone.value = v.replace(/(\d{3})(\d+)/, '$1-$2');
  else phone.value = v.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
});

/* =========================================================
   폼 검증 & 제출
   ========================================================= */
// ▼ 상담 신청서를 이메일로 받으려면 web3forms.com에서 발급받은 Access Key를 아래에 붙여넣으세요.
//   (키 발급 시 입력한 이메일 ip00118@naver.com 으로 신청 내용이 전송됩니다.)
const WEB3FORMS_KEY = "2c331aaa-b71d-49c3-8ae5-b877c4a4637a";
const form = document.getElementById('applyForm');
const doneCard = document.getElementById('doneCard');

function setErr(id, on){ document.getElementById(id).classList.toggle('err', on); }

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name');
  const course = document.getElementById('course');
  const agree = document.getElementById('agree');
  const phoneOk = /^01[016789]-\d{3,4}-\d{4}$/.test(phone.value);

  const nameErr = name.value.trim() === '';
  const phoneErr = !phoneOk;
  const courseErr = course.value === '';

  setErr('f-name', nameErr);
  setErr('f-phone', phoneErr);
  setErr('f-course', courseErr);

  if(nameErr || phoneErr || courseErr){
    document.querySelector('.field.err input, .field.err select')?.focus();
    return;
  }
  if(!agree.checked){
    alert('개인정보 수집·이용에 동의해 주세요.');
    return;
  }

  // 완료 화면에 요약 표시
  const memo = document.getElementById('memo').value.trim();
  document.getElementById('summary').innerHTML = `
    <div><b>이름</b><span>${name.value}</span></div>
    <div><b>연락처</b><span>${phone.value}</span></div>
    <div><b>관심 과정</b><span>${course.value}</span></div>
    ${memo ? `<div><b>메모</b><span>${memo}</span></div>` : ''}`;

  // 이메일 전송 (Access Key가 설정된 경우에만 실제 전송)
  if (WEB3FORMS_KEY && WEB3FORMS_KEY !== "YOUR_ACCESS_KEY_HERE") {
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: '[홈페이지] 무료 학습컨설팅 신청',
        from_name: name.value,
        '이름': name.value,
        '연락처': phone.value,
        '관심 과정': course.value,
        '메모': memo || '(없음)'
      })
    }).catch(()=>{});
  }

  form.style.display = 'none';
  doneCard.classList.add('show');
  doneCard.scrollIntoView({behavior:'smooth', block:'center'});
});

document.getElementById('resetBtn').addEventListener('click', ()=>{
  form.reset();
  document.querySelectorAll('.field').forEach(f=>f.classList.remove('err'));
  doneCard.classList.remove('show');
  form.style.display = 'block';
  form.scrollIntoView({behavior:'smooth', block:'center'});
});
