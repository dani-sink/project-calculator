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
    return a / b;
}

class Calculator {
    constructor() {
        this.operations = {};
    }

    operate(operandOne, operandTwo, operator){
        if (operator in this.operations){
            return this.operations[operator](operandOne, operandTwo);
        }
    }

    addMethod(name, func){
        this.operations[name] = func;
    }

    print(){
        console.log(this.operations)
    }
}


let new_Calc = new Calculator();

new_Calc.addMethod('+', add)
new_Calc.addMethod('-', subtract)
new_Calc.addMethod('*', multiply)
new_Calc.addMethod('/', divide)

new_Calc.print()
