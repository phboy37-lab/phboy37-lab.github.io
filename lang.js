// Ventron language switch: English is the default, Korean is chosen with the button.
// The choice is kept in localStorage ('lang') and shared by every page, including the home page.
(function(){
  var h=document.documentElement,lang='en';
  try{lang=localStorage.getItem('lang')||'en'}catch(e){}
  var ATTR=['aria-label','href','content','alt'];
  var items=[].slice.call(document.querySelectorAll('[data-ko],[data-ko-aria-label],[data-ko-href],[data-ko-content],[data-ko-alt]'));
  items.forEach(function(e){
    if(e.hasAttribute('data-ko'))e.setAttribute('data-en',e.tagName==='TITLE'?e.textContent:e.innerHTML);
    ATTR.forEach(function(a){if(e.hasAttribute('data-ko-'+a))e.setAttribute('data-en-'+a,e.getAttribute(a))});
  });
  var btn=null,nl=document.querySelector('.navlinks');
  function label(){
    if(!btn)return;
    btn.textContent=lang==='ko'?'EN':'한국어';
    btn.setAttribute('aria-label',lang==='ko'?'View in English':'한국어로 보기');
  }
  function apply(l){
    lang=l;
    items.forEach(function(e){
      if(e.hasAttribute('data-ko')){
        var v=e.getAttribute(l==='ko'?'data-ko':'data-en');
        if(e.tagName==='TITLE')e.textContent=v;else e.innerHTML=v;
      }
      ATTR.forEach(function(a){
        if(e.hasAttribute('data-ko-'+a))e.setAttribute(a,e.getAttribute(l==='ko'?'data-ko-'+a:'data-en-'+a));
      });
    });
    h.lang=l;label();
    try{localStorage.setItem('lang',l)}catch(e){}
  }
  if(nl){
    btn=document.createElement('button');btn.type='button';btn.className='langbtn';nl.appendChild(btn);
    btn.addEventListener('click',function(){apply(lang==='ko'?'en':'ko')});
  }
  if(lang==='ko')apply('ko');else label();
})();
