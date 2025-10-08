// profile-data.js — render previous projects and clients (demo raw data)
(function(){
  const projects = [
    { title: 'Portfolio Website', desc: 'Full responsive portfolio with contact form and CMS', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800' , date:'Jan 2025'},
    { title: 'E-commerce Store', desc: 'Shopify store with custom theme and payment integration', img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800' , date:'Mar 2025'},
    { title: 'Landing Page', desc: 'High-converting landing page for product launch', img: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800' , date:'May 2025'}
  ];

  // previous clients removed per request

  function el(id){return document.getElementById(id);} 

  function renderProjects(){
    const wrap = el('previousProjects');
    if(!wrap) return;
    const compact = wrap.classList.contains('compact');
    wrap.innerHTML = '';
    projects.forEach(p=>{
      const card = document.createElement('div');
      card.className = 'project-card' + (compact? ' compact' : '');
      card.innerHTML = `
        <img src="${p.img}" alt="${p.title}">
        <div class="proj-info${compact? ' compact' : ''}">
          <h4>${p.title}</h4>
          <p>${p.desc}</p>
          <div class="meta">${p.date}</div>
        </div>
      `;
      wrap.appendChild(card);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderProjects();
  });

})();
