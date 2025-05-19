// ==UserScript==
// @name         BKS Motors - Show Order Names
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Show order names next to order codes on BKS Motors site
// @match        https://admin.bksmotors.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Your full order code to name mapping here
    const orderMap = {
        "1000000085": "HOA ORDER",
        "7000000035": "ONUR ORDER",
        "1000000089": "ONUR ORDER",
        "7000000032": "BKT BKT",
        "1000007757": "GSP ORDER",
        "1000007729": "GTI ORDER",
        "1000000112": "HC ORDER",
        "1000000118": "MIC ORDER",
        "7000000028": "CHG ORDER",
        // Add all 585 items...
    };

    function enhanceOrderNames() {
        const rows = document.querySelectorAll(".product-t-body tr");
        rows.forEach(row => {
            const cell = row.cells[4]; // Last 5 Orders Price column
            if (!cell || cell.dataset.enhanced === "true") return;

            const html = cell.innerHTML;
            const updated = html.replace(/(\d{10})/g, (match) => {
                const name = orderMap[match.trim()];
                return name ? `${match} <span style="color:green;font-weight:bold;">(${name})</span>` : match;
            });

            cell.innerHTML = updated;
            cell.dataset.enhanced = "true";
        });
    }

    // MutationObserver to detect table changes
    const observer = new MutationObserver(() => {
        const table = document.querySelector(".product-table");
        if (table) {
            setTimeout(enhanceOrderNames, 300); // slight delay to ensure table is ready
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
