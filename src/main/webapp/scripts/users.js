import { PostBlock } from './components/blocks.js';
import { FollowBlock, FollowingBlock } from './components/following.js';
import { AsideBlock } from './components/navigation.js';
import { PostComposer, ProfHeader, UserPersonalPost } from './components/personal.js';
import { BASE_URL_SITE } from './globals.js';
import { default as axios } from './libs/axios.min.js';
import van from './libs/van-1.5.3.min.js';
import { getUserObject } from './utilities/session.js';

/**
 * @param {string} urlStr
 */
export const GetUsersBlock = (urlStr) => {
  if (urlStr.includes("users")) {
    const mainDiv = document.getElementById("mainContainer");
    const childMainDiv = mainDiv.children;
    const savedNodes = Array.from(childMainDiv);
    mainDiv.innerHTML = '';
    const userName = van.state("null");
    van.add(mainDiv, AsideBlock(userName, "users"));

    for (let i = 0; i < savedNodes.length; i++) {
      mainDiv.appendChild(savedNodes[i]);
    }
    
    const fbMain = document.getElementById("followingBlockMain");
    //
    van.hydrate(document.getElementById("followUserBlock"), dom => FollowBlock(dom.id));
    //van.hydrate(document.getElementById("composePost"), dom => PostComposer(dom.id, userName));
    getUserObject().then((resp) => {
      userName.val = resp.user_name;
      for (const num of Object.keys(resp.follows)) {
        van.add(fbMain, FollowingBlock(resp.follows[num]));
      }
    });



  }
}

