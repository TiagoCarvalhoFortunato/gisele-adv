const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('is-open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('is-open')) closeMenu(true); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
document.addEventListener('focusin', event => { if (!event.target.closest('.site-header')) closeMenu(); });
matchMedia('(min-width: 1001px)').addEventListener('change', () => closeMenu());

document.querySelectorAll('[data-whatsapp]').forEach(link => {
  const message = link.dataset.message || 'Olá, Dra. Gisele! Gostaria de conversar sobre a regularização do meu imóvel.';
  link.href = `https://wa.me/5518996575961?text=${encodeURIComponent(message)}`;
});

// Transcrições do site original, preservadas sem atribuir notas ou resultados.
const testimonials = [
  { text: 'Muito boa . Dr Gisele é maravilhosa super profissional dedicada e honesta .', name: 'Juliana Lima', location: 'Birigui - SP', initials: 'JL' },
  { text: 'Dedicada, atenciosa e muito eficiente.', name: 'Odila Maria de Jesus', location: 'Aposentada - Birigui', initials: 'OJ' },
  { text: 'Eu gostaria de agradecer essa profissional ímpar que Deus colocou em nossas vidas. Gi muito obrigada por cuidar do nosso processo com tanta dedicação, preocupação e garra. Deus te abençoe infinitamente.', name: 'Ana Paula Ferreira', location: 'Podóloga - Araçatuba', initials: 'AP' }
];
let currentQuote = 0;
function showQuote(direction) {
  currentQuote = (currentQuote + direction + testimonials.length) % testimonials.length;
  const quote = testimonials[currentQuote];
  document.querySelector('#quote-text').textContent = quote.text;
  document.querySelector('#quote-name').textContent = quote.name;
  document.querySelector('#quote-location').textContent = quote.location;
  document.querySelector('#quote-initials').textContent = quote.initials;
  const counter = document.querySelector('#quote-counter');
  counter.innerHTML = `${String(currentQuote + 1).padStart(2, '0')} <span>/ 03</span>`;
  counter.setAttribute('aria-label', `Depoimento ${currentQuote + 1} de 3`);
}
document.querySelector('#quote-prev').addEventListener('click', () => showQuote(-1));
document.querySelector('#quote-next').addEventListener('click', () => showQuote(1));
document.querySelector('#depoimentos').addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showQuote(event.key === 'ArrowRight' ? 1 : -1);
  }
});
let touchStart = null;
const quoteArea = document.querySelector('.quote-wrap');
quoteArea.addEventListener('touchstart', event => { touchStart = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }; }, { passive: true });
quoteArea.addEventListener('touchend', event => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) showQuote(dx < 0 ? 1 : -1);
  touchStart = null;
}, { passive: true });

const sectionObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    navigation.querySelectorAll('a[href^="#"]').forEach(link => {
      const active = link.hash === `#${entry.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
}, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
document.querySelector('#year').textContent = new Date().getFullYear();

// On small screens, keep the floating contact out of the way of text and controls.
const floatingContact = document.querySelector('.floating-whatsapp');
const protectedContent = [...document.querySelectorAll('main p, main h1, main h2, main h3, main a, main button, main li, main blockquote, main address, footer')];
let contactFrame = false;
function positionContact() {
  contactFrame = false;
  if (window.innerWidth > 650) {
    floatingContact.style.visibility = '';
    return;
  }
  const box = floatingContact.getBoundingClientRect();
  const overlaps = protectedContent.some(element => {
    const rect = element.getBoundingClientRect();
    return rect.width && rect.bottom > box.top - 8 && rect.top < box.bottom + 8 && rect.right > box.left - 8 && rect.left < box.right + 8;
  });
  if (document.activeElement !== floatingContact) floatingContact.style.visibility = overlaps ? 'hidden' : '';
}
function scheduleContact() {
  if (!contactFrame) { contactFrame = true; requestAnimationFrame(positionContact); }
}
window.addEventListener('scroll', scheduleContact, { passive: true });
window.addEventListener('resize', scheduleContact);
window.addEventListener('load', scheduleContact);
