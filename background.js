let countdownTimer = null;
let remainingTime = 0; // in milliseconds
let isBlocking = false;

// Listener for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startTimer") {
        startTimer(message.minutes);
        sendResponse({ status: "Timer started" });
    } else if (message.action === "stopTimer") {
        stopTimer();
        sendResponse({ status: "Timer stopped" });
    } else if (message.action === "getTimerStatus") {
        sendResponse({ remainingTime, isBlocking });
    }
});

// Function to start the timer
function startTimer(minutes) {
    if (countdownTimer) {
        clearInterval(countdownTimer);
    }

    remainingTime = minutes * 60 * 1000; // Convert to milliseconds
    isBlocking = true;
    blockSites();

    countdownTimer = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime -= 1000; // Decrease by 1 second
        } else {
            clearInterval(countdownTimer);
            countdownTimer = null;
            isBlocking = false;
            unblockSites();
            showNotification("Congratulations! Time's up!"); // Show notification
        }
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
        isBlocking = false;
        unblockSites();
    }
}

// Function to show a notification
function showNotification(message) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png", // Your icon image path
        title: "Focus Mode",
        message: message,
        priority: 2
    });
}

// Function to block sites
function blockSites() {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2, 3]
    }, () => {
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: [
                {
                    id: 1,
                    priority: 1,
                    action: { type: 'block' },
                    condition: {
                        urlFilter: "*://*.instagram.com/*",
                        resourceTypes: ["main_frame"]
                    }
                },
                {
                    id: 2,
                    priority: 1,
                    action: { type: 'block' },
                    condition: {
                        urlFilter: "*://*.twitter.com/*",
                        resourceTypes: ["main_frame"]
                    }
                },
                {
                    id: 3,
                    priority: 1,
                    action: { type: 'block' },
                    condition: {
                        urlFilter: "*://*.facebook.com/*",
                        resourceTypes: ["main_frame"]
                    }
                }
            ]
        });
    });
}

// Function to unblock sites
function unblockSites() {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2, 3]
    });
}