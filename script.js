// Keep links from the original single-page version working.
// Regular page navigation works without JavaScript.
const previousSections = {
  '#about': 'about.html',
  '#setup': 'setup.html',
  '#interests': 'interests.html'
};
function followPreviousLink() {
  const destination = previousSections[window.location.hash];
  if (destination) window.location.replace(destination);
}
followPreviousLink();
window.addEventListener('hashchange', followPreviousLink);
