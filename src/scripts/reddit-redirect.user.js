// ==UserScript==
// @name         Google Reddit Redirect
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Redirects any Google search starting with "r/" to the corresponding reddit page.
// @author       Mxrc
// @match        *://www.google.com/*
// @icon         https://www.mxrc.cloud/favicon.png
// @updateURL    https://github.com/jynxwk/reddit-redirect/raw/main/src/scripts/reddit_redirect.js
// @downloadURL  https://github.com/jynxwk/reddit-redirect/raw/main/src/scripts/reddit_redirect.js
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
        const originalOpen = XMLHttpRequest.prototype.open;

        XMLHttpRequest.prototype.open = function(method, url) {
            if (url.includes('/search') && method === 'GET') {
                const urlParams = new URLSearchParams(url.split('?')[1]);
                const searchQuery = urlParams.get('q');

                if (searchQuery.startsWith("r/") && !searchQuery.includes(" ")) {
                    window.location.href = `https://reddit.com/${searchQuery}`
                }
            }

            return originalOpen.apply(this, arguments);
        };
})();
