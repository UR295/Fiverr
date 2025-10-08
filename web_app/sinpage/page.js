
document.addEventListener('DOMContentLoaded', function(){
  const adminBtn = document.getElementById('adminBtn');
  if(!adminBtn) return;

  adminBtn.addEventListener('click', function(e){
    
    const href = adminBtn.getAttribute('href') || '../AdminD/admin.html';

    window.location.href = href;
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const prev = document.querySelector('.icon-btn[aria-label="prev"]');
  const next = document.querySelector('.icon-btn[aria-label="next"]');
  const carousel = document.querySelector('.carousel');

  if (!carousel) return;

  prev.addEventListener('click', () => {
    carousel.scrollBy({left: -200, behavior: 'smooth'});
  });
  next.addEventListener('click', () => {
    carousel.scrollBy({left: 200, behavior: 'smooth'});
  });
});

// Post project modal behavior
document.addEventListener('DOMContentLoaded', ()=>{
  const openBtn = document.getElementById('openPostProject');
  const modal = document.getElementById('postModal');
  const dismissEls = modal ? modal.querySelectorAll('[data-dismiss]') : [];
  const postForm = document.getElementById('postForm');

  function openModal(){ if(modal){ modal.setAttribute('aria-hidden','false'); modal.classList.add('show'); }}
  function closeModal(){ if(modal){ modal.setAttribute('aria-hidden','true'); modal.classList.remove('show'); }}

  // navigate to full page post form instead of modal
  openBtn && openBtn.addEventListener('click', ()=>{ window.location.href = '../post-project.html'; });
  dismissEls.forEach(el=> el.addEventListener('click', closeModal));
  modal && modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

  // read image as data URL
  async function toDataUrl(file){ return new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.onerror=rej; r.readAsDataURL(file); }); }

  function loadGigs(){
    try{ return JSON.parse(localStorage.getItem('gm_gigs')||'[]'); }catch(e){ return []; }
  }
  function saveGigs(list){ localStorage.setItem('gm_gigs', JSON.stringify(list)); }

  function renderNewGig(gig){
    const grid = document.querySelector('.gigs-grid');
    if(!grid) return;
    // auth removed: render all gigs
    const card = document.createElement('div'); card.className='gig-card card';
    card.innerHTML = `
      <img src="${gig.image}" alt="Gig Preview" />
      <h4>${gig.title}</h4>
      <p>⭐ 0.0 (0)</p>
      <p class="price">From $${gig.price}</p>
    `;
    grid.prepend(card);
  }

  // render persisted gigs on page load
    // render persisted gigs on page load
    (function(){
      const gigs = loadGigs();
      const grid = document.querySelector('.gigs-grid');
      if(!grid) return;
      if(gigs && gigs.length > 0){
        // if there are saved gigs, replace the demo content with saved gigs
        grid.innerHTML = '';
        gigs.forEach(g=> renderNewGig(g));
      } else {
        // no saved gigs — keep the static demo cards already present in HTML
      }
    })();

  postForm && postForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const category = document.getElementById('projCategory').value;
    const title = document.getElementById('projTitle').value.trim();
    const desc = document.getElementById('projDesc').value.trim();
    const price = Number(document.getElementById('projPrice').value);
    const domain = document.getElementById('projDomain').value.trim();
    const imageInput = document.getElementById('projImage');
    if(!title || !desc || !price) { alert('Please fill required fields'); return; }
    let imgUrl = '../assets/default-gig.png';
    if(imageInput && imageInput.files && imageInput.files[0]){
      try{ imgUrl = await toDataUrl(imageInput.files[0]); }catch(err){ console.warn(err); }
    }
  const poster = 'anonymous';
      const gig = { category, title, desc, price, domain, image: imgUrl, created:Date.now(), poster };
    const gigs = loadGigs(); gigs.unshift(gig); saveGigs(gigs);
    renderNewGig(gig);
    closeModal(); postForm.reset();
  });
});
