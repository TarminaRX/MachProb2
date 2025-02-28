import { default as axios } from '../libs/axios.min.js';
import { refreshPage, updateLastPathSegment } from './submit.js';
/**
 * @param {number} seconds
 * @returns {Promise<void>}
 */
export function sleepSec(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

/**
 * @param {string} nextPath
 */
export function silentReload(nextPath) {
  axios.get(nextPath).then((respo) => {
    const finalUrl = respo.request.responseURL;
    const path = new URL(finalUrl).pathname;
    const parserDom = new DOMParser();
    const docu = parserDom.parseFromString(respo.data, "text/html");
    document.body = docu.body;
    document.title = docu.title;
    updateLastPathSegment(path);
    refreshPage(path);
  }).catch((err) => {
    console.log(err);
  });
}

/**
 * @param {string} pillId
 * @param {string} customMessage
 * @param {number} duration
 */
export function showPill(pillId, customMessage = "", duration = 3000) {
  const pill = document.getElementById(pillId);
  if (customMessage.length !== 0) {
    const pillMessage = document.getElementById(pillId + "-Message");
    pillMessage.innerHTML = customMessage;
  }
  pill.classList.remove("opacity-0");
  pill.classList.add("opacity-100");

  setTimeout(() => {
    pill.classList.remove("opacity-100");
    pill.classList.add("opacity-0");
  }, duration);
}
