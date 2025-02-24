import { EmailBlock, mainFormDiv, NameBlock, PasswordBlock } from './components/credentials.js';
import { default as axios } from './libs/axios.min.js';
import van from './libs/van-1.5.3.min.js';
import { refreshPage, requestForm, updateLastPathSegment } from './utilities/submit.js';
const { button, div, label, input, p, a } = van.tags


/**
 * @param {HTMLFormElement} mainForm
 */
const SignUpButton = (mainForm) => {
  const mainDat = van.state({data: null, error: null});
  van.derive(() => {
    /** @type {MFormDataResult} */
    const mData = mainDat.val;
    if ((Object.keys(mData).length !== 0) && (typeof mData === 'string' || typeof mData == 'object')) {
      console.log(mData.data);
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
      "Sign Up",
    ),
  )
};

const SignupLink = div(
  p({ class: "text-sm text-center text-gray-100  mb-4" }, "Already have an account?, Login",
    a({
      /**
       * @param {Event} event
       */
      onclick: (event) => {
        event.preventDefault();
        const nextPath = "login.jsp";
        const parserDom = new DOMParser();

        axios.get(nextPath).then((respo) => {
          const docu = parserDom.parseFromString(respo.data, "text/html");
          document.body = docu.body
          updateLastPathSegment(nextPath);
          refreshPage(nextPath);
        }).catch((err) => {
          console.log(err);
        });
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
    van.add(mainFormDiv, EmailBlock);
    van.add(mainFormDiv, PasswordBlock);
    van.add(mainFormDiv, SignUpButton(mainForm));
    van.add(mainFormDiv, SignupLink);
    van.add(mainForm, mainFormDiv);
  }
}

