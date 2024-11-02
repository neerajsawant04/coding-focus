// content.js

const blockedSites = ["facebook.com", "twitter.com", "instagram.com"];

chrome.storage.local.get("isFocusModeOn", (data) => {
    if (data.isFocusModeOn) {
        blockedSites.forEach((site) => {
            if (window.location.href.includes(site)) {
                document.body.innerHTML = "<h1>Focus Mode Active. Site Blocked!</h1>";
                document.body.style.textAlign = "center";
                document.body.style.fontFamily = "Arial, sans-serif";
                document.body.style.color = "#ff4d4d";
            }
        });
    }
});