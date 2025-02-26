import { PostBlock } from './components/blocks.js';
import { AsideBlock } from './components/navigation.js';
import { PostComposer, ProfHeader, UserPersonalPost } from './components/personal.js';
import { BASE_URL_SITE } from './globals.js';
import { default as axios } from './libs/axios.min.js';
import van from './libs/van-1.5.3.min.js';
import { getUserObject } from './utilities/session.js';

/**
 * @param {string} urlStr
 */
export const GetProfileBlock = (urlStr) => {
  if (urlStr.includes("profile")) {
    const mainDiv = document.getElementById("mainContainer");
    const childMainDiv = mainDiv.children;
    const savedNodes = Array.from(childMainDiv);
    mainDiv.innerHTML = '';
    const userName = van.state("null");
    const following = van.state(0);
    van.add(mainDiv, AsideBlock(userName, "profile"));

    for (let i = 0; i < savedNodes.length; i++) {
      mainDiv.appendChild(savedNodes[i]);
    }

    van.hydrate(document.getElementById("profHeader"), dom => ProfHeader(dom.id, userName, following));
    van.hydrate(document.getElementById("composePost"), dom => PostComposer(dom.id, userName));
    getUserObject().then((resp) => {
      userName.val = resp.user_name;
      following.val = Object.keys(resp.follows).length
      const postFeedCon = document.getElementById("postFeedCont");
      for (const keyMessage of Object.keys(resp.posts).reverse()) {
        van.add(postFeedCon, UserPersonalPost(userName, resp.posts[keyMessage]));
      }
    });



  }
}

