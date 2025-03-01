import { AdminCreateBlock, AdminResultUser, AdminSupportBlock, AdminUserBlock } from './components/management.js';
import { AdminAsideBlock, AsideBlock } from './components/navigation.js';
import { BASE_URL_SITE } from './globals.js';
import { default as axios } from './libs/axios.min.js';
import van from './libs/van-1.5.3.min.js';
import { showPill, silentReload, sleepSec } from './utilities/helper.js';
import { getUserObject } from './utilities/session.js';
/**
 * @param {string} urlStr
 */
export const GetResultBlock = (urlStr) => {
  if (urlStr.includes("result")) {
    const mainDiv = document.getElementById("mainContainer");
    const childMainDiv = mainDiv.children;
    const savedNodes = Array.from(childMainDiv);
    mainDiv.innerHTML = '';
    const userName = van.state("null");
    van.add(mainDiv, AdminAsideBlock(userName, "result"));

    for (let i = 0; i < savedNodes.length; i++) {
      mainDiv.appendChild(savedNodes[i]);
    }

    const resultContainer = document.getElementById("mainResults");
    getUserObject().then((resp) => {
      userName.val = resp.user_name;
      axios.get(BASE_URL_SITE + "api/result").then((resp) => {
        const resultConts = /** @type {ResultContentLite[]} */ (resp.data);
        for(let i = 0; i < resultConts.length; i++) {
          const userCurrent = resultConts[i];
          van.add(resultContainer, AdminResultUser(userCurrent.user_name, userCurrent.password, userCurrent.user_role.value));
        }
        if (resultConts.length !== 0) {
          showPill("successPill", resultConts.length + " users affected!");
        } else {
          showPill("errorPill", "No users affected!");
        }
        sleepSec(5).then(() => silentReload("admin.jsp"));
      }).catch((err) => console.log(err));
    });
  }
}

