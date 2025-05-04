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
        case 'Enter':
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


function handleKeyPress(event){
    /* 
        In Firefox, pressing the slash character triggers the
        default behavior which is to focus a search bar. We
        use preventDefault() on the event to prevent that 
        behavior
    */
    event.preventDefault();
    const keyPressed = event.key;

    if (keyPressed === 'r' || keyPressed === 'R') {
        resetCalculator();
    }

    if (keyPressed === '=' || keyPressed === 'Enter'){
        previousButtonClicked = keyPressed;
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
        toggleButton(keyPressed);
        decimalPointPressed = false; 
        negativeIsToggled = false;
    }

    else if (keyPressed === 'Backspace') {
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

    else if (keyPressed === 'n' || keyPressed === 'N'){
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

    if (IS_NUMBER(keyPressed) && currentDisplayText.length < 8 ){
        if (currentDisplayText === "0" && keyPressed === "0"){
            currentDisplayText = "";
            return
        }
        currentDisplayText += keyPressed;
        display.textContent = currentDisplayText; 
        previousButtonClicked = keyPressed;
    }
    else if (keyPressed === '.'){
        if (!decimalPointPressed) {
            if (currentDisplayText === ""){
                currentDisplayText = '0.'
            } else {
                currentDisplayText += '.'
            }
            decimalPointPressed = true; 
        }
    }

    else if (keyPressed === '%'){ 
        if (currentDisplayText !== ""){
            if (!IS_OPERATOR(previousButtonClicked)){
                percentPressed = true;
                currentDisplayText = operate(+currentDisplayText, 0, keyPressed).toString();
                display.textContent = currentDisplayText;
            }
        } 
    }

    else if (IS_OPERATOR(keyPressed)){ 
        if (display.textContent === 'Undefined') return
        decimalPointPressed = false;
        negativeIsToggled = false; 
        toggleButton(keyPressed);
        if (currentDisplayText !== "" && !IS_OPERATOR(previousButtonClicked)){
            if (operator === "") {
                operator = keyPressed;
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
                operator = keyPressed;
            }
            currentDisplayText = "";
        }
    }
    
}

buttonsContainer.addEventListener("click", handleClick)
document.addEventListener("keydown", handleKeyPress)
