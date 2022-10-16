const addBtn = document.getElementById('add');
const numberOutput = document.getElementById('numberOutput');
// Important variable here
var displayNum = ''
var currentOperation = ''
var operationJustPerformed = false;

const clear = document.getElementById('clear');
const equals = document.getElementById('equals');

const plusBtn = document.getElementById('plus');
const subtractBtn = document.getElementById('subtract');
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');



clear.addEventListener('click', () => clearDisplay());
equals.addEventListener('click', () => evaluateOperation());

plusBtn.addEventListener('click', () => performOperation('+'));
subtractBtn.addEventListener('click', () => performOperation('-'));
multiplyBtn.addEventListener('click', () => performOperation('x'));
divideBtn.addEventListener('click', () => performOperation('/'));


const num0 = document.getElementById('zero');
const num1 = document.getElementById('1');
const num2 = document.getElementById('2');
const num3 = document.getElementById('3');
const num4 = document.getElementById('4');
const num5 = document.getElementById('5');
const num6 = document.getElementById('6');
const num7 = document.getElementById('7');
const num8 = document.getElementById('8');
const num9 = document.getElementById('9');
const period = document.getElementById('period');

num0.addEventListener('click', () => changeDisplay(0));
num1.addEventListener('click', () => changeDisplay(1));
num2.addEventListener('click', () => changeDisplay(2));
num3.addEventListener('click', () => changeDisplay(3));
num4.addEventListener('click', () => changeDisplay(4));
num5.addEventListener('click', () => changeDisplay(5));
num6.addEventListener('click', () => changeDisplay(6));
num7.addEventListener('click', () => changeDisplay(7));
num8.addEventListener('click', () => changeDisplay(8));
num9.addEventListener('click', () => changeDisplay(9));
period.addEventListener('click', () => changeDisplay('.'));


//addBtn.addEventListener('click', () => flexiText.innerHTML = add(5,3));
function changeDisplay(num) {
    if (operationJustPerformed) {
        displayNum = ''
        displayNum += num;
        numberOutput.innerHTML = displayNum;
        operationJustPerformed = false;
        return;
    }
    if (displayNum.includes('.')) {
        return;
    } else {
        displayNum += num
        numberOutput.innerHTML = displayNum;
    }
    
}

function performOperation(operation) {
    if (displayNum.endsWith('+') || displayNum.endsWith('-') || displayNum.endsWith('x') || displayNum.endsWith('/')) {
        return;
    } else {
        displayNum += operation
        numberOutput.innerHTML = displayNum;
        currentOperation = operation;
    }
}

function evaluateOperation() {
    if (currentOperation != '') {
        indexes = [];
        for (var i = 0; i < displayNum.length; i++) {
            if (displayNum[i] === '+' || displayNum[i] === '-' ||displayNum[i] === 'x' || displayNum[i] === '/') {
                indexes.push(i);
            }
        }
        numOperations = indexes.length;
        
        var numbers = [];
        var operations = [];
        for (var y = 0; y< numOperations; y++) {
            // Getting the numbers that the operations are performed upon
            if (y == 0) {
                numbers.push(displayNum.substring(y,indexes[y]));
            } else {
                numbers.push(displayNum.substring(indexes[y]+1,indexes[y+1]));
            }
            
            if (y == numOperations -1) {
                numbers.push(displayNum.substring(indexes[y]+1));
            } else {
                numbers.push(displayNum.substring(indexes[y]+1,indexes[y+1]));
            }
            // Getting the operations themselves
            operations.push(displayNum.substring(indexes[y],indexes[y]+1));
        }

        currentOperation = '';
        
        var finalNumber = 0;
        for (var z = 0; z < operations.length; z++) {
            if (operations[z] === '+') {
                finalNumber = parseInt(numbers[z]) + parseInt(numbers[z+1]);
            } else if (operations[z] === '-') {
                finalNumber = parseInt(numbers[z]) - parseInt(numbers[z+1]);
            } else if (operations[z] === 'x') {
                firstNum = parseInt(numbers[z])
                secondNum = parseInt(numbers[z+1]);
                finalNumber =  finalNumber + firstNum * secondNum;
            } else if (operations[z] === '/') {
                
                finalNumber += parseInt(numbers[z]) / parseInt(numbers[z+1]);
            }
        }
        displayNum = finalNumber;
        numberOutput.innerHTML = displayNum;
        operationJustPerformed = true;
    }
}

function clearDisplay() {
    displayNum = '';
    numberOutput.innerHTML = displayNum;
}

let add = function(a,b) {
    console.log(a+b);
    return a+b;
}

let subtract = function(a,b) {
    return a-b;
}

let multiply = function(a,b) {
    return a*b;
}

let divide = function(a,b) {
    return a/b;
}
