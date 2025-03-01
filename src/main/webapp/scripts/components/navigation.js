import { BASE_URL_SITE } from '../globals.js';
import { default as axios } from '../libs/axios.min.js';
import van from '../libs/van-1.5.3.min.js';
import { showPill, silentReload, sleepSec } from '../utilities/helper.js';
import { getUserObject } from '../utilities/session.js';
const { aside, div, button, nav, a, span } = van.tags;
const { circle, path, svg } = van.tags("http://www.w3.org/2000/svg");

/**
 * @param {import('../libs/van-1.5.3.min.js').State<string>} username
 * @param {string} select_mode
 */
export const AsideBlock = (username, select_mode) => {
  return aside(
    // company name
    { id: "sidebar", class: "hidden lg:flex flex flex-col w-64 border-r border-neutral-800 p-4 h-full sticky top-0 overflow-y-auto" },
    div({ class: "text-2xl font-bold mb-8" },
      "Folio",
    ),
    // navigation
    NavBar(select_mode),
    div({ class: "flex-1" }),
    // logout button
    button({ onclick: () => {
      axios.get(BASE_URL_SITE + "api/logout").then((response) => {
        const resultInner = /** @type {ErrorFolio} */ (response.data);
        if (resultInner.isError === false) {
          showPill("successPill", resultInner.message);
          sleepSec(3).then(() => silentReload("login.jsp"));
        } else {
          showPill("errorPill", resultInner.message);
          sleepSec(3).then(() => silentReload("login.jsp"));
        }
      }).catch((err) => console.log(err));
    }, class: "mt-6 w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition" },
      "Logout",
    ),
    //username
    div({ class: "mt-auto border-t border-neutral-800 pt-4" },
      SideBarUser(username)
    )
  )
};


/**
 * @param {import('../libs/van-1.5.3.min.js').State<string>} username
 * @param {string} select_mode
 */
export const AdminAsideBlock = (username, select_mode) => {
  return aside(
    // company name
    { id: "sidebar", class: "hidden lg:flex flex flex-col w-64 border-r border-neutral-800 p-4 h-full sticky top-0 overflow-y-auto" },
    div({ class: "text-2xl font-bold mb-8" },
      "Folio",
    ),
    // navigation
    AdminNavBar(select_mode),
    // post button
    
    div({ class: "flex-1" }),
    button({ onclick: () => {
      axios.get(BASE_URL_SITE + "api/logout").then((response) => {
        const resultInner = /** @type {ErrorFolio} */ (response.data);
        if (resultInner.isError === false) {
          showPill("successPill", resultInner.message);
          sleepSec(3).then(() => silentReload("login.jsp"));
        } else {
          showPill("errorPill", resultInner.message);
          sleepSec(3).then(() => silentReload("login.jsp"));
        }
      }).catch((err) => console.log(err));
    }, class: "mt-6 w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition" },
      "Logout",
    ),
    //username
    div({ class: "mt-auto border-t border-neutral-800 pt-4" },
      SideBarUser(username)
    )
  )
};

/**
 * @param {import('../libs/van-1.5.3.min.js').State<string>} user_name
 */
const SideBarUser = (user_name) => {
  return div({ class: "flex items-center" },
    PicUser(user_name, ""),
    div({ class: "ml-3" },
      div({ class: "font-bold" },
        user_name,
      ),
    ),
  )
};

/**
 * @param {string | import('../libs/van-1.5.3.min.js').State<string>} uname 
 * @param {string} additional_class
 */
export const PicUser = (uname, additional_class) => {
  /** @type {string | import('../libs/van-1.5.3.min.js').State<string> } */
  let firstLetter;
  if (typeof uname === "string") {
    firstLetter = uname.charAt(0).toUpperCase();
  } else {
    firstLetter = van.derive(() => uname.val.charAt(0).toUpperCase());
  }
  return div({ class: "bg-neutral-700 h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold " + additional_class },
    firstLetter
  );
};

/**
 * @param {boolean} sel
 */
const HomeNav = (sel) => {
  const classText = (sel === true) ? "text-blue-200 font-bold" : "text-white hover:text-blue-300 transition";
  return a({ onclick: () => silentReload("landing.jsp"), href: "#", class: "flex items-center space-x-3 " + classText },
    svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
      path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }),
    ),
    span(
      "Home",
    ),
  )
};

