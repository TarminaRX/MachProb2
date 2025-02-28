import { GetAdminBlock } from '../admin.js';
import { GetCreateBlock } from '../create.js';
import { GetDeleteBlock } from '../delete.js';
import { GetHelpBlock } from '../help.js';
import { GetLandingBlock } from '../landing.js';
import { default as axios } from '../libs/axios.min.js';
import { GetLoginBlock } from '../login.js';
import { GetProfileBlock } from '../profile.js';
import { GetResultBlock } from '../result.js';
import { GetSignupBlock } from '../signup.js';
import { GetUpdateBlock } from '../update.js';
import { GetUsersBlock } from '../users.js';
import { SessionValid } from './session.js';
/**
 * @param {HTMLFormElement} mainForm
 * @param {string} customUrl
 * @returns {Promise<MFormDataResult>} An object with the following properties:
 *   - `data` (string): Response body data.
 *   - `error` (boolean): If any error occured.
 */
export function requestForm(mainForm, customUrl = "") {
  let isError = false;
  let dataStr = "";


  return new Promise(async (resolve) => {
      const fData = new FormData(mainForm);

      /**
       * Plain object to hold form data for logging.
       * @type {Object<string, string>}
       */
      const formDataObject = {};
      fData.forEach((value, key) => {
        formDataObject[key] = typeof value === "string" ? value : value.name;
      });

      try {
        const urlPut = (customUrl.length !== 0) ? customUrl : mainForm.action;
        const resp = await axios.post(urlPut, formDataObject, {
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
};

/**
 * @param {string} newValue
 */
export function updateLastPathSegment(newValue) {
  const url = new URL(window.location.href);
  let segments = newValue.split('/');
  //console.log(segments);
  //segments[segments.length - 1] = newValue;

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
  //SessionValid(lStr);
  GetLoginBlock(lStr);
  GetSignupBlock(lStr);
  GetLandingBlock(lStr);
  GetProfileBlock(lStr);
  GetUsersBlock(lStr);
  GetHelpBlock(lStr);
  GetAdminBlock(lStr);
  GetCreateBlock(lStr);
  GetUpdateBlock(lStr);
  GetDeleteBlock(lStr);
  GetResultBlock(lStr);
}
