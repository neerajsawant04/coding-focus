// popup.js

// Websites to block
const blockedSites = ["instagram.com", "twitter.com", "facebook.com"];

// Start button click event
document.getElementById('startButton').addEventListener('click', function() {
    const minutes = parseInt(document.getElementById('minutes').value);
    if (isNaN(minutes) || minutes <= 0) {
        alert('Please enter a valid number of minutes.');
        return;
    }

    // Convert minutes to milliseconds
    const timeToBlock = minutes * 60 * 1000;

    // Block sites
    blockSites();

    // Set a timeout to unblock sites after the specified time
    setTimeout(unblockSites, timeToBlock);
});

// Function to block sites
function blockSites() {
    // First, remove any existing rules to avoid conflicts
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2, 3]
    }, () => {
        // Now add the blocking rules with unique integer IDs
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: [
                {
                    id: 1, // Unique integer for rule ID
                    priority: 1,
                    action: { type: 'block' },
                    condition: {
                        urlFilter: "*://*.instagram.com/*",
                        resourceTypes: ["main_frame"]
                    }
                },
                {
                    id: 2, // Unique integer for rule ID
                    priority: 1,
                    action: { type: 'block' },
                    condition: {
                        urlFilter: "*://*.twitter.com/*",
                        resourceTypes: ["main_frame"]
                    }
                },
                {
                    id: 3, // Unique integer for rule ID
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