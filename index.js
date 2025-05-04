const IS_NUMBER = (c) => "0123456789".includes(c);
const IS_OPERATOR = (c) => "+-*/".includes(c);


const buttonsContainer = document.querySelector('.buttons')
const display = document.querySelector('.display');

const addButton = document.querySelector('#plus');
const subtractButton = document.querySelector('#minus');
const multiplicationButton = document.querySelector('#asterix');
const divisionButton = document.querySelector('#slash');

let currentDisplayText = "";
let result = 0;
let operandOne = null;
let operandTwo = null;
let operator = "";
let previousButtonClicked = ""
let decimalPointPressed = false;
let negativeIsToggled = false;
let percentPressed = false;


function add(a, b){
    return +parseFloat(a + b).toFixed(6);
}
function subtract(a, b){
    return +parseFloat(a - b).toFixed(6);
}
function multiply(a, b){
    return +parseFloat(a * b).toFixed(6);
}
function divide(a, b){
    return +parseFloat(a / b).toFixed(6);
}

function percent(a) {
    return +parseFloat(a / 100).toFixed(6);
}

function operate(operand1, operand2, operatorChar){
    switch(operatorChar){
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case '*':
            return multiply(operand1, operand2);
        case '/':
            return divide(operand1, operand2);
        case '%':
            return percent(operand1)
    }
}


function resetCalculator(){
    currentDisplayText = "";
    result = 0;
    operandOne = null;
    operandTwo = null;
    operator = "";
    display.textContent = "0";
    toggleButton('AC');
    decimalPointPressed = false; 
    negativeIsToggled = false;
    percentPressed = false;
}

function resetCalculatorUndefined(){
    currentDisplayText = "";
    result = 0;
    operandOne = null;
    operandTwo = null;
    operator = "";
    display.textContent = "Undefined";
    toggleButton('AC');
    decimalPointPressed = false;
    negativeIsToggled = false;
    percentPressed = false;
}

function toggleButton(symbol){
    switch (symbol){
        case '+':
            addButton.style.backgroundColor = "#9a9a9a";
            subtractButton.style.backgroundColor = "#fff";
            multiplicationButton.style.backgroundColor = "#fff";
            divisionButton.style.backgroundColor = "#fff";
            break;
        case '-':
            subtractButton.style.backgroundColor = "#9a9a9a";
            addButton.style.backgroundColor = "#fff";
            multiplicationButton.style.backgroundColor = "#fff";
            divisionButton.style.backgroundColor = "#fff";
            break;
        case '*':
            multiplicationButton.style.backgroundColor = "#9a9a9a";
            subtractButton.style.backgroundColor = "#fff";
            addButton.style.backgroundColor = "#fff";
            divisionButton.style.backgroundColor = "#fff";
            break;
        case '/':
            divisionButton.style.backgroundColor = "#9a9a9a";
            subtractButton.style.backgroundColor = "#fff";
            multiplicationButton.style.backgroundColor = "#fff";
            addButton.style.backgroundColor = "#fff";
            break;
        case 'AC':
        case '=':
            divisionButton.style.backgroundColor = "#fff";
            subtractButton.style.backgroundColor = "#fff";
            multiplicationButton.style.backgroundColor = "#fff";
            addButton.style.backgroundColor = "#fff";
            break;
        
    }
}


function handleClick(event){
    const target = event.target;
    const buttonClicked = target.textContent;
    if (buttonClicked === 'AC') {
        resetCalculator();
    }
    
    if (buttonClicked === '=') {
        previousButtonClicked = buttonClicked;
        if (operandOne !== null && currentDisplayText !== "") {
            operandTwo = Number(currentDisplayText);
            if (operandTwo === 0 && operator === '/'){
                resetCalculatorUndefined();
                return;
            } else {
                result = operate(operandOne, operandTwo, operator);
                display.textContent = result;
                operandOne = null;
                operandTwo = null;
                operator = "";
                currentDisplayText = "";
            }
            
        }
        toggleButton(buttonClicked); 
        decimalPointPressed = false; 
        negativeIsToggled = false;
    }

    else if (target.id === 'backspace' || target.parentElement.id === 'backspace') {
        if (currentDisplayText !== '0' && currentDisplayText !== '' && !percentPressed){
            let len = currentDisplayText.length;
            if (currentDisplayText[len - 1] === '.'){
                decimalPointPressed = false;
            }
            
            currentDisplayText = currentDisplayText.slice(0, -1);
            if (currentDisplayText === "") {
                display.textContent = "0";
                negativeIsToggled = false;
            } else {
                display.textContent = currentDisplayText;
            }
        }
    }
    
    else if (buttonClicked === '+/-'){
        if (currentDisplayText !== "") {
            if (negativeIsToggled){
                currentDisplayText = currentDisplayText.slice(1);
                display.textContent = currentDisplayText;
                negativeIsToggled = false;
            } else {
                currentDisplayText = '-' + currentDisplayText;
                display.textContent = currentDisplayText;
                negativeIsToggled = true;
            }
        }
    }

    else if (IS_NUMBER(buttonClicked) && currentDisplayText.length < 8 ){
        if (currentDisplayText === "0" && buttonClicked === "0"){
            currentDisplayText = "";
            return
        }
        currentDisplayText += buttonClicked;
        display.textContent = currentDisplayText; 
        previousButtonClicked = buttonClicked;
    }
    else if (buttonClicked === '.'){
        if (!decimalPointPressed) {
            if (currentDisplayText === ""){
                currentDisplayText = '0.'
            } else {
                currentDisplayText += '.'
            }
            decimalPointPressed = true; 
        }
    }

    else if (buttonClicked === '%'){ 
        if (currentDisplayText !== ""){
            if (!IS_OPERATOR(previousButtonClicked)){
                percentPressed = true;
                currentDisplayText = operate(+currentDisplayText, 0, buttonClicked).toString();
                display.textContent = currentDisplayText;
            }
        } 
    }


    else if (IS_OPERATOR(buttonClicked) ){
        if (display.textContent === 'Undefined') return
        decimalPointPressed = false;
        negativeIsToggled = false; 
        toggleButton(buttonClicked);
        if (currentDisplayText !== "" && !IS_OPERATOR(previousButtonClicked)){
            if (operator === "") {
                operator = buttonClicked;
            }
            previousButtonClicked = operator;
            if (operandOne === null) {
                operandOne = Number(currentDisplayText);
            } else {
                if (operandTwo === null){
                    operandTwo = Number(currentDisplayText);
                }
                if (operandTwo === 0 && operator === '/'){
                    resetCalculatorUndefined();
                    return;
                }
                operandOne = operate(operandOne, operandTwo, operator)
                display.textContent = operandOne;
                operandTwo = null;
                operator = buttonClicked;
            }
            currentDisplayText = "";
        }
    }
    
}

buttonsContainer.addEventListener("click", handleClick)