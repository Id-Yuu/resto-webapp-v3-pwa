import 'regenerator-runtime'; /* for async await transpile */
import(/* webpackPreload: true */ '../styles/main.scss');
import(/* webpackPreload: true */ '../styles/responsive.scss');
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import swRegister from './utils/swRegister';
import App from './views/app';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#container'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
  // skip to content
  const skipToContent = document.querySelector('.skip_to_content');
  skipToContent.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('container').scrollIntoView({behavior: 'smooth'});
    skipToContent.blur();
  });
});
