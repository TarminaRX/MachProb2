import { EmailBlock, mainFormDiv, PasswordBlock } from './components/credentials.js';
import { default as axios } from './libs/axios.min.js';
import van from './libs/van-1.5.3.min.js';
import { refreshPage, requestForm, updateLastPathSegment } from './utilities/submit.js';
const { button, div, label, input, p, a } = van.tags



/**
 * @param {HTMLFormElement} mainForm
 */
const SignInButton = (mainForm) => {
  const mainDat = van.state({ data: null, error: null });
  van.derive(() => {
    /** @type {MFormDataResult} */
    const mData = mainDat.val;
    if ((Object.keys(mData).length !== 0) && (typeof mData.data === 'string' || typeof mData.data == 'object')) {
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
      "Sign In",
    ),
  )
};

const SignupLink = div(
  p({ class: "text-sm text-center text-gray-100  mb-4" }, "Don't have an account?, Signup",
    a({
      /**
       * @param {Event} event
       */
      onclick: async (event) => {
        event.preventDefault();
        const nextPath = "signup.jsp";
        const parserDom = new DOMParser();

        axios.get(nextPath).then((respo) => {
          const docu = parserDom.parseFromString(respo.data, "text/html");
          document.body = docu.body
          updateLastPathSegment(nextPath);
          refreshPage(nextPath);
        }).catch((err) => {
          console.log(err);
        });

      }, href: "", class: "text-blue-500"
    }, " here.")),
);



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

/**
 * @param {string} urlStr
 */
export const GetLoginBlock = (urlStr) => {
  if (urlStr.includes("login")) {

    const mainForm = /** @type HTMLFormElement */ (document.getElementById("loginForm"));
    mainFormDiv.innerHTML = '';
    mainForm.innerHTML = '';

    //const errBox = document.getElementById("errorBox");
    //errBox.innerHTML = '';
    //van.add(errBox, ErrorBlock());

    van.add(mainFormDiv, EmailBlock);
    van.add(mainFormDiv, PasswordBlock);
    van.add(mainFormDiv, SignInButton(mainForm));
    van.add(mainFormDiv, SignupLink);

    van.add(mainForm, mainFormDiv);
  }
}

