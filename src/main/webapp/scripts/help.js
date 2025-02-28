import { FollowBlock, FollowingBlock } from './components/following.js';
import { AsideBlock } from './components/navigation.js';
import { GetHelpForm } from './components/support.js';
import van from './libs/van-1.5.3.min.js';
import { getUserObject } from './utilities/session.js';

/**
 * @param {string} urlStr
 */
export const GetHelpBlock = (urlStr) => {
  if (urlStr.includes("help")) {
    const mainDiv = document.getElementById("mainContainer");
    const childMainDiv = mainDiv.children;
    const savedNodes = Array.from(childMainDiv);
    mainDiv.innerHTML = '';
    const userName = van.state("null");
    van.add(mainDiv, AsideBlock(userName, "help"));

    for (let i = 0; i < savedNodes.length; i++) {
      mainDiv.appendChild(savedNodes[i]);
    }
    
    const hMain = document.getElementById("helpContent");
    //
    getUserObject().then((resp) => {
      userName.val = resp.user_name;
      van.add(hMain, GetHelpForm(userName.val));
    });



  }
}

