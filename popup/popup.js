// List of websites to block (adjust or add as needed)
const blockedSites = ["instagram.com", "twitter.com", "facebook.com"];

// Handle Start button click
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
    // Remove any existing rules with the specified IDs to avoid conflicts
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2, 3]
    }, () => {
        // Define blocking rules
        const rules = [
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
        ];

        // Add the rules for blocking websites
        chrome.declarativeNetRequest.updateDynamicRules({ addRules: rules }, () => {
            console.log("Blocking rules applied.");
        });
    });
}

// Function to unblock sites
function unblockSites() {
    // Remove the rules with specified IDs to unblock the sites
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2, 3]
    }, () => {
        console.log("Blocking rules removed.");
    });
}