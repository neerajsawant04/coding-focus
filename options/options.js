// options.js

const quotes = [
    "Focus on one task at a time.",
    "Keep pushing forward!",
    "Coding is the new literacy!",
    "Success is built on consistency.",
    "You're making progress with every line of code."
];

const quoteDisplay = document.getElementById("quote");
quoteDisplay.textContent = quotes[Math.floor(Math.random() * quotes.length)];