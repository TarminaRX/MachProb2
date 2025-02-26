import { mainFormDiv, NameBlock, PasswordBlock, SignButton } from './components/credentials.js';
import { default as axios } from './libs/axios.min.js';
import van from './libs/van-1.5.3.min.js';
import { silentReload } from './utilities/helper.js';
import { refreshPage, requestForm, updateLastPathSegment } from './utilities/submit.js';
const { button, div, label, input, p, a } = van.tags


const SignupLink = div(
  p({ class: "text-sm text-center text-gray-100  mb-4" }, "Don't have an account?, Signup",
    a({
      /**
       * @param {Event} event
       */
      onclick: async (event) => {
        event.preventDefault();
        const nextPath = "signup.jsp";
        silentReload(nextPath);
      }, href: "", class: "text-blue-500"
    }, " here.")),
);



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

    van.add(mainFormDiv, NameBlock);
    van.add(mainFormDiv, PasswordBlock("password", "Password"));
    van.add(mainFormDiv, SignButton(mainForm, "Sign In"));
    van.add(mainFormDiv, SignupLink);

    van.add(mainForm, mainFormDiv);
  }
}

