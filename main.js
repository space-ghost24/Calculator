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

const maxDigits = 9; // Calculator only holds 9 digits

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

        // If same operator is pressed twice it gets deselected
        if (op === value && e.target.classList.contains('active')) {
            e.target.classList.remove('active');
            op = '';
            return;
        }

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
    operators.forEach(btn => btn.classList.remove('active'));
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
    
    if (num1 === ''){
        num1 = '0.'
        display.textContent = num1;
    }

    if (op === ''){
        if (num1 !== '' && !num1.includes('.')){
            num1 += '.';
            display.textContent = num1;
        }
    } else {
        if (num2 !== '' && !num2.includes('.')){
            num2 += '.';
            display.textContent = num2;
        }
    }
});

// Handle percent button
function inputPercent(num) {
    return num * 0.01; // Convert number to percentage (num * 0.01)
}

percent.addEventListener('click', () => {
    if (op && num2 !== '') {
        // Apply percentage to num2 (10% of num2)
        num2 = inputPercent(parseFloat(num2));
        display.textContent = num2;
    } else if (num1 !== '') {
        // If no operator, apply percentage to num1
        num1 = inputPercent(parseFloat(num1));
        display.textContent = num1;
    }
});