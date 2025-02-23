import van from '../libs/van-1.5.3.min.js';
const { div, label, input } = van.tags
export const mainFormDiv = div({ class: "space-y-4" });
export const NameBlock = div(
  label({ for: "username", class: "sr-only" },
    "Email",
  ),
  input({ type: "name", id: "username", name: "username", class: "w-full px-4 py-2 text-gray-100 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500", placeholder: "Username" }),
);

export const EmailBlock = div(
  label({ for: "email", class: "sr-only" },
    "Email",
  ),
  input({ type: "email", id: "email", name: "email", class: "w-full px-4 py-2 text-gray-100 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500", placeholder: "Email Address" }),
);

export const PasswordBlock = div(
  label({ for: "password", class: "sr-only" },
    "Password",
  ),
  input({ type: "password", id: "password", name: "password", class: "w-full px-4 py-2 text-gray-100 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500", placeholder: "Password" }),
);
