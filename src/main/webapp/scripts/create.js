import { AdminCreateBlock, AdminSupportBlock, AdminUserBlock } from './components/management.js';
import { AdminAsideBlock, AsideBlock } from './components/navigation.js';
import { BASE_URL_SITE } from './globals.js';
import { default as axios } from './libs/axios.min.js';
import van from './libs/van-1.5.3.min.js';
import { getUserObject } from './utilities/session.js';
/**
 * @param {string} urlStr
 */
export const GetCreateBlock = (urlStr) => {
  if (urlStr.includes("create")) {
    const mainDiv = document.getElementById("mainContainer");
    const childMainDiv = mainDiv.children;
    const savedNodes = Array.from(childMainDiv);
    mainDiv.innerHTML = '';
    const userName = van.state("null");
    van.add(mainDiv, AdminAsideBlock(userName, "create"));

    for (let i = 0; i < savedNodes.length; i++) {
      mainDiv.appendChild(savedNodes[i]);
    }

    const innerContainer = document.getElementById("postContainer");

    getUserObject().then((resp) => {
      userName.val = resp.user_name;
      van.add(innerContainer, AdminCreateBlock(resp.user_role.value));
    });




  }
}

