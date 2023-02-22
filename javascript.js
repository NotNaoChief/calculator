const currentOperandText = document.querySelector('[data-current-operand');
const previousOperandText = document.querySelector('[data-previous-operand]');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('[data-clear');
const deleteButton = document.querySelector('[data-delete');
const equalsButton = document.querySelector('[data-equals');


class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear()
    }

    appendNumber(number) {
        if (this.currentOperand === '0') {
            this.currentOperand = ''
        }
        if (number === '.' && this.currentOperand.includes('.')) {
            return
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operator = '';
        this.updateScreen()
    }

    delete() {
        if (this.currentOperand === '0') {
            return
        }
        this.currentOperand = this.currentOperand.slice(0, -1)
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
        this.updateScreen()
    }

    setOperator(operator) {
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    operate() {

    }

    updateScreen() {
        this.currentOperandText.innerText = this.currentOperand;
        this.previousOperandText.innerText = this.previousOperand;
    }
}

const calc = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.textContent);
        calc.updateScreen()
    })
})

operatorButtons.forEach(operator => {
    operator.addEventListener('click', () => {
        calc.setOperator(operator.textContent);
        calc.updateScreen()
    })
})

deleteButton.addEventListener('click', () => calc.delete());
clearButton.addEventListener('click', () => calc.clear());