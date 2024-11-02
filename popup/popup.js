// popup.js

const startButton = document.getElementById("startButton");
const minutesInput = document.getElementById("minutes");

startButton.addEventListener("click", () => {
    const minutes = parseInt(minutesInput.value);
    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }
    
    chrome.alarms.create("focusTimer", { delayInMinutes: minutes });
    alert(`Focus mode set for ${minutes} minutes!`);
    window.close();
});