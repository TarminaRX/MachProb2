import { PostBlock } from './components/blocks.js';
import { AsideBlock } from './components/navigation.js';
import van from './libs/van-1.5.3.min.js';

/**
 * @param {string} urlStr
 */
export const GetLandingBlock = (urlStr) => {
  if (urlStr.includes("landing")) {
    const mainDiv = document.getElementById("mainContainer");
    const childMainDiv = mainDiv.children;
    const savedNodes = Array.from(childMainDiv);
    mainDiv.innerHTML = '';
    van.add(mainDiv, AsideBlock("username", "home"));

    for (let i = 0; i < savedNodes.length; i++) {
      //console.log(savedNodes[i]);
      //console.log(savedNodes[i].nodeName === "MAIN");
      mainDiv.appendChild(savedNodes[i]);
    }

    const postFeedCon = document.getElementById("postFeedCont");
    van.add(postFeedCon, PostBlock("Test User", "test message"));

  }
}

