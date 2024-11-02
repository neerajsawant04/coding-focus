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
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
            const url = new URL(tab.url);
            if (blockedSites.some(site => url.hostname.includes(site))) {
                chrome.tabs.update(tab.id, { url: "about:blank" }); // Redirect to a blank page
            }
        });
    });

    // Add the blocking rules
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
            {
                id: 'block-websites',
                priority: 1,
                action: { type: 'block' },
                condition: {
                    urlFilter: '*://*.instagram.com/*',
                    resourceTypes: ['main_frame'],
                },
            },
            {
                id: 'block-twitter',
                priority: 1,
                action: { type: 'block' },
                condition: {
                    urlFilter: '*://*.twitter.com/*',
                    resourceTypes: ['main_frame'],
                },
            },
            {
                id: 'block-facebook',
                priority: 1,
                action: { type: 'block' },
                condition: {
                    urlFilter: '*://*.facebook.com/*',
                    resourceTypes: ['main_frame'],
                },
            },
        ],
    });
}

// Function to unblock sites
function unblockSites() {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ['block-websites', 'block-twitter', 'block-facebook'],
    });
}