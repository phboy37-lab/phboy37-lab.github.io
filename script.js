// Ventron shared script

// Sticky header scroll state (only relevant on pages with transparent header)
(function(){
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
})();

// Intro logo overlay (home page only)
(function(){
  const introOverlay = document.getElementById('introOverlay');
  if (!introOverlay) return;
  const unlock = () => {
    document.body.classList.remove('intro-lock');
    introOverlay.remove();
  };
  introOverlay.addEventListener('click', unlock);
  introOverlay.addEventListener('animationend', (e) => {
    if (e.animationName === 'introOut') unlock();
  });
  setTimeout(unlock, 7600);
})();

// Scroll reveal for elements with class "reveal"
(function(){
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => io.observe(el));
})();
