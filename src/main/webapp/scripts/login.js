import van from './libs/van-1.5.3.min.js';
import { refreshPage, requestForm, updateLastPathSegment } from './utilities/submit.js';
const { button, div, label, input, p, a } = van.tags



const mainFormDiv = div({ class: "space-y-4" });
const EmailBlock = div(
  label({ for: "email", class: "sr-only" },
    "Email",
  ),
  input({ type: "email", id: "email", name: "email", class: "w-full px-4 py-2 text-gray-100 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500", placeholder: "Email Address" }),
);

const PasswordBlock = div(
  label({ for: "password", class: "sr-only" },
    "Password",
  ),
  input({ type: "password", id: "password", name: "password", class: "w-full px-4 py-2 text-gray-100 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500", placeholder: "Password" }),
);

/**
 * @param {HTMLFormElement} mainForm
 */
const SignInButton = (mainForm) => {
  const resultDat = van.state({});
  van.derive(() => {
    /** @type {MFormDataResult} */
    const mainData = resultDat.val;
    if (typeof mainData.data === 'object' || typeof mainData.data === 'string') {
      console.log(mainData.data);
    }
  });
  return div(
    button({
      onclick: () => {
        requestForm(mainForm).then((data) => {
          resultDat.val = data
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
      onclick: (event) => {
        event.preventDefault();
        const nextPath = "signup.jsp";
        updateLastPathSegment(nextPath);
        refreshPage(nextPath);
      }, href: "", class: "text-blue-500"
    }, " here.")),
);



/**
 * @param {string} urlStr
 */
export const GetLoginBlock = (urlStr) => {
  if (urlStr.includes("login")) {

    /** @type HTMLFormElement */
    const mainForm = document.getElementById("loginForm");
    van.add(mainFormDiv, EmailBlock);
    van.add(mainFormDiv, PasswordBlock);
    van.add(mainFormDiv, SignInButton(mainForm));
    van.add(mainFormDiv, SignupLink);
    van.add(mainForm, mainFormDiv);
  }
}

