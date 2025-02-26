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
    const parserDom = new DOMParser();
    const docu = parserDom.parseFromString(respo.data, "text/html");
    document.body = docu.body
    updateLastPathSegment(nextPath);
    refreshPage(nextPath);
  }).catch((err) => {
    console.log(err);
  });
}
