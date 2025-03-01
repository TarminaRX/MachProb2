import { BASE_URL_SITE } from '../globals.js';
import van from '../libs/van-1.5.3.min.js';
import { showPill, silentReload, sleepSec } from '../utilities/helper.js';
import { requestForm } from '../utilities/submit.js';
const { button, div, form, input, label, option, select, p, span } = van.tags

/**
 * @param {string} username
 * @param {string} user_role
 */
export const AdminUserBlock = (username, user_role) => {
  let userRoleParsed = "";
  switch (user_role) {
    case "admin":
      userRoleParsed = "Admin";
      break;
    case "user":
      userRoleParsed = "User";
      break;
    case "super_admin":
      userRoleParsed = "Super Admin";
      break;
  }
  return div({ class: "flex items-center justify-between border-b border-neutral-700 pb-2" },
    div(
      div({ class: "font-bold" },
        username,
      ),
    ),
    div({ class: "text-neutral-400 text-sm" },
      userRoleParsed,
    ),
  );
};

/**
 * @param {string} username
 * @param {string} message
 */
export const AdminSupportBlock = (username, message) => {
  return div({ class: "border border-neutral-700 p-3 rounded-lg bg-neutral-800" },
    div({ class: "font-bold" },
      username,
    ),
    p({ class: "mt-2" },
      message,
    ),
  )
}

/**
 * @param {string} user_role
 */
export const AdminCreateBlock = (user_role) => {
  return div({ class: "flex-1 p-4 overflow-y-auto custom-scrollbar" },
    form({ id: "createForm", class: "space-y-6" },
      div(
        label({ for: "user_name", class: "block text-sm font-medium text-neutral-300" },
          "Username",
        ),
        input({ type: "text", id: "user_name", name: "user_name", required: "", class: "mt-1 block w-full bg-neutral-700 border border-neutral-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white p-3 text-lg" }),
      ),
      div(
        label({ for: "password", class: "block text-sm font-medium text-neutral-300" },
          "Password",
        ),
        input({ type: "password", id: "password", name: "password", required: "", class: "mt-1 block w-full bg-neutral-700 border border-neutral-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white p-3 text-lg" }),
      ),
      div(
        label({ for: "user_role", class: "block text-sm font-medium text-neutral-300" },
          "User Role",
        ),
        select({ id: "user_role", name: "user_role", required: "", class: "mt-1 block w-full bg-neutral-700 border border-neutral-600 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 text-white p-3 text-lg" },
          (user_role === "super_admin") ? option({ value: "super_admin" },
            "Super Admin",
          ) : null,
          (user_role === "super_admin") ? option({ value: "admin" },
            "Admin",
          ) : null,
          option({ value: "user" },
            "Regular User",
          ),
        ),
      ),
      div(
        button({
          onclick: /** @param {Event} event */ (event) => {
            event.preventDefault();
            const cForm = /** @type {HTMLFormElement} */ (document.getElementById("createForm"));
            requestForm(cForm, BASE_URL_SITE + "api/create").then((res) => {
              const innerRes = /** @type {ErrorFolio} */(res.data);
              if (innerRes.isError === false) {
                showPill("successPill", innerRes.message);
                sleepSec(2).then(() => silentReload("admin.jsp"));
              } else {
                showPill("errorPill", innerRes.message);
              }
            }).catch((err) => {
              console.log(err);
            });

          }, type: "submit", class: "w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition"
        },
          "Create User",
        ),
      ),
    ),
  );
}

/**
 * @param {UserContentLite[]} updateContents
 */
export const AdminUpdateBlock = (updateContents) => {
  return div({ class: "p-4 border-t border-neutral-800 bg-neutral-900" },
    button({
      onclick: async () => {
        let counter = 0;
        for (let i = 0; i < updateContents.length; i++) {
          const nameUser = updateContents[i].user_name
          const currentForm = /** @type {HTMLFormElement} */ (document.getElementById(nameUser));
          const rela = currentForm.getAttribute("action");

          const nameChanged = /** @type {HTMLInputElement} */ (document.getElementById(nameUser + "_name"));
          const passChanged = /** @type {HTMLInputElement} */ (document.getElementById(nameUser + "_pass"));
          const roleChanged = /** @type {HTMLInputElement} */ (document.getElementById(nameUser + "_role"));

          if (nameChanged.value.length !== 0 || passChanged.value.length !== 0 || roleChanged.value.length !== 0) {
            const resp = await requestForm(currentForm, BASE_URL_SITE + rela)
            const resultInner = /** @type {ErrorFolio} */(resp.data);
            if (resultInner.isError === false) {
              counter++;
            }
          }
        }
        if (counter >= 1) {
          showPill("successPill", "Successfully updated " + counter + " users!");
          sleepSec(3).then(() => silentReload("result.jsp"));
        } else {
          showPill("errorPill", "Didn't update any users!");
        }
      }, class: "w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md transition"
    },
      "Update Users",
    ),
  )
};

