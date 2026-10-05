const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const form = document.getElementById('interest-form');
const toast = document.getElementById('toast');

const syncHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 36);
};
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = Math.min(index % 4, 3) * 70 + 'ms';
  revealObserver.observe(el);
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  form.reset();
  toast?.classList.add('show');
  window.setTimeout(() => toast?.classList.remove('show'), 3600);
});

const heroImage = document.querySelector('.hero-image-frame img');
window.addEventListener('scroll', () => {
  if (!heroImage || window.innerWidth < 768) return;
  const y = Math.min(window.scrollY * 0.035, 18);
  heroImage.style.transform = 'scale(1.04) translateY(' + y + 'px)';
}, { passive: true });