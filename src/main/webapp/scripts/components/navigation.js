import van from '../libs/van-1.5.3.min.js';
const { aside, div, button, nav, a, span } = van.tags;
const { circle, path, svg } = van.tags("http://www.w3.org/2000/svg");

/**
 * @param {string} user_name
 * @param {string} select_mode
 */
export const AsideBlock = (user_name, select_mode) => {
  return aside(
    // company name
    { id: "sidebar", class: "hidden lg:flex flex-col w-64 border-r border-neutral-800 p-4 h-full sticky top-0 overflow-y-auto" },
    div({ class: "text-2xl font-bold mb-8" },
      "Folio",
    ),
    // navigation
    NavBar(select_mode),
    // post button
    button({ class: "mt-6 w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition" },
      "Post",
    ),
    //username
    div({ class: "mt-auto border-t border-neutral-800 pt-4" },
      SideBarUser(user_name)
    )
  )
};

/**
 * @param {string} user_name
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
 * @param {string} uname 
 * @param {string} additional_class
 */
export const PicUser = (uname, additional_class) => {
  const firstLetter = uname.charAt(0).toUpperCase();
  return div({ class: "bg-neutral-700 h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold " + additional_class },
    firstLetter
  )
};

/**
 * @param {boolean} sel
 */
const HomeNav = (sel) => {
  const classText = (sel === true) ? "text-blue-200 font-bold" : "text-white hover:text-blue-300 transition";
  return a({ href: "landing.html", class: "flex items-center space-x-3 " + classText },
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
  return a({ href: "landing.html", class: "flex items-center space-x-3 " + classText },
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
  return a({ href: "landing.html", class: "flex items-center space-x-3 " + classText },
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
  return a({ href: "landing.html", class: "flex items-center space-x-3 " + classText },
    svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
      path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }),
    ),
    span(
      "Help",
    ),
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
    case "henav":
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
