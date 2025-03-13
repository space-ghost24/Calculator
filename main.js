const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const negative = document.querySelector('.negative');
const decimal = document.querySelector('.decimal');
const percent = document.querySelector('.percent');

let num1 = '';
let num2 = '';
let op = '';
let result;

display.textContent = '0';

const maxDigits = 9;

// Convert result to scientific notation with 5 significant digits
function toScientificNotation(value) {
    return value.toExponential(5);
};

// Handle calculation
function operate(op, num1, num2){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch(op){
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0){
                return 'you died'
            } else {
                return num1 / num2;
            };
    };
};

// Handle number buttons
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        let value = e.target.textContent;

        if (op === ''){
            if (num1.length < maxDigits){
                num1 += value;
                display.textContent = num1;
            }           
        } else {
            if (num2.length < maxDigits){
                num2 += value;
                display.textContent = num2;
            }          
        }
    });
});

// Handle operator buttons
operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        let value = e.target.textContent;

        operators.forEach(btn => btn.classList.remove('active'));

        e.target.classList.add('active');

        if (num1 !== '' && num2 !== ''){
            result = operate(op, num1, num2);
            display.textContent = result;
            num1 = result;
            num2 = '';
        }

        op = value;
    });
});

// Handle Equals button
equals.addEventListener('click', () => {
    if (num1 !== '' && num2 !== ''){
        result = operate(op, num1, num2);
        if (result.toString().length > maxDigits){
            display.textContent = toScientificNotation(result);
        } else {
            display.textContent = result;
        }
        num1 = result;
        num2 = '';
        op = '';
    };
    operators.forEach(btn => btn.classList.remove('active'));
});

// Handle clear button
clear.addEventListener('click', () => {
    num1 = '';
    num2 = '';
    op = '';
    display.textContent = '0';
});

// Handle negative button
negative.addEventListener('click', () => {
    if (op === ''){
        num1 = (parseFloat(num1) * -1);
        display.textContent = num1;
    } else {
        num2 = (parseFloat(num2) * -1);
        display.textContent = num2;
    }
});

// Handle decimal button
decimal.addEventListener('click', () => {
    if (op === ''){
        if (!num1.includes('.')){
            num1 += '.';
            display.textContent = num1;
        }
    } else {
        if (!num2.includes('.')){
            num2 += '.';
            display.textContent = num2;
        }
    }
});

// Handle percent button
percent.addEventListener('click', () => {
    if (num2 !== ''){
        // Calculate num2 as a percentage of num1 (num1 + num1 * (num2 / 100))
        result = parseFloat(num1) + (parseFloat(num1) * (parseFloat(num2) / 100));
        if (result.toString().length > maxDigits) { // Convert to string because numbers don't have .length property
            display.textContent = toScientificNotation(result);
        } else {
            display.textContent = result;
        }
        num1 = result;
        num2 = '';
        op = '';
    } else if (num1 !== ''){
        // Calculate num1 as a percentage of 100 (num1 / 100)
        result = (parseFloat(num1) / 100);
        if (result.toString().length > maxDigits) { // Convert to string because numbers don't have .length property
            display.textContent = toScientificNotation(result);
        } else {
            display.textContent = result;
        }
        num1 = result;
        num2 = '';
        op = '';
    }
});