const addBtn = document.getElementById('add');
const numberOutput = document.getElementById('numberOutput');
// Important variable here
var displayNum = ''
var currentOperation = ''
var operationJustPerformed = false;
var previousValue = '';

const clear = document.getElementById('clear');
const equals = document.getElementById('equals');
const backspaceBtn = document.getElementById('backspace');
const ansBtn = document.getElementById('ans');

const plusBtn = document.getElementById('plus');
const subtractBtn = document.getElementById('subtract');
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');



clear.addEventListener('click', () => clearDisplay());
equals.addEventListener('click', () => evaluateOperation());
backspaceBtn.addEventListener('click', () => backspace());
ansBtn.addEventListener('click', () => ans());

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

// Allowing keyboard inputs to trigger the button presses
window.addEventListener('keydown', keyPressed);

function keyPressed(e){
    console.log(`this key has been pressed: ${e.key}`);
    if (e.key == '+' ||e.key == '-' ||e.key == '*' ||e.key == '/') {
        performOperation(e.key);
    } else if (!isNaN(e.key)) {
        changeDisplay(e.key);
    } else if (e.key == 'Enter') {evaluateOperation()}
    else if (e.key == 'Backspace') {
        backspace();
    }
}

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

function backspace() {
    if (displayNum.length > 0) {
        displayNum = displayNum.slice(0,-1);
        numberOutput.innerHTML = displayNum;
    } else return;
}

function ans() {
    if (displayNum.includes('=')) {
        return;
    } else if (previousValue != '') {
        displayNum += previousValue;
        numberOutput.innerHTML = displayNum;
    } else return;
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

        numOfNumbers = numOperations +1;

        // Loop just for getting the operations
        for (var y = 0; y< numOperations; y++) {
            // Getting the numbers that the operations are performed upon
            // This whole section is off if there are more than one operation
            operations.push(displayNum.substring(indexes[y],indexes[y]+1));
        }
        // Loop just for getting the numbers
        variableGrab = 0;
        for (var i = 0; i < numOfNumbers; i++) {
            // If it is the last number need to make it go to the end
            if (i == numOfNumbers-1) {
                numbers.push(displayNum.substring(variableGrab));
                
            } else { // Will go through this most of the time
                numbers.push(displayNum.substring(variableGrab,indexes[i]));
                variableGrab = indexes[i] + 1;
            }
            
        }

        console.table(numbers);
        console.table(operations);

        currentOperation = '';
        
        var finalNumber = 0;
        firstOperation = true;
        // Need to adjust this for multiple operations
        // Need to figure out a fairly concise way of doing this
        for (var z = 0; z < operations.length; z++) {
            if (operations[z] === '+') {
                firstNum = parseInt(numbers[z])
                secondNum = parseInt(numbers[z+1]);
                if (firstOperation) finalNumber =  firstNum + secondNum;
                else finalNumber = finalNumber + secondNum;
            } else if (operations[z] === '-') {
                firstNum = parseInt(numbers[z])
                secondNum = parseInt(numbers[z+1]);
                if (firstOperation) finalNumber =  firstNum - secondNum;
                else finalNumber = finalNumber - secondNum;
            } else if (operations[z] === 'x') {
                firstNum = parseInt(numbers[z])
                secondNum = parseInt(numbers[z+1]);
                if (firstOperation) finalNumber =  firstNum * secondNum;
                else finalNumber = finalNumber * secondNum;
                
            } else if (operations[z] === '/') {
                firstNum = parseInt(numbers[z])
                secondNum = parseInt(numbers[z+1]);
                if (firstOperation) finalNumber =  firstNum / secondNum;
                else finalNumber = finalNumber / secondNum;
            }
            firstOperation = false;
        }
        displayNum = displayNum + ' = ' + finalNumber;
        numberOutput.innerHTML = displayNum;
        operationJustPerformed = true;
        previousValue = finalNumber;
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
