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
        this.displayingResult = false;
        this.clear()
    }

    appendNumber(number) {
        if (this.displayingResult === true) {
            return
        }
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
        this.displayingResult = false;
        this.updateScreen()
    }

    delete() {
        if (this.currentOperand === '0') {
            return
        }
        if (this.displayingResult === true) {
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
        if (this.displayingResult === true) {
            this.displayingResult = false;
        }
        if (this.previousOperand !== '') {
            this.operate();
            this.displayingResult = false;
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
            case '-':
                result = previousValue - currentValue
                break
            case '*':
                result = previousValue * currentValue
                break
            case '/':
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
        this.displayingResult = true;
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
        calc.updateScreen();
    })
})

equalsButton.addEventListener('click', () => {
    calc.operate();
    calc.updateScreen();
});

deleteButton.addEventListener('click', () => calc.delete());
clearButton.addEventListener('click', () => calc.clear());

document.addEventListener('keydown', (e) => {
    if ('.0123456789'.includes(e.key)) {
        calc.appendNumber(e.key);
        calc.updateScreen();
    } else if ('+-*/'.includes(e.key)) {
        calc.setOperator(e.key);
        calc.updateScreen()
    } else if (['=', 'Enter'].includes(e.key)) {
        calc.operate();
        calc.updateScreen();
    } else if (['Backspace', 'Delete'].includes(e.key)) {
        calc.delete();
    } else if (e.key === 'Escape') {
        calc.clear();
    }
}
)