/**
 * @param {string} editUser
 * @param {string} curUserRole
 */
export const AdminUpdateForm = (editUser, curUserRole) => {
  return form({ id: editUser, action: "api/update", class: "grid grid-cols-4 gap-4 mb-6 items-center" },
    div({ class: "flex flex-col" },
      span({ class: "font-bold" },
        editUser,
      ),
    ),
    input({ name: "old_user_name", value: editUser, class: "hidden" }),
    div(
      input({ type: "text", id: editUser + "_name", name: "user_name", placeholder: "New Username", class: "w-full bg-neutral-800 border border-neutral-700 rounded p-2 focus:outline-none focus:border-blue-500 text-white" }),
    ),
    div(
      input({ type: "password", id: editUser + "_pass", name: "password", placeholder: "New Password", class: "w-full bg-neutral-800 border border-neutral-700 rounded p-2 focus:outline-none focus:border-blue-500 text-white" }),
    ),
    div(
      select({ name: "user_role", id: editUser + "_role", class: "w-full bg-neutral-800 border border-neutral-700 rounded p-2 focus:outline-none focus:border-blue-500 text-white" },
        option({ value: "" },
          "Select Role",
        ),
        (curUserRole === "super_admin") ? option({ value: "super_admin" },
          "Super Admin",
        ) : null,
        (curUserRole === "super_admin") ? option({ value: "admin" },
          "Admin",
        ) : null,
        option({ value: "user" },
          "Regular User",
        ),
      ),
    ),
  )
};



export const AdminDeleteButton = () => {
  return div({ class: "bg-neutral-800 p-4 border-b border-neutral-700 flex items-center justify-between" },
    div({ class: "flex items-center" },
      input({
        type: "checkbox", id: "select-all", class: "mr-3 h-5 w-5 rounded accent-blue-500", onchange: () => {
          const mainCheckbox = /** @type {HTMLInputElement} */ (document.getElementById('select-all'));
          const checkboxes = /** @type {NodeListOf<HTMLInputElement>} */ (document.querySelectorAll('.user-checkbox'));
          checkboxes.forEach(checkbox => {
            checkbox.checked = mainCheckbox.checked;
          });
        }
      }),
      label({ for: "select-all", class: "text-sm text-neutral-300" },
        "Select All",
      ),
    ),
    button({
      onclick: /** @param {Event} event */ (event) => {
        event.preventDefault();
        const deleteForm = /** @type {HTMLFormElement} */(document.getElementById("bulk-delete-form"));
        requestForm(deleteForm, BASE_URL_SITE + "api/delete").then((res) => {
          const resultInner = /** @type {ErrorFolio} */(res.data);
          if (resultInner.isError === false) {
            showPill("successPill", resultInner.message);
            sleepSec(3).then(() => silentReload("result.jsp"));
          } else {
            showPill("errorPill", resultInner.message);
          }
        });
      }, type: "submit", class: "bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md text-sm transition"
    },
      "Delete Selected",
    ),
  )
}

/**
 * @param {string} username
 * @param {string} role
 */
export const AdminDeleteUser = (username, role) => {
  let parsedRole = '';
  switch (role) {
    case "admin":
      parsedRole = "Admin";
      break;
    case "super_admin":
      parsedRole = "Super Admin";
      break;
    case "user":
      parsedRole = "Regular User";
      break;
  }
  return div({ class: "flex items-center justify-between p-4 border-b border-neutral-700 hover:bg-neutral-800/50 transition" },
    div({ class: "flex items-center flex-1" },
      input({ type: "checkbox", name: "selected_users[]", value: username, class: "user-checkbox mr-4 h-5 w-5 rounded accent-blue-500" }),
      div(
        div({ class: "font-medium" },
          username,
        ),
        div({ class: "text-neutral-400 text-sm" },
          parsedRole,
        ),
      ),
    ),
  )
}



/**
 * @param {string} username
 * @param {string} pass
 * @param {string} role
 */
export const AdminResultUser = (username, pass, role) => {
  return div({ class: "mb-6 p-4 bg-neutral-800 rounded-lg" },
    div({ class: "grid grid-cols-3 gap-4" },
      div(
        div({ class: "text-sm text-neutral-400" },
          "Username",
        ),
        div({ class: "flex items-center" },
          span(
            username,
          ),
        ),
      ),
      div(
        div({ class: "text-sm text-neutral-400" },
          "Password",
        ),
        div({ class: "flex items-center" },
          span(
            pass,
          ),
        ),
      ),
      div(
        div({ class: "text-sm text-neutral-400" },
          "Role",
        ),
        div({ class: "flex items-center" },
          span(
            role,
          ),
        ),
      ),
    ),
  )
}
