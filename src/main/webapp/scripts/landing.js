import { PostBlock } from './components/blocks.js';
import { AsideBlock } from './components/navigation.js';
import { BASE_URL_SITE } from './globals.js';
import { default as axios } from './libs/axios.min.js';
import van from './libs/van-1.5.3.min.js';
import { getUserObject } from './utilities/session.js';

/**
 * @param {string} urlStr
 */
export const GetLandingBlock = (urlStr) => {
  if (urlStr.includes("landing")) {
    const mainDiv = document.getElementById("mainContainer");
    const childMainDiv = mainDiv.children;
    const savedNodes = Array.from(childMainDiv);
    mainDiv.innerHTML = '';
    const userName = van.state("null");
    van.add(mainDiv, AsideBlock(userName, "home"));
    getUserObject().then((resp) => {
      userName.val = resp.user_name;
    });

    for (let i = 0; i < savedNodes.length; i++) {
      mainDiv.appendChild(savedNodes[i]);
    }

    const postFeedCon = document.getElementById("postFeedCont");
    //van.add(postFeedCon, PostBlock("Test User", "test message"));


    axios.get(BASE_URL_SITE + "api/feed").then((response) => {
      /** @type {FeedContents[]} */
      const messagesReceive = response.data;
      for (let i = 0; i < messagesReceive.length; i++) {
        van.add(postFeedCon, PostBlock(messagesReceive[i].user_name, messagesReceive[i].post));
      }
    }).catch((err) => {
      console.log(err);
    });

  }
}

