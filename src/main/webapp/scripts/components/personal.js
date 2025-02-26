import { BASE_URL_SITE } from '../globals.js';
import { default as axios } from '../libs/axios.min.js';
import van from '../libs/van-1.5.3.min.js';
import { showPill, silentReload, sleepSec } from '../utilities/helper.js';
import { getUserObject } from '../utilities/session.js';
import { requestForm } from '../utilities/submit.js';
const { input, div, h2, span, form, textarea, button, article, p } = van.tags
const { circle, path, svg } = van.tags("http://www.w3.org/2000/svg");

/**
 * @param {string} nodeId
 * @param {import('../libs/van-1.5.3.min.js').State<string>} uName
 * @param {import('../libs/van-1.5.3.min.js').State<number>} follows
 */
export const ProfHeader = (nodeId, uName, follows) => {
  return div({ id: nodeId, class: "border-b border-neutral-800" },
    div({ class: "h-32 bg-neutral-800" }
    ),
    div({ class: "px-4 pb-4 relative" },
      div({ class: "flex justify-between" },
        div({ class: "bg-neutral-700 h-20 w-20 rounded-full border-4 border-neutral-900 absolute -mt-10 flex items-center justify-center text-3xl font-bold" },
          van.derive(() => uName.val.charAt(0).toUpperCase()),
        ),
        div({ class: "ml-24 mt-2" },
          h2({ class: "text-xl font-bold" },
            uName,
          ),
        ),
      ),
      div({ class: "flex mt-4 text-neutral-500 text-sm space-x-4" },
        div(
          span({ class: "text-white font-semibold" },
            follows, " "
          ),
          "Following",
        ),
      ),
    ),
  )
};


/**
 * @param {string} nodeId
 * @param {import('../libs/van-1.5.3.min.js').State<string>} uName
*/
export const PostComposer = (nodeId, uName) => {
  const buttonDisabled = van.state(false);
  return div({ id: nodeId, class: "border-b border-neutral-800 p-4" },
    form({ id: "formCompose", action: "api/post", method: "post" },
      div({ class: "flex" },
        div({ class: "bg-neutral-700 h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg font-bold" },
          van.derive(() => uName.val.charAt(0).toUpperCase()),
        ),
        div({ class: "ml-3 flex-1" },
          input({ name: "action", value: "create", class: "hidden" }),
          textarea({ name: "message", placeholder: "What's happening?", class: "bg-transparent w-full resize-none focus:outline-none text-white placeholder-neutral-500", rows: "3" }),
          div({ class: "flex justify-between items-center" },
            div({ class: "flex text-blue-400 space-x-3" }),
            button({
              onclick: /** @param {Event} event */ (event) => {
                event.preventDefault();
                buttonDisabled.val = true;
                const bufForm = /** @type {HTMLFormElement} */(document.getElementById("formCompose"))
                const relLink = bufForm.getAttribute("action");
                requestForm(bufForm, BASE_URL_SITE + relLink).then((resp) => {
                  buttonDisabled.val = false;
                  const dataInner = (typeof resp.data !== 'string') ? /** @type {ErrorFolio} */ (resp.data) : { isError: true, message: "failed" };
                  if (dataInner.isError === false) {
                    showPill("successPill", dataInner.message);
                    sleepSec(2).then(() => silentReload("profile.jsp"));
                  } else {
                    showPill("errorPill", dataInner.message);
                  }
                });
              }, disabled: buttonDisabled, type: "submit", class: "bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition text-sm"
            },
              "Post",
            ),
          ),
        ),
      ),
    ),
  )
}


/**
 * @param {import('../libs/van-1.5.3.min.js').State<string>} uname
 * @param {string} message
 */
export const UserPersonalPost = (uname, message) => {
  return article({ class: "border-b border-neutral-800 p-4 hover:bg-neutral-800/50 transition" },
    div({ class: "flex" },
      div({ class: "bg-neutral-700 h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0" },
        van.derive(() => uname.val.charAt(0).toUpperCase()),
      ),
      div({ class: "ml-3 flex-1" },
        div({ class: "flex justify-between items-start" },
          div({ class: "flex items-center" },
            span({ class: "font-bold" },
              uname,
            ),
          ),
          button({
            onclick: () => {
              axios.post(BASE_URL_SITE + "api/post", {
                action: "delete",
                message: message
              }, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then((resp) => {
                  const response = /** @type {ErrorFolio} */ (resp.data)
                  if (response.isError === false) {
                    showPill("successPill", response.message);
                    sleepSec(2).then(() => silentReload("profile.jsp"));
                    //silentReload("profile.jsp");
                  } else {
                    showPill("errorPill", response.message);
                  }
              }).catch((err) => {
                console.log(err);
              });
            }, class: "text-neutral-500 hover:text-red-500 transition"
          },
            svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
              path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }),
            ),
          ),
        ),
        p({ class: "mt-2" },
          message,
        ),
        div({ class: "mt-3 flex justify-between text-neutral-500 text-sm" },
          button({ class: "flex items-center hover:text-blue-400" },
            svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-5 w-5 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
              path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }),
            ),
          ),
          button({ class: "flex items-center hover:text-green-400" },
            svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-5 w-5 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
              path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }),
            ),
          ),
          button({ class: "flex items-center hover:text-red-400" },
            svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-5 w-5 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
              path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }),
            ),
          ),
          button({ class: "flex items-center hover:text-blue-400" },
            svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-5 w-5 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
              path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" }),
            ),
          ),
        ),
      ),
    ),
  )
}
