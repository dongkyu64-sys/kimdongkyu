/* =========================================================
   과정 데이터 (원본 사이트의 실제 링크로 연결)
   ========================================================= */
const COURSES = [
  {name:"학점은행제", cat:"기본 과정", group:"popular", tag:"가장 많이 찾는 길", desc:"학위·자격 취득의 출발점. 학점 설계부터 시작하세요.", url:"https://dongmento.myportfolio.com/16a2a113c4e3d3"},
  {name:"사회복지사", cat:"국가자격", group:"popular", tag:"인기", desc:"사회복지사 2급, 학점은행제로 안정적으로 취득.", url:"https://dongmento.myportfolio.com/16a2a11f7aab67"},
  {name:"보육교사 · 장애영유아보육교사", cat:"국가자격", group:"popular", tag:"인기", desc:"보육교사 2급 자격, 실습까지 함께 관리해 드립니다.", url:"https://dongmento.myportfolio.com/3"},
  {name:"대학원 진학", cat:"진학", group:"degree", tag:"2026", desc:"학사 학위 취득 후 대학원 진학까지 설계.", url:"https://dongmento.myportfolio.com/16a30dd9e1d2db"},
  {name:"대학교 편입", cat:"편입", group:"degree", tag:"2026", desc:"편입을 위한 학점 준비와 전략을 안내합니다.", url:"https://dongmento.myportfolio.com/16a30dd8411022"},
  {name:"산업기사 · 기사", cat:"국가기술자격", group:"license", tag:"응시자격", desc:"산업안전·건설안전·소방·전기 등 기사 응시자격 확보.", url:"https://dongmento.myportfolio.com/16a2a150707c76"},
  {name:"청소년지도사", cat:"국가자격", group:"license", tag:"", desc:"청소년지도사 자격 취득 경로를 안내합니다.", url:"https://dongmento.myportfolio.com/16a30dddd77daf"},
  {name:"심리상담사 (국가자격증)", cat:"국가자격", group:"license", tag:"", desc:"국가 공인 심리상담 관련 자격 취득 과정.", url:"https://dongmento.myportfolio.com/16a2a11b2d3d23"},
  {name:"심리상담사 (학회자격증)", cat:"민간/학회", group:"license", tag:"", desc:"학회 발급 심리상담 자격, 실무 중심 과정.", url:"https://dongmento.myportfolio.com/16a30ddf4bae10"},
  {name:"도서관 사서", cat:"국가자격", group:"license", tag:"", desc:"준사서·사서 자격을 학점은행제로 준비.", url:"https://dongmento.myportfolio.com/2"},
  {name:"예체능 (체육 · 미용)", cat:"전공", group:"license", tag:"", desc:"체육·미용 전공 학위 및 자격 과정.", url:"https://dongmento.myportfolio.com/1"},
  {name:"기타 교육 과정", cat:"전체", group:"etc", tag:"", desc:"위에 없는 분야도 문의 주시면 안내해 드립니다.", url:"https://dongmento.myportfolio.com/16a2a13854fc8b"},
  {name:"스펙업 자격증", cat:"스펙업", group:"etc", tag:"", desc:"취업·이직에 보탬이 되는 자격증을 모았습니다.", url:"https://dongmento.myportfolio.com/16a2a153bc24e5"},
  {name:"임상심리사 온라인 실습 수련", cat:"실습 수련", group:"etc", tag:"온라인", desc:"임상심리사 실습 수련을 온라인으로 진행.", url:"https://dongmento.myportfolio.com/16a2a139b9f4a0"},
  {name:"ISO 국제심사원", cat:"국제자격", group:"etc", tag:"", desc:"ISO 국제심사원 자격 취득 과정 안내.", url:"https://dongmento.myportfolio.com/1-1"},
];

/* 과정 카드 렌더링 */
const grid = document.getElementById('courseGrid');
function renderCourses(filter){
  grid.innerHTML = '';
  const list = COURSES.filter(c => filter==='all' || c.group===filter);
  list.forEach((c,i)=>{
    const a = document.createElement('a');
    a.href = c.url; a.target = "_blank"; a.rel = "noopener";
    a.className = 'course';
    a.style.animationDelay = (i*0.04)+'s';
    a.innerHTML = `
      <span class="cat">${c.cat}</span>
      <h4>${c.name}<span class="arrow">↗</span></h4>
      <p>${c.desc}</p>
      ${c.tag ? `<span class="tag">${c.tag}</span>` : ''}
    `;
    grid.appendChild(a);
  });
}
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
