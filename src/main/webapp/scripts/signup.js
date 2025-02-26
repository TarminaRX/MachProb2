import { mainFormDiv, NameBlock, PasswordBlock, SignButton } from './components/credentials.js';
import { default as axios } from './libs/axios.min.js';
import van from './libs/van-1.5.3.min.js';
import { silentReload } from './utilities/helper.js';
import { refreshPage, requestForm, updateLastPathSegment } from './utilities/submit.js';
const { button, div, label, input, p, a } = van.tags


const SignupLink = div(
  p({ class: "text-sm text-center text-gray-100  mb-4" }, "Already have an account?, Login",
    a({
      /**
       * @param {Event} event
       */
      onclick: (event) => {
        event.preventDefault();
        const nextPath = "login.jsp";
        silentReload(nextPath);
        //updateLastPathSegment(nextPath);
        //refreshPage(nextPath);
      }, href: "", class: "text-blue-500"
    }, " here.")),
);



/**
 * @param {string} urlStr
 */
export const GetSignupBlock = (urlStr) => {
  if (urlStr.includes("signup")) {

    const mainForm = /** @type HTMLFormElement */ (document.getElementById("signupForm"));
    mainFormDiv.innerHTML = '';
    mainForm.innerHTML = '';
    van.add(mainFormDiv, NameBlock);
    van.add(mainFormDiv, PasswordBlock("password", "Password"));
    van.add(mainFormDiv, PasswordBlock("password2", "Confirm Password"));
    van.add(mainFormDiv, SignButton(mainForm, "Sign Up"));
    van.add(mainFormDiv, SignupLink);
    van.add(mainForm, mainFormDiv);
  }
}

