// UKD Kedarnath - Main JS (Navigation, Header, Utilities)
(function() {
  var header = document.getElementById('header');
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');

  if (header) {
    function onScroll() {
      if (window.pageYOffset > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navToggle.classList.remove('active');
          nav.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });
  }
})();
