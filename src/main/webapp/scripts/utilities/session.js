import { BASE_URL_SITE } from '../globals.js';
import { default as axios } from '../libs/axios.min.js';
/**
 * @param {string} path
 */
export function SessionValid(path) {
  const loggedResult = document.getElementById("isLogged")?.innerText.trim();

  if (loggedResult !== null && (path.includes("login") || path.includes("signup")) && loggedResult === "true") {
    window.location.href = "landing.jsp";
  }
}

/**
* @return {Promise<UserContents>}
*/
export async function getUserObject() {
  try {
    const requestData = await axios.get(BASE_URL_SITE + "api/current_user");

    /** @type {UserContents} */
    const resultData = requestData.data;
    return resultData;
  } catch (err) {
    console.log(err);
  }
}
