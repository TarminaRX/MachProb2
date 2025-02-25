/**
 * @param {string} path
 */
export function SessionValid(path) {
  const loggedResult = document.getElementById("isLogged")?.innerText.trim();

  if (loggedResult !== null && (path.includes("login") || path.includes("signup")) && loggedResult === "true") {
    window.location.href = "landing.jsp";
  }
}
