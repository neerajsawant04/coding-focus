// Background script for managing focus timer and blocking/unblocking websites

chrome.runtime.onInstalled.addListener(() => {
    console.log("Focus Mode extension installed.");
});

// Listen for messages from popup.js to start and stop the focus timer
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startFocus") {
        const duration = message.duration;
        startBlocking(duration);
        sendResponse({ status: "Blocking started for " + duration + " minutes." });
    } else if (message.action === "stopFocus") {
        stopBlocking();
        sendResponse({ status: "Blocking stopped." });
    }
});

// Function to start blocking websites
function startBlocking(duration) {
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
            {
                id: 1,
                priority: 1,
                action: { type: "block" },
                condition: {
                    urlFilter: "*://*.instagram.com/*",
                    resourceTypes: ["main_frame"]
                }
            },
            {
                id: 2,
                priority: 1,
                action: { type: "block" },
                condition: {
                    urlFilter: "*://*.twitter.com/*",
                    resourceTypes: ["main_frame"]
                }
            },
            {
                id: 3,
                priority: 1,
                action: { type: "block" },
                condition: {
                    urlFilter: "*://*.facebook.com/*",
                    resourceTypes: ["main_frame"]
                }
            }
        ]
    }, () => {
        console.log("Blocking rules applied.");

        // Set a timeout to stop blocking after the specified duration
        setTimeout(() => {
            stopBlocking();
        }, duration * 60 * 1000); // Convert minutes to milliseconds
    });
}

// Function to stop blocking websites
function stopBlocking() {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2, 3]
    }, () => {
        console.log("Blocking rules removed.");
    });
}