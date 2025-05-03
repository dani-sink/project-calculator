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

function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return (a / b);
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
}

function resetCalculatorUndefined(){
    currentDisplayText = "";
    result = 0;
    operandOne = null;
    operandTwo = null;
    operator = "";
    display.textContent = "Undefined";
    toggleButton('AC');
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
    }
    

    else if (IS_NUMBER(buttonClicked) && currentDisplayText.length < 5){
        if (currentDisplayText === "0" && buttonClicked === "0"){
            currentDisplayText = "";
            return
        }
        currentDisplayText += buttonClicked;
        display.textContent = currentDisplayText; 
        previousButtonClicked = buttonClicked;
    }
    else if (IS_OPERATOR(buttonClicked) ){
        if (display.textContent === 'Undefined') return
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