import { AdminSupportBlock, AdminUserBlock } from './components/management.js';
import { AdminAsideBlock, AsideBlock } from './components/navigation.js';
import { BASE_URL_SITE } from './globals.js';
import { default as axios } from './libs/axios.min.js';
import van from './libs/van-1.5.3.min.js';
import { getUserObject } from './utilities/session.js';
/**
 * @param {string} urlStr
 */
export const GetAdminBlock = (urlStr) => {
  if (urlStr.includes("admin")) {
    const mainDiv = document.getElementById("mainContainer");
    const childMainDiv = mainDiv.children;
    const savedNodes = Array.from(childMainDiv);
    mainDiv.innerHTML = '';
    const userName = van.state("null");
    van.add(mainDiv, AdminAsideBlock(userName, "admin"));

    for (let i = 0; i < savedNodes.length; i++) {
      mainDiv.appendChild(savedNodes[i]);
    }

    const userListMain = document.getElementById("usersList");
    const supportListMain = document.getElementById("supportMessages");

    getUserObject().then((resp) => {
      userName.val = resp.user_name;
    });

    axios.get(BASE_URL_SITE + "api/list").then((resp) => {
      const userObj = /** @type {UserContentLite[]} */  (resp.data);
      for (let i = 0; i < userObj.length; i++) {
        const userCurrent = userObj[i];
        van.add(userListMain, AdminUserBlock(userCurrent.user_name, userCurrent.user_role.value));
      }
    }).catch((err) => {
      console.log(err);
    });

    axios.get(BASE_URL_SITE + "api/list_support").then((resp) => {
      const userObj = /** @type {SupportMessage[]} */  (resp.data);
      for (let i = 0; i < userObj.length; i++) {
        const userCurrent = userObj[i];
        van.add(supportListMain, AdminSupportBlock(userCurrent.user_name, userCurrent.message));
      }
    }).catch((err) => {
      console.log(err);
    });

  }
}

