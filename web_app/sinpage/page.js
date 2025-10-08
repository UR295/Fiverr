
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
