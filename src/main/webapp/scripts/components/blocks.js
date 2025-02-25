import van from '../libs/van-1.5.3.min.js';
import { PicUser } from './navigation.js';
const { aside, div, button, nav, p, span, article } = van.tags;
const { circle, path, svg } = van.tags("http://www.w3.org/2000/svg");

export const PostBlock = (name, message) => {
  return article({ class: "border-b border-neutral-800 p-4 hover:bg-neutral-800/50 transition cursor-pointer" },
    div({ class: "flex" },
      PicUser(name, "flex-shrink-0"),
      MessageBlock(name, message)
    ),
  )
};


/**
 * @param {string} user_name
 * @param {string} message
 */
const MessageBlock = (user_name, message) => {
  return div({ class: "ml-3 w-full" },
    div({ class: "flex items-center" },
      span({ class: "font-bold" },
        user_name,
      ),
    ),
    p({ class: "mt-2" },
      message
    ),
    div({ class: "mt-3 flex justify-between text-neutral-500 text-sm" },
      button({ class: "flex items-center hover:text-blue-400" },
        svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-5 w-5 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
          path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }),
        ),
      ),
      button({ class: "flex items-center hover:text-green-400" },
        svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-5 w-5 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
          path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }),
        ),
      ),
      button({ class: "flex items-center hover:text-red-400" },
        svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-5 w-5 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
          path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }),
        ),
      ),
      button({ class: "flex items-center hover:text-blue-400" },
        svg({ xmlns: "http://www.w3.org/2000/svg", class: "h-5 w-5 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
          path({ "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" }),
        ),
      ),
    ),
  )
};
