import { default as axios } from '../libs/axios.min.js';
import { GetLoginBlock } from '../login.js';
/**
 * @param {HTMLFormElement} mainForm
 * @returns {MFormDataResult} An object with the following properties:
 *   - `data` (string): Response body data.
 *   - `error` (boolean): If any error occured.
 */
export function requestForm(mainForm) {
  let isError = false;
  let dataStr;


  return new Promise((resolve) => {
    mainForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const fData = new FormData(mainForm);

      /**
       * Plain object to hold form data for logging.
       * @type {Object<string, string>}
       */
      const formDataObject = {};
      fData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      try {
        const resp = await axios.post(mainForm.action, formDataObject, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        dataStr = resp.data;
      } catch (err) {
        isError = true
      }

      resolve({
        data: dataStr,
        error: isError
      });

    });
  });
};

/**
 * @param {string} newValue
 */
export function updateLastPathSegment(newValue) {
  const url = new URL(window.location.href);
  let segments = url.pathname.split('/');
  segments[segments.length - 1] = newValue;

  const newUrl = new URL(window.location.origin);
  newUrl.pathname = segments.join('/');
  newUrl.search = url.search;
  newUrl.hash = url.hash;

  window.history.pushState({}, '', newUrl);
}


/**
 * @param {string} lStr
 */
export function refreshPage(lStr) {
  GetLoginBlock(lStr);
}
