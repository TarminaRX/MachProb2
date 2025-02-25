<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home | KBE</title>
    <script src="scripts/libs/tailwind.css.js"></script>
    <script type="module" src="scripts/main.js"></script>
    <link rel="stylesheet" href="custom/global.css" />
    <script>
      function toggleSidebar() {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("hidden");
        sidebar.classList.toggle("lg:flex");
      }
    </script>
  </head>

  <body class="bg-neutral-900 text-white">
    <!-- Main container with full viewport height -->
    <div id="mainContainer" class="flex h-screen w-full relative">
      <!-- Sidebar with lg:flex to show on large screens but hidden by default -->

      <!-- Main content - taking full remaining width and height -->
      <main
        id="postContainer"
        class="flex-1 flex flex-col h-full max-w-3xl mx-auto border-x border-neutral-800"
      >
        <!-- Header - fixed at top -->
        <header
          class="sticky top-0 z-10 bg-neutral-900 bg-opacity-90 backdrop-blur-md flex items-center justify-between p-4 border-b border-neutral-800"
        >
          <button class="lg:hidden" onclick="toggleSidebar()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 class="text-xl font-bold">Home</h1>
          <div class="w-6"></div>
          <!-- Space filler for balance -->
        </header>

        <!-- Post composer -->
        <!-- Posts feed - the only scrollable area -->
        <div id="postFeedCont" class="overflow-y-auto flex-1">
          <!-- Post 1 -->
          <article
            class="border-b border-neutral-800 p-4 hover:bg-neutral-800/50 transition cursor-pointer"
          >
            <div class="flex">
              <div
                class="bg-neutral-700 h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
              >
                J
              </div>
              <div class="ml-3">
                <div class="flex items-center">
                  <span class="font-bold">Jane Doe</span>
                </div>
                <p class="mt-2">
                  Just finished building a new feature for our app! It's amazing how much you can
                  accomplish when you're in the zone. #coding #productivity
                </p>
                <div class="mt-3 flex justify-between text-neutral-500 text-sm">
                  <button class="flex items-center hover:text-blue-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>12</span>
                  </button>
                  <button class="flex items-center hover:text-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span>3</span>
                  </button>
                  <button class="flex items-center hover:text-red-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>24</span>
                  </button>
                  <button class="flex items-center hover:text-blue-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </article>
          <!-- Post 5 -->
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
