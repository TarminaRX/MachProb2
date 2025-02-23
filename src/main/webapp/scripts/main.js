import { GetLoginBlock } from './login.js';
document.addEventListener('DOMContentLoaded', () => {
  const strPath = window.location.pathname;
  const pathSplitted = strPath.split("/").filter(part => part !== '');
  const locationUrl = pathSplitted[pathSplitted.length - 1];

  GetLoginBlock(locationUrl);
});
