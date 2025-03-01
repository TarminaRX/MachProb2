<%@page contentType="text/html" pageEncoding="UTF-8" %>
  <%@ page import="net.rnzonly.mtwo.models.UserFolio" %>
    <% UserFolio user=(UserFolio)session.getAttribute("currentUser"); if(user !=null &&
      user.user_role().contains("user")) { response.sendRedirect("landing.jsp"); return; } else if
      (session.getAttribute("currentUser")==null) { response.sendRedirect("login.jsp"); return; } %>
      <!doctype html>
      <html lang="en">

      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Folio Update</title>
        <script src="scripts/libs/tailwind.css.js"></script>
        <script type="module" src="scripts/main.js"></script>
        <script src="scripts/websocket.js"></script>
        <link rel="stylesheet" href="custom/global.css" />
      </head>

      <body class="bg-neutral-900 text-white">
        <script>
          function toggleSidebar() {
            const sidebar = document.getElementById("sidebar");
            sidebar.classList.toggle("hidden");
            sidebar.classList.toggle("lg:flex");
          }
        </script>
        <!-- Main container with full viewport height -->
        <div id="mainContainer" class="flex h-screen w-full relative">
          <!-- Sidebar with lg:flex to show on large screens but hidden by default -->

          <!-- Main content - taking full remaining width and height -->
          <main id="postContainer" class="flex-1 flex flex-col h-full max-w-3xl mx-auto border-x border-neutral-800">
            <!-- Header - fixed at top -->
            <header
              class="sticky top-0 z-10 bg-neutral-900 bg-opacity-90 backdrop-blur-md flex items-center justify-between p-4 border-b border-neutral-800">
              <button class="lg:hidden" onclick="toggleSidebar()">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 class="text-xl font-bold">Update</h1>
              <div class="w-6"></div>
            </header>

            <!-- Form for bulk update -->
            <div id="updateMain" class="flex-1 flex flex-col overflow-hidden">

              <!-- Users list with update fields -->
              <div id="userListUpdate" class="flex-1 overflow-y-auto custom-scrollbar p-4">
                <!-- Table header -->
                <div class="grid grid-cols-4 gap-4 mb-4 font-bold text-neutral-300 border-b border-neutral-800 pb-2">
                  <div>Current Username</div>
                  <div>New Username</div>
                  <div>New Password</div>
                  <div>New Role</div>
                </div>

                <!-- User 1 -->
              </div>

              <!-- Submit Button -->

            </div>


        </main>
        </div>

        <!-- Modern pill-style footer -->
        <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div class="bg-neutral-800 text-neutral-400 text-xs py-2 px-4 rounded-full shadow-lg">
            © 2025 KBE Dev. All rights reserved.
          </div>
        </div>
        <!-- Success Message Pill -->
        <div id="successPill"
          class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-neutral-800 text-white text-sm py-2 px-4 rounded-full shadow-lg flex items-center opacity-0 transition-opacity duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span id="successPill-Message">Post created successfully!</span>
        </div>

        <!-- Error Message Pill -->
        <div id="errorPill"
          class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-neutral-800 text-white text-sm py-2 px-4 rounded-full shadow-lg flex items-center opacity-0 transition-opacity duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span id="errorPill-Message">Server error</span>
        </div>
      </body>

      </html>
