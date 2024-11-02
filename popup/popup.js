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

    // Start the countdown timer
    startCountdown(timeToBlock);
});

// Function to start the countdown
function startCountdown(duration) {
    const timerDisplay = document.getElementById('timerDisplay'); // Get the timer display element
    let remainingTime = duration;

    // Save the timer state in storage
    chrome.storage.local.set({ remainingTime, isBlocking: true });

    // Update display immediately
    updateTimerDisplay(timerDisplay, remainingTime);

    const countdownInterval = setInterval(() => {
        remainingTime -= 1000; // Decrease the remaining time by 1 second

        // Save updated time
        chrome.storage.local.set({ remainingTime });

        // Update the timer display
        updateTimerDisplay(timerDisplay, remainingTime);

        // If the timer runs out
        if (remainingTime <= 0) {
            clearInterval(countdownInterval); // Stop the countdown
            unblockSites(); // Unblock the sites
            timerDisplay.textContent = "Time's up! You can now browse freely."; // Final message
            chrome.storage.local.set({ isBlocking: false }); // Reset blocking state
        }
    }, 1000);
}

// Function to update timer display
function updateTimerDisplay(timerDisplay, remainingTime) {
    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    timerDisplay.textContent = `Time Remaining: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Function to block sites
function blockSites() {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2, 3]
    }, () => {
        // Now add the blocking rules with unique integer IDs
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

// On popup load, check if timer is still running
window.onload = function() {
    chrome.storage.local.get(['remainingTime', 'isBlocking'], function(result) {
        if (result.isBlocking && result.remainingTime > 0) {
            startCountdown(result.remainingTime); // Restart the countdown if it was active
        } else {
            document.getElementById('timerDisplay').textContent = "Timer not active.";
        }
    });
}