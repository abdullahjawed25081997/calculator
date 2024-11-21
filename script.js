let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.innerHTML);
    });
});

// Keyboard input handling
document.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', 'Enter', 'Backspace'].includes(e.key)) {
        if (e.key === 'Enter') {
            handleInput('=');
        } else if (e.key === 'Backspace') {
            handleInput('C');
        } else {
            handleInput(e.key);
        }
    }
});

function handleInput(inputValue) {
    if (inputValue === '=') {
        try {
            const result = eval(string);
            document.getElementById('historyList').innerHTML += `<li>${string} = ${result}</li>`;
            string = result.toString(); // Store result for further calculations
            input.value = string;
        } catch (error) {
            input.value = "Error";
        }
    } else if (inputValue === "AC") {
        string = "";
        input.value = string;
    } else if (inputValue === "C") {
        string = string.substring(0, string.length - 1);
        input.value = string;
    } else {
        string += inputValue;
        input.value = string;
    }
}

let isHistoryVisible = false;
const historyContainer = document.getElementById('history');

document.getElementById('toggleHistory').addEventListener('click', () => {
    if (!isHistoryVisible) {
        historyContainer.style.display = "block"; // Show the history
        document.getElementById('hideHistory').style.display = "inline"; // Show Hide History button
        isHistoryVisible = true; // Update visibility state
    }
});

// Hide history button functionality
document.getElementById('hideHistory').addEventListener('click', () => {
    historyContainer.style.display = "none"; // Hide the history
    document.getElementById('toggleHistory').style.display = "inline"; // Show Show History button
    document.getElementById('hideHistory').style.display = "none"; // Hide Hide History button
    isHistoryVisible = false; // Update visibility state
});

// Clear history button functionality
document.getElementById('clearHistory').addEventListener('click', () => {
    document.getElementById('historyList').innerHTML = ''; // Clear the history list
});
