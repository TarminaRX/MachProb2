import { BASE_URL_SITE } from '../globals.js';
import van from '../libs/van-1.5.3.min.js';
import { showPill } from '../utilities/helper.js';
import { requestForm } from '../utilities/submit.js';
const { button, div, form, label, textarea, input } = van.tags


/**
 * @param {string} username
 */
export const GetHelpForm = (username) => {
  return div({ id: "helpBlock", class: "bg-neutral-800 rounded-xl p-6 mb-6" },
    form({ action: "api/support", id: "helpForm" },
      input({ name: "user_name", value: username, class: "hidden" }),
      div({ class: "mb-4" },
        label({ for: "message", class: "block text-sm font-medium text-neutral-300 mb-2" },
          "Message",
        ),
        textarea({ id: "message", name: "message", rows: "6", required: "", class: "w-full bg-neutral-700 border border-neutral-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-600 resize-none", placeholder: "Describe your issue in detail..." }),
      ),
      button({
        onclick: /** @param {Event} event */ (event) => {
          event.preventDefault();
          const mainForm = /** @type {HTMLFormElement} */ (document.getElementById("helpForm"));
          const relativeLink = mainForm.getAttribute("action");
          requestForm(mainForm, BASE_URL_SITE + relativeLink).then((resp) => {
            const resultInner = /** @type {ErrorFolio} */(resp.data);
            if (resultInner.isError === false) {
              showPill("successPill", resultInner.message)
            } else {
              showPill("errorPill", resultInner.message);
            }

          });
        }, type: "submit", class: "w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-md transition"
      },
        "Send Message",
      ),
    ),
  );
};
