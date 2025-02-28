import { BASE_URL_SITE } from '../globals.js';
import { default as axios } from '../libs/axios.min.js';
import van from '../libs/van-1.5.3.min.js';
import { showPill, silentReload, sleepSec } from '../utilities/helper.js';
import { requestForm } from '../utilities/submit.js';
const { button, div, form, h2, input, section } = van.tags
/**
 * @param {string} domid
 */
export const FollowBlock = (domid) => {
  return section({ id: domid, class: "bg-neutral-800 rounded-xl p-4 mb-6" },
    h2({ class: "text-lg font-bold mb-4" },
      "Find Users to Follow",
    ),
    form({ id: "followForm", action: "api/follow", class: "mb-4" },
      input({ class: "hidden", name: "action", value: "follow" }),
      div({ class: "flex" },
        input({ name: "user_name", type: "text", placeholder: "Enter username", class: "flex-1 bg-neutral-700 border border-neutral-600 rounded-l-full py-2 px-4 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" }),
        button({
          onclick: /** @param {Event} event */ (event) => {
            event.preventDefault();
            const mForm = /** @type {HTMLFormElement} */ (document.getElementById("followForm"));
            const relLink = mForm.getAttribute("action");
            requestForm(mForm, BASE_URL_SITE + relLink).then((res) => {
              const resultInner = /** @type {ErrorFolio} */ (res.data)
              if (resultInner.isError === false) {
                showPill("successPill", resultInner.message);
                sleepSec(2).then(() => silentReload("users.jsp"));
              } else {
                showPill("errorPill", resultInner.message);
              }
            })
          }, type: "submit", class: "bg-gray-500 hover:bg-gray-600 transition text-white font-bold py-2 px-4 rounded-r-full"
        },
          "Follow",
        ),
      ),
    ),
    div({ class: "text-neutral-400 text-sm" },
      "Follow for users by typing their username above.",
    ),
  )
};

/**
 * @param {string} username
 */
export const FollowingBlock = (username) => {
  return div({ class: "bg-neutral-800 rounded-xl p-4 mb-3" },
    div({ class: "flex items-center justify-between" },
      div({ class: "flex items-center" },
        div({ class: "bg-neutral-700 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold" },
          username.charAt(0).toUpperCase()
        ),
        div({ class: "ml-3" },
          div({ class: "font-bold" },
            username,
          ),
        ),
      ),
      button({
        onclick: () => {
          axios.post(BASE_URL_SITE + "api/follow", {
            action: "unfollow",
            user_name: username
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
            }).then((response) => {
              /** @type {ErrorFolio} */
              const result = (response.data);
              if (result.isError === false) {
                showPill("successPill", result.message);
                sleepSec(2).then(() => silentReload("users.jsp"));
              }else {
                showPill("errorPill", result.message);
              }
            }).catch((err) => {
              console.log(err);
            });
        }, class: "bg-stone-500 hover:bg-stone-600 text-white text-sm font-bold py-2 px-4 rounded-full transition"
      },
        "Unfollow",
      ),
    ),
  );
};
