// Old section links still reach the right page. Normal links work without JS.
const oldSections = { '#about': 'about.html', '#setup': 'setup.html', '#interests': 'interests.html', '#socials': 'socials.html' };
function followOldLink() {
  if (!['/', '/index.html'].includes(location.pathname)) return;
  const destination = oldSections[location.hash];
  if (destination) location.replace(destination);
}
followOldLink();
window.addEventListener('hashchange', followOldLink);

// Registered in the head so the browser knows the slide direction before painting.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const pageOrder = ['index.html', 'about.html', 'setup.html', 'interests.html', 'socials.html'];
let title;
let titleLetters = [];
let titleFrame;
let transitioning = false;
function setDirection(from, to) {
  if (!from || !to) return;
  const indexOf = url => pageOrder.indexOf(new URL(url).pathname.split('/').pop() || 'index.html');
  const previous = indexOf(from), next = indexOf(to);
  if (previous >= 0 && next >= 0) document.documentElement.dataset.travel = next < previous ? 'back' : 'forward';
}
function restoreTitle() {
  cancelAnimationFrame(titleFrame);
  titleLetters.forEach(letter => { letter.textContent = letter.dataset.letter; });
}
function shuffleTitle() {
  if (!title || motionPreference.matches || document.hidden || transitioning) return;
  restoreTitle();
  const text = title.dataset.scramble;
  const started = performance.now();
  const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  function draw(now) {
    const progress = Math.min((now - started) / 560, 1);
    const resolved = Math.floor(progress * text.length);
    titleLetters.forEach((letter, i) => {
      letter.textContent = i < resolved ? text[i] : symbols[(Math.floor(now / 65) + i * 7) % symbols.length];
    });
    if (progress < 1) titleFrame = requestAnimationFrame(draw);
    else restoreTitle();
  }
  titleFrame = requestAnimationFrame(draw);
}
window.addEventListener('pageswap', event => {
  restoreTitle();
  setDirection(location.href, event.activation?.entry?.url);
  if (motionPreference.matches) event.viewTransition?.skipTransition();
});
window.addEventListener('pagereveal', event => {
  if (!event.viewTransition) return;
  if (motionPreference.matches) { event.viewTransition.skipTransition(); return; }
  setDirection(window.navigation?.activation?.from?.url, location.href);
  transitioning = true;
  restoreTitle();
  document.documentElement.setAttribute('data-transitioning', '');
  event.viewTransition.finished.finally(() => {
    transitioning = false;
    // Keep the initial entrance from replaying when the slide finishes.
    document.documentElement.setAttribute('data-navigated', '');
    document.documentElement.removeAttribute('data-transitioning');
    shuffleTitle();
  }).catch(() => {});
});
function initializeTitle() {
  title = document.querySelector('[data-scramble]');
  if (!title) return;
  titleLetters = [...title.querySelectorAll('[data-letter]')];
  requestAnimationFrame(shuffleTitle);
  title.addEventListener('pointerenter', shuffleTitle);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeTitle, { once: true });
else initializeTitle();
motionPreference.addEventListener('change', () => {
  restoreTitle();
  if (motionPreference.matches) document.documentElement.removeAttribute('data-transitioning');
});
document.addEventListener('visibilitychange', restoreTitle);
window.addEventListener('pagehide', restoreTitle);