/**
 * @param {boolean} sel
 */
const ProfileNav = (sel) => {
  const classText = (sel === true) ? "text-blue-200 font-bold" : "text-white hover:text-blue-300 transition";
  return a({ onclick: () => silentReload("profile.jsp"), href: "#", class: "flex items-center space-x-3 " + classText },
    svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
      path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }),
    ),
    span(
      "Profile",
    ),
  )
};
/**
 * @param {boolean} sel
 */
const UsersNav = (sel) => {
  const classText = (sel === true) ? "text-blue-200 font-bold" : "text-white hover:text-blue-300 transition";
  return a({ onclick: () => silentReload("users.jsp"), href: "#", class: "flex items-center space-x-3 " + classText },
    svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
      path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }),
    ),
    span(
      "Users",
    ),
  )
};
/**
 * @param {boolean} sel
 */
const HelpNav = (sel) => {
  const classText = (sel === true) ? "text-blue-200 font-bold" : "text-white hover:text-blue-300 transition";
  return a({ onclick: () => silentReload("help.jsp"), href: "#", class: "flex items-center space-x-3 " + classText },
    svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
      path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }),
    ),
    span(
      "Help",
    ),
  )
};

/**
 * @param {boolean} sel
 */
const AdminNav = (sel) => {
  const classText = (sel === true) ? "text-blue-200 font-bold" : "text-white hover:text-blue-300 transition";
  return a({ onclick: () => silentReload("admin.jsp"), href: "#", class: "flex items-center space-x-3 " + classText },
    svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
      path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }),
    ),
    span(
      "Admin",
    ),
  )
};

/**
 * @param {boolean} sel
 */
const CreateNav = (sel) => {
  const classText = (sel === true) ? "text-blue-200 font-bold" : "text-white hover:text-blue-300 transition";
  return a({ onclick: () => silentReload("create.jsp"), href: "#", class: "flex items-center space-x-3 " + classText },
    svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
      path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M12 6v6m0 0v6m0-6h6m-6 0H6" }),
    ),
    span(
      "Create",
    ),
  )
};

/**
 * @param {boolean} sel
 */
const UpdateNav = (sel) => {
  const classText = (sel === true) ? "text-blue-200 font-bold" : "text-white hover:text-blue-300 transition";
  return a({ onclick: () => silentReload("update.jsp"), href: "#", class: "flex items-center space-x-3 " + classText },
    svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
      path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }),
    ),
    span(
      "Update",
    ),
  )
};

/**
 * @param {boolean} sel
 */
const DeleteNav = (sel) => {
  const classText = (sel === true) ? "text-blue-200 font-bold" : "text-white hover:text-blue-300 transition";
  return a({ onclick: () => silentReload("delete.jsp"), href: "#", class: "flex items-center space-x-3 " + classText },
    svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
      path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }),
    ),
    span(
      "Delete",
    ),
  )
};


/**
 * @param {string} selected_node -
 */
const AdminNavBar = (selected_node) => {
  /** @type boolean */
  let hnav, pnav, unav, henav = false;
  switch (selected_node) {
    case "admin":
      hnav = true;
      break;
    case "create":
      pnav = true;
      break;
    case "update":
      unav = true;
      break;
    case "delete":
      henav = true;
      break;
  }

  return nav(
    { class: "space-y-6 mt-4" },
    AdminNav(hnav),
    CreateNav(pnav),
    UpdateNav(unav),
    DeleteNav(henav)
  )
};

/**
 * @param {string} selected_node -
 */
const NavBar = (selected_node) => {
  /** @type boolean */
  let hnav, pnav, unav, henav = false;
  switch (selected_node) {
    case "home":
      hnav = true;
      break;
    case "profile":
      pnav = true;
      break;
    case "users":
      unav = true;
      break;
    case "help":
      henav = true;
      break;
  }

  return nav(
    { class: "space-y-6 mt-4" },
    HomeNav(hnav),
    ProfileNav(pnav),
    UsersNav(unav),
    HelpNav(henav)
  )
};
