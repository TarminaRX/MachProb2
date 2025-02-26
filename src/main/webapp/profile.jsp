<%@page contentType="text/html" pageEncoding="UTF-8" %>
  <!doctype html>
  <html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Folio Profile</title>
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
          <h1 class="text-xl font-bold">Home</h1>
          <div class="w-6"></div>
          <!-- Space filler for balance -->
        </header>

        <!-- Post composer -->
        <!-- Posts feed - the only scrollable area -->
        <div id="postFeedCont" class="overflow-y-auto flex-1">
        </div>
      </main>
    </div>

    <!-- Modern pill-style footer -->
    <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
      <div class="bg-neutral-800 text-neutral-400 text-xs py-2 px-4 rounded-full shadow-lg">
        © 2025 KBE Dev. All rights reserved.
      </div>
    </div>
  </body>

  </html>
