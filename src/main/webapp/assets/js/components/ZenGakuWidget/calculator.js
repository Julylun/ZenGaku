import * as HTMLDom from '../HTMLDom.js'
import * as Movement from '../../features/movement.js'

export {
    displayCalculator,
    appendToDisplay,
    toggleSign,
    clearEntry,
    calculate,
    addToExpression,
    toggleHistory
}

let display;
let history;
let currentInput = '';
let operatorPressed = false;
let lastResult = null; 

const displayCalculator = () => {
    let calculator = document.getElementById("calculator");

    if(calculator != null) {
        calculator.remove();
        return;
    }

    calculator = HTMLDom.createElement("div",['auto-moving'],document.getElementsByClassName('content').item(0),{},'calculator');
    
    let calculatorDisplay = HTMLDom.createElement("div",['calculator-display'],calculator,{});
    HTMLDom.createElement('button', [], calculatorDisplay, {innerText: "History"},'historyToggle');
    display = HTMLDom.createElement('input',[],calculatorDisplay,{type: "text", disabled: "true"},'caculator-screen-display');
    

    history = HTMLDom.createElement('div',['calculator-history'],calculator,{},'calculator-history');
    
    let buttonContainer = HTMLDom.createElement('div',['calculator-button-container'],calculator,{});
    let button = HTMLDom.createElement('button',['calculator-button-item'],buttonContainer,{innerText: "CE"}, 'calculator-CE-button');
    button.addEventListener('click', () => {
        clearEntry();
    })

    button = HTMLDom.createElement('button',['calculator-button-item'],buttonContainer,{innerText: "C"}, 'calculator-C-button');
    button.addEventListener('click', () => {
        clearDisplay();
    })


    button = HTMLDom.createElement('button',['calculator-button-item'],buttonContainer,{innerText: "%"}, 'calculator-mod-button');
    button.addEventListener('click', () => {
        appendToDisplay('%');
    })

    button = HTMLDom.createElement('button',['calculator-button-item','calculator-operator'],buttonContainer,{innerText: "/"}, 'calculator-devide-button');
    button.addEventListener('click', () => {
        appendToDisplay('/');
    })


    button = HTMLDom.createElement('button',['calculator-button-item'],buttonContainer,{innerText: "7"}, 'calculator-seven-button');
    button.addEventListener('click', () => {
        appendToDisplay('7');
    })


    button = HTMLDom.createElement('button',['calculator-button-item'],buttonContainer,{innerText: "8"}, 'calculator-8-button');
    button.addEventListener('click', () => {
        appendToDisplay('8');
    })


    button = HTMLDom.createElement('button',['calculator-button-item'],buttonContainer,{innerText: "9"}, 'calculator-9-button');
    button.addEventListener('click', () => {
        appendToDisplay('9');
    })


    button = HTMLDom.createElement('button',['calculator-button-item','calculator-operator'],buttonContainer,{innerText: "x"}, 'calculator-multiply-button');
    button.addEventListener('click', () => {
        appendToDisplay('*')
    })

    button = HTMLDom.createElement('button',['calculator-button-item'],buttonContainer,{innerText: "4"}, 'calculator-four-button');
    button.addEventListener('click', () => {
        appendToDisplay('4')
    })

    button = HTMLDom.createElement('button',['calculator-button-item'],buttonContainer,{innerText: "5"}, 'calculator-five-button');
    button.addEventListener('click', () => {
        appendToDisplay('5')
    })

    button = HTMLDom.createElement('button',['calculator-button-item'],buttonContainer,{innerText: "6"}, 'calculator-six-button');
    button.addEventListener('click', () => {
        appendToDisplay('6')
    })

    button = HTMLDom.createElement('button',['calculator-button-item','calculator-operator'],buttonContainer,{innerText: "-"}, 'calculator-minus-button');
    button.addEventListener('click', () => {
        appendToDisplay('-')
    })

    button = HTMLDom.createElement('button',['calculator-button-item'],buttonContainer,{innerText: "1"}, 'calculator-one-button');
    button.addEventListener('click', () => {
        appendToDisplay('1')
    })

    button = HTMLDom.createElement('button',['calculator-button-item'],buttonContainer,{innerText: "2"}, 'calculator-two-button');
    button.addEventListener('click', () => {
        appendToDisplay('2')
    })

    button = HTMLDom.createElement('button',['calculator-button-item'],buttonContainer,{innerText: "3"}, 'calculator-three-button');
    button.addEventListener('click', () => {
        appendToDisplay('3')
    })

    button = HTMLDom.createElement('button',['calculator-button-item','calculator-operator'],buttonContainer,{innerText: "+"}, 'calculator-plus-button');
    button.addEventListener('click', () => {
        appendToDisplay('+')
    })

    button = HTMLDom.createElement('button',['calculator-button-item'],buttonContainer,{innerText: "±"}, 'calculator-reverse-button');
    button.addEventListener('click', () => {
        toggleSign();
    })

    button = HTMLDom.createElement('button',['calculator-button-item'],buttonContainer,{innerText: "0"}, 'calculator-zero-button');
    button.addEventListener('click', () => {
        appendToDisplay('0')
    })

    button = HTMLDom.createElement('button',['calculator-button-item'],buttonContainer,{innerText: "."}, 'calculator-dot-button');
    button.addEventListener('click', () => {
        appendToDisplay('.')
    })

    button = HTMLDom.createElement('button',['calculator-button-item','calculator-operator'],buttonContainer,{innerText: "="}, 'calculator-equal-button');
    button.addEventListener('click', () => {
        calculate();
    })

    Movement.addMovement(calculatorDisplay,calculator);
} 






