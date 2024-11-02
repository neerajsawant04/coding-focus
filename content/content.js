// content/content.js
import motivationalQuotes from './motivationalQuotes.js'; // Adjust the path as necessary

const blockedSites = ["instagram.com", "twitter.com", "facebook.com"];

// Function to check if the current URL is blocked
function checkBlockedSite() {
    const currentUrl = window.location.href;
    const isBlocked = blockedSites.some(site => currentUrl.includes(site));

    if (isBlocked) {
        // Prevent the user from accessing the site
        alert(getRandomQuote()); // Show a random motivational quote
        window.location.href = "about:blank"; // Redirect to a blank page
    }
}

// Function to get a random motivational quote
function getRandomQuote() {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}

// Check for blocked sites when the content script loads
checkBlockedSite();