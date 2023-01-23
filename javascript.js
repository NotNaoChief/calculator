let currentValue;
let previousValue;

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case '*':
            return multiply(a, b)
        case '/':
            return divide(a,b)
    }
}

// grab screen for updating display
const screen = document.querySelector('.screen');

// grab all numbers
const numbers = document.querySelectorAll('.number');

// button clicks add numbers to screen
numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (screen.textContent === '0') {
            screen.textContent = '';
        }
        screen.textContent += number.textContent;
        currentValue = parseInt(screen.textContent);
    })
});