import { refreshPage } from './utilities/submit.js';
document.addEventListener('DOMContentLoaded', () => {
  const strPath = window.location.pathname;
  const pathSplitted = strPath.split("/").filter(part => part !== '');
  const locationUrl = pathSplitted[pathSplitted.length - 1];

    /** @param Event event */
  window.onpopstate = (event) => {
    if (event.state) {
      window.location.href = window.location.pathname;
    }
  }
  
  refreshPage(locationUrl);
});
