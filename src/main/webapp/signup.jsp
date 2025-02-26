<%@page contentType="text/html" pageEncoding="UTF-8" %>
  <!doctype html>
  <html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="scripts/libs/tailwind.css.js"></script>
    <title>Folio Signup</title>
    <script type="module" src="scripts/main.js"></script>
    <script src="scripts/websocket.js"></script>
    <link rel="stylesheet" href="custom/global.css" />
  </head>

  <body class="dark:bg-neutral-900 w-dvw h-dvh flex flex-col items-center justify-center min-h-screen">
    <main class="w-full max-w-lg">
      <div id="isLogged" class="hidden">
        ${sessionScope.currentUser != null ? "true" : "false"}
      </div>
      <div class="bg-neutral-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 class="text-2xl text-center text-gray-100 font-bold mb-6">Register</h2>
        <div id="messageBox">
        </div>
        <form id="signupForm" action="api/signup" method="post">
          <!--      SIGNUP BLOCK HERE      -->
        </form>
      </div>
    </main>
    <footer class="mt-8 text-center text-gray-400">
      <p>&copy; 2025 kbe Dev. All rights reserved.</p>
    </footer>
  </body>

  </html>
