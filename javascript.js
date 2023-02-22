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
        if (this.currentOperand === '0' && this.previousOperand === '') {
            return
        }
        if (this.previousOperand !== '') {
            this.operate();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    operate() {
        let result;
        const previousValue = parseFloat(this.previousOperand);
        const currentValue = parseFloat(this.currentOperand);

        if (this.currentOperand === '0' && this.previousOperand === '') {
            return
        }

        switch (this.operator) {
            case '+':
                result = previousValue + currentValue
                break
            case '−':
                result = previousValue - currentValue
                break
            case '×':
                result = previousValue * currentValue
                break
            case '÷':
                if (currentValue === 0) {
                    alert("You can't divide by Zero!!");
                    return
                }
                result = previousValue / currentValue
                break
            default:
                return
        }
        this.currentOperand = result.toString();
        this.operator = '';
        this.previousOperand = '';
    }

    updateScreen() {
        this.currentOperandText.innerText = this.currentOperand;
        if (this.operator !== null) {
            this.previousOperandText.innerText = `${this.previousOperand} ${this.operator}`
        }
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

equalsButton.addEventListener('click', () => {
    calc.operate();
    calc.updateScreen();
});

deleteButton.addEventListener('click', () => calc.delete());
clearButton.addEventListener('click', () => calc.clear());