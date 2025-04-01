// Function to generate a random number between 1 and 9
function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1;
}

// Initialize counters
let playCount = 0;
let winCount = 0;
let lossCount = 0;

// Function to update counters on the screen
function updateCounters() {
    document.getElementById("playCount").textContent = playCount;
    document.getElementById("winCount").textContent = winCount;
    document.getElementById("lossCount").textContent = lossCount;
}

// Function to simulate the spinning effect and stop one by one
function spinSlots() {
    const slots = [
        document.getElementById("slot1"),
        document.getElementById("slot2"),
        document.getElementById("slot3"),
        document.getElementById("slot4"),
        document.getElementById("slot5")
    ];
    
    const result = document.getElementById("result");
    result.textContent = "Spinning...";
    result.style.color = "black";

    let spins = 15; // Faster spinning effect
    let slotValues = [];

    playCount++; // Increase play count

    // Function to animate a slot stopping
    function spinSlot(index, delay, callback) {
        let count = 0;
        let interval = setInterval(() => {
            slots[index].textContent = getRandomNumber();
            slots[index].style.color = "black"; // Reset color
            count++;
            if (count >= spins) {
                clearInterval(interval);
                let finalNumber = getRandomNumber();
                slots[index].textContent = finalNumber;
                slotValues[index] = finalNumber;
                callback(finalNumber);
            }
        }, 50); // Speed of change
    }

    // Spin the first three slots with randomness
    spinSlot(0, 0, () => {
        spinSlot(1, 300, () => {
            spinSlot(2, 600, () => {
                // Make the last two slots match the first three
                slotValues[3] = slotValues[0];
                slotValues[4] = slotValues[1];
                slots[3].textContent = slotValues[3];
                slots[4].textContent = slotValues[4];

                checkWin(slotValues);
            });
        });
    });
}

// Function to check if the player won
function checkWin(slotValues) {
    const result = document.getElementById("result");

    let allSame = slotValues.every((num) => num === slotValues[0]);
    let hasThreeSevens =
        slotValues.filter((num) => num === 7).length >= 3;

    if (allSame) {
        result.textContent = "BIG WIN! 🎉 Five matching numbers!";
        result.style.color = "gold";
        winCount++;
        colorWinningNumbers("gold");
    } else if (hasThreeSevens) {
        result.textContent = "LUCKY! 🍀 Three or more 7's!";
        result.style.color = "green";
        winCount++;
        colorWinningNumbers("green");
    } else {
        result.textContent = "Try again!";
        result.style.color = "red";
        lossCount++;
    }

    updateCounters();
}

// Function to change the color of winning numbers
function colorWinningNumbers(color) {
    const slots = [
        document.getElementById("slot1"),
        document.getElementById("slot2"),
        document.getElementById("slot3"),
        document.getElementById("slot4"),
        document.getElementById("slot5")
    ];
    slots.forEach((slot) => {
        slot.style.color = color;
    });
}

// Attach event listener to spin button
document.getElementById("spinButton").addEventListener("click", spinSlots);

// Initialize counters on page load
updateCounters();