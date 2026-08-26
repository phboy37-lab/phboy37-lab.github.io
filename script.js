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

// Intro logo overlay (home page only) — loader-style percentage counter
(function(){
  const introOverlay = document.getElementById('introOverlay');
  if (!introOverlay) return;
  const barFill = document.getElementById('loaderBarFill');
  const pctLabel = document.getElementById('loaderPct');

  const unlock = () => {
    document.body.classList.remove('intro-lock');
    introOverlay.remove();
  };

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    introOverlay.classList.add('introDone');
    introOverlay.addEventListener('animationend', unlock, { once: true });
    setTimeout(unlock, 1000);
  };

  introOverlay.addEventListener('click', finish);

  const duration = 1800;
  const start = performance.now();
  function tick(now){
    const elapsed = now - start;
    const pct = Math.min(100, Math.round((elapsed / duration) * 100));
    if (barFill) barFill.style.width = pct + '%';
    if (pctLabel) pctLabel.textContent = pct + '%';
    if (pct < 100){
      requestAnimationFrame(tick);
    } else {
      setTimeout(finish, 350);
    }
  }
  requestAnimationFrame(tick);
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
