const pageHeader = document.querySelector('.page-header');
const avatar = document.querySelector('.avatar');
const themeToggle = document.getElementById('theme-toggle');
const themeToggleStar = document.querySelector('.toggle__star');
const themeToggleCircle = document.querySelector('.toggle__circle');
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

themeToggle.addEventListener('click', (e) => {
  try {
    handleUserTheme(e);
  } catch (error) {
    console.error(error.name, error.message);
  }
});

window.addEventListener('DOMContentLoaded', (e) => {
  try {
    handleUserTheme(e);
  } catch (error) {
    console.error(error.name, error.message);
  }
});

/**
 *
 * @param {Event} e Event Object
 * @param {String} localStorageTheme if thereis a theme in local storage with the name 'my-theme'
 * @returns {Boolean} True || False According to locaStorageTheme
 */
function dataInLocalStorageHandled(e, localStorageTheme) {
  if (
    e.type === 'DOMContentLoaded' &&
    (localStorageTheme === LIGHT_THEME || localStorageTheme == DARK_THEME)
  ) {
    // Update the theme
    document.documentElement.setAttribute('data-theme', localStorageTheme);
    // Update the position of the circle if user reload in light mood, to prevent circle shift.
    // HINT: Comment the next condition block and reload the page in light mood to see the effect.
    if (localStorageTheme === LIGHT_THEME) {
      themeToggleCircle.style.transitionDuration = '0s ';
      themeToggleCircle.style.transform = 'translate(-15%, -1%) scale(1.1)';
    }
    return true; /** True if the event was reloading or there was data about theme in local storage */
  }
  return false; /** False if the event was not reloading or there was no data about theme in local storage */
}

function handleUserTheme(e) {
  const localStorageTheme = localStorage.getItem('my-theme');

  if (dataInLocalStorageHandled(e, localStorageTheme))
    return; /** Terminate here, the function did the job */

  if (localStorageTheme === LIGHT_THEME) enableDarkMood();
  else if (localStorageTheme === DARK_THEME) enableLightMood();
  else enableDarkMood(); /** Enable light mood by default */
}

function enableLightMood() {
  setRootTheme(LIGHT_THEME);
  localStorage.setItem('my-theme', LIGHT_THEME);
  themeToggle.setAttribute('aria-label', `Switch to ${DARK_THEME} theme`);
  // Animate toggle icon
  themeToggleStar.style.animation =
    'star-light-animation 1.1s cubic-bezier(.27,.25,.28,1.35)';

  themeToggleCircle.style.transition = 'transform 0.5s linear';
  themeToggleCircle.style.transform = 'translate(-15%, -1%) scale(1.1)';
}

function enableDarkMood() {
  setRootTheme(DARK_THEME);
  localStorage.setItem('my-theme', DARK_THEME);
  themeToggle.setAttribute('aria-label', `Switch to ${LIGHT_THEME} theme`);
  // Animate toggle icon
  themeToggleStar.style.animation =
    'star-dark-animation 1.1s cubic-bezier(.27,.25,.28,1.35)';

  themeToggleCircle.style.transition = 'transform 0.5s linear';
  themeToggleCircle.style.transform = 'translate(0%, 0%) scale(1)';
}

function setRootTheme(theme) {
  if (typeof theme !== 'string') throw TypeError('Pass a valid theme');
  document.documentElement.setAttribute('data-theme', theme);
}

// Scroll observer

function showNav(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    pageHeader.classList.add('show-header');
  } else {
    pageHeader.classList.remove('show-header');
  }
}

const observer = new IntersectionObserver(showNav, {
  root: null,
  threshold: 1,
});

observer.observe(avatar);
