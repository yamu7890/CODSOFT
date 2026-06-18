const displayElement = document.getElementById('display');

function appendValue(val) {
    if (displayElement.value === '0' && val !== '.') {
        displayElement.value = val;
    } else {
        displayElement.value += val;
    }
}

function clearDisplay() {
    displayElement.value = '';
}

function deleteLast() {
    displayElement.value = displayElement.value.slice(0, -1);
}

function calculateResult() {
    try {
        // Evaluate the raw math expression using native window engine math processing
        if (displayElement.value.trim() !== "") {
            displayElement.value = Function(`"use strict"; return (${displayElement.value})`)();
        }
    } catch (error) {
        displayElement.value = 'Error';
    }
}
