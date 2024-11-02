let timeSpentOnBlockedSites = 0;
let timeSpentOnProductiveSites = 0;
let currentSite = null;
let timer = null;

// Websites to block
const blockedSites = ["instagram.com", "twitter.com", "facebook.com"];

// Function to determine if a site is blocked
function isBlockedSite(url) {
    return blockedSites.some(site => url.includes(site));
}

// Function to start the timer
function startTimer() {
    if (timer) return; // Prevent multiple timers
    timer = setInterval(() => {
        if (currentSite && isBlockedSite(currentSite)) {
            timeSpentOnBlockedSites += 1; // Increment by 1 minute
        } else {
            timeSpentOnProductiveSites += 1; // Increment by 1 minute
        }
    }, 60000); // Every minute
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timer);
    timer = null;
}

// Monitor tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        currentSite = tab.url;
        if (isBlockedSite(currentSite)) {
            startTimer();
        } else {
            stopTimer();
        }
    }
});

// You can also implement a method to send stats to the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getUsageStats') {
        sendResponse({
            blocked: timeSpentOnBlockedSites,
            productive: timeSpentOnProductiveSites
        });
    }
});