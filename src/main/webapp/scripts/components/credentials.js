import van from '../libs/van-1.5.3.min.js';
import { requestForm } from '../utilities/submit.js';
const { button, div, label, input } = van.tags


export const mainFormDiv = div({ class: "space-y-4" });
export const NameBlock = div(
  label({ for: "user_name", class: "sr-only" },
    "Username",
  ),
  input({ type: "name", id: "user_name", name: "user_name", class: "w-full px-4 py-2 text-gray-100 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500", placeholder: "Username" }),
);

/**
 * @param {string} identifier
 * @param {string} textInner
 */
export const PasswordBlock = (identifier, textInner) => {
  return div(
    label({ for: identifier, class: "sr-only" },
      textInner,
    ),
    input({ type: "password", id: identifier, name: identifier, class: "w-full px-4 py-2 text-gray-100 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500", placeholder: textInner }),
  )
};


/**
 * @param {HTMLFormElement} mainForm
 * @param {string} textInner
 */
export const SignButton = (mainForm, textInner) => {
  const mainDat = van.state({ data: null, error: null });
  van.derive(() => {
    /** @type {MFormDataResult} */
    const mData = mainDat.val;
    if ((Object.keys(mData).length !== 0) && mData.data !== null && mData.error !== null) {
      const innerData = /** @type {ErrorFolio} */ (mData.data);
      const errBox = document.getElementById("messageBox");
      errBox.innerHTML = '';
      van.add(errBox, ErrorBlock(innerData.isError, innerData.message));
    }
  });
  return div(
    button({
      onclick: () => {
        requestForm(mainForm).then((data) => {
          mainDat.val = data
        });
      }, type: "submit", class: "w-full px-4 py-2 bg-gray-600 text-gray-100 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
    },
      textInner,
    ),
  )
};


/**
 * @param {boolean} err
 * @param {string} message
 */
const ErrorBlock = (err, message) => {
  const colorClass = (err) ? "bg-red-900" : "bg-green-900";
  return div({ id: "errorAlert", class: colorClass + " text-white px-4 py-2 rounded-lg mb-4 text-sm" },
    message,
  )
}