function appendToDisplay(value) {
    if (operatorPressed && !isNaN(value)) {
        currentInput = '';
        operatorPressed = false;
    }
    currentInput += value;
    display.value = currentInput;
}

function toggleSign() {
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.substring(1);
    } else {
        currentInput = '-' + currentInput;
    }
    display.value = currentInput;
}

function clearEntry() {
    currentInput = '';
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    display.value = '';
    history.innerHTML = '';
    lastResult = null;
}

function calculate() {
    try {
        let result;
        let expression = currentInput.trim();

        let num1 = '';
        let operator = '';
        let num2 = '';
        let isNum1Negative = false;
        let isNum2Negative = false;
        let isOperatorFound = false;

        for (let i = 0; i < expression.length; i++) {
            if (expression[i] === '-' && !isOperatorFound && num1 === '') {
                isNum1Negative = true; 
            } else if (/[+\-*/%]/.test(expression[i])) {
                operator = expression[i];
                isOperatorFound = true;
            } else if (isOperatorFound && expression[i] === '-' && num2 === '') {
                isNum2Negative = true; 
            } else {
                if (!isOperatorFound) {
                    num1 += expression[i];
                } else {
                    num2 += expression[i];
                }
            }
        }
        
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        if (isNum1Negative) {
            num1 = -Math.abs(num1); 
        }
        if (isNum2Negative) {
            num2 = -Math.abs(num2); 
        }

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            case '%':
                result = num1 % num2;
                break;
            default:
                throw new Error('Error');
        }
        let historyEntry = `<div>${expression} = ${result}</div>`;
        history.innerHTML = historyEntry + history.innerHTML;
        currentInput = result.toString();
        display.value = currentInput;
        lastResult = result;

    } catch (error) {
        display.value = 'Error';
        currentInput = '';
    }
}




function addToExpression(value) {
    if (lastResult !== null && !isNaN(value)) {
        currentInput = lastResult.toString() + value;
        operatorPressed = false;
    } else {
        currentInput += value;
        operatorPressed = true;
    }
    display.value = currentInput;
}

function toggleHistory() {
    if (history.style.display === 'none') {
        history.style.display = 'block';
    } else {
        history.style.display = 'none';
    }
}

