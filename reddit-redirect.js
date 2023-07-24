// ==UserScript==
// @name         Google Reddit Redirect
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Redirect from a r/[slug] search to https://reddit.com/r/[slug]
// @author       Mxrc
// @match        *://www.google.com/*
// @icon         https://www.mxrc.cloud/favicon.png
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
