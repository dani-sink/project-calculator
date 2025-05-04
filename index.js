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
    
    const keyPressed = event.key;
    if (keyPressed === '/'){
        event.preventDefault();
        event.stopPropagation();
    }

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

function onMouseDown(event){
    const target = event.target;
    const buttonClicked = target.textContent;
    const calculatorKeysClicked = 
        IS_NUMBER(buttonClicked) ||
        IS_OPERATOR(buttonClicked) ||
        buttonClicked === 'AC' ||
        target.id === 'backspace' || 
        target.parentElement.id === 'backspace' ||
        buttonClicked === '+/-' ||
        buttonClicked === '=' ||
        buttonClicked === '.' ||
        buttonClicked === '%'
        
    if (calculatorKeysClicked) {
        if (target.parentElement.id === 'backspace'){
            target.parentElement.style.backgroundColor = "#9a9a9a";   
        }
        if (target.id === 'backspace'){
            target.firstChild.style.backgroundColor = "#9a9a9a";   
        }
        target.style.backgroundColor = "#9a9a9a";
    }
}

function onMouseUp(event){
    const target = event.target;
    const buttonClicked = target.textContent;
    const calculatorKeysClicked = 
        IS_NUMBER(buttonClicked) ||
        IS_OPERATOR(buttonClicked) ||
        buttonClicked === 'AC' ||
        target.id === 'backspace' || 
        target.parentElement.id === 'backspace' ||
        buttonClicked === '+/-' ||
        buttonClicked === '=' ||
        buttonClicked === '.' ||
        buttonClicked === '%'

    if (calculatorKeysClicked) {
        if (target.parentElement.id === 'backspace'){
            target.parentElement.style.backgroundColor = "#fff";   
        }
        if (target.id === 'backspace'){
            target.firstChild.style.backgroundColor = "#fff";   
        }
        target.style.backgroundColor = "#fff";
    }
}

function onMouseOver(event){
    const target = event.target;
    const buttonHovered = target.textContent;
    const calculatorKeysHovered = 
        IS_NUMBER(buttonHovered) ||
        IS_OPERATOR(buttonHovered) ||
        buttonHovered === 'AC' ||
        target.id === 'backspace' || 
        target.parentElement.id === 'backspace' ||
        buttonHovered === '+/-' ||
        buttonHovered === '=' ||
        buttonHovered === '.' ||
        buttonHovered === '%'
        
    if (calculatorKeysHovered) {
        if (target.parentElement.id === 'backspace'){
            target.parentElement.style.backgroundColor = "#ddd";   
        }
        if (target.id === 'backspace'){
            document.querySelector("#backspace-img").style.backgroundColor = "#ddd";
        }
        target.style.backgroundColor = "#ddd";
    }
}

function onMouseOut(event){
    const target = event.target;
    const buttonUnhovered = target.textContent;
    const calculatorKeysUnhovered = 
        IS_NUMBER(buttonUnhovered) ||
        IS_OPERATOR(buttonUnhovered) ||
        buttonUnhovered === 'AC' ||
        target.id === 'backspace' || 
        target.parentElement.id === 'backspace' ||
        buttonUnhovered === '+/-' ||
        buttonUnhovered === '=' ||
        buttonUnhovered === '.' ||
        buttonUnhovered === '%'
        
    if (calculatorKeysUnhovered) {
        if (target.parentElement.id === 'backspace'){
            target.parentElement.style.backgroundColor = "#fff";   
        } 
        if (target.id === 'backspace'){
            document.querySelector("#backspace-img").style.backgroundColor = "#fff";   
        }
        target.style.backgroundColor = "#fff";
    }
}

function colorElement(keyPressed, colorApplied){
    let element = null
    switch (keyPressed){
        case '0':
            element = document.getElementById('zero');
            break;
        case '1':
            element = document.getElementById('one');
            break;
        case '2':
            element = document.getElementById('two');
            break;
        case '3':
            element = document.getElementById('three');
            break;
        case '4':
            element = document.getElementById('four');
            break;
        case '5':
            element = document.getElementById('five');
            break;
        case '6':
            element = document.getElementById('six');
            break;
        case '7':
            element = document.getElementById('seven');
            break;
        case '8':
            element = document.getElementById('eight');
            break;
        case '9':
            element = document.getElementById('nine');
            break;
        case 'Backspace':
            element = document.getElementById('backspace');
            break;
        case '.':
            element = document.getElementById('dot');
            break;
        case 'Enter':
        case '=':
            element = document.getElementById('equal');
            break;
        case '+':
            element = document.getElementById('plus');
            break;
        case '-':
            element = document.getElementById('minus');
            break;
        case '*':
            element = document.getElementById('asterix');
            break;
        case '/':
            element = document.getElementById('slash');
            break;
        case '%':
            element = document.getElementById('percent');
            break;
        case 'n':
        case 'N':
            element = document.getElementById('negate');
            break;
        case 'r':
        case 'R':
            element = document.getElementById('clear');
            break;
    }
    element.style.backgroundColor = colorApplied ? "#9a9a9a" : "#fff";
}

function onKeyDown(event){
    const keyPressed = event.key;
    const calculatorKeysPressed = 
        IS_NUMBER(keyPressed) ||
        IS_OPERATOR(keyPressed) ||
        keyPressed === 'r' ||
        keyPressed === 'R' ||
        keyPressed === 'Backspace' || 
        keyPressed === 'n' ||
        keyPressed === 'N' ||
        keyPressed === '=' ||
        keyPressed === 'Enter' ||
        keyPressed === '.' ||
        keyPressed === '%'
        
    
    if (calculatorKeysPressed) {
        colorElement(keyPressed, true);
    }
}

function onKeyUp(event){
    const keyPressed = event.key;
    const calculatorKeysPressed = 
        IS_NUMBER(keyPressed) ||
        IS_OPERATOR(keyPressed) ||
        keyPressed === 'r' ||
        keyPressed === 'R' ||
        keyPressed === 'Backspace' || 
        keyPressed === 'n' ||
        keyPressed === 'N' ||
        keyPressed === '=' ||
        keyPressed === 'Enter' ||
        keyPressed === '.' ||
        keyPressed === '%'
        
    
    if (calculatorKeysPressed) {
        colorElement(keyPressed, false);
    }
}


buttonsContainer.addEventListener("click", handleClick);
buttonsContainer.addEventListener('mousedown', onMouseDown);
buttonsContainer.addEventListener('mouseup', onMouseUp);
buttonsContainer.addEventListener('mouseover', onMouseOver);
buttonsContainer.addEventListener('mouseout', onMouseOut);
document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keydown", onKeyDown); 
document.addEventListener("keyup", onKeyUp); 
