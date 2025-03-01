import { AdminCreateBlock, AdminDeleteButton, AdminDeleteUser, AdminSupportBlock, AdminUserBlock } from './components/management.js';
import { AdminAsideBlock, AsideBlock } from './components/navigation.js';
import { BASE_URL_SITE } from './globals.js';
import { default as axios } from './libs/axios.min.js';
import van from './libs/van-1.5.3.min.js';
import { getUserObject } from './utilities/session.js';
/**
 * @param {string} urlStr
 */
export const GetDeleteBlock = (urlStr) => {
  if (urlStr.includes("delete")) {
    const mainDiv = document.getElementById("mainContainer");
    const childMainDiv = mainDiv.children;
    const savedNodes = Array.from(childMainDiv);
    mainDiv.innerHTML = '';
    const userName = van.state("null");
    van.add(mainDiv, AdminAsideBlock(userName, "delete"));

    for (let i = 0; i < savedNodes.length; i++) {
      mainDiv.appendChild(savedNodes[i]);
    }

    const innerContainer = document.getElementById("bulk-delete-form");

    getUserObject().then((resp) => {
      userName.val = resp.user_name;
      axios.get(BASE_URL_SITE + "api/list").then((resp2) => {
        const userObj = /** @type {UserContentLite[]} */  (resp2.data);
        for (let i = 0; i < userObj.length; i++) {
          const userCurrent = userObj[i];
          van.add(innerContainer, AdminDeleteUser(userCurrent.user_name, userCurrent.user_role.value));
        }
        van.add(innerContainer, AdminDeleteButton());
      }).catch((err) => {
        console.log(err);
      });
    });




  }
}

