const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const negative = document.querySelector('.negative');
const decimal = document.querySelector('.decimal');

let num1 = '';
let num2 = '';
let op = '';
let result;

//Handle calculation
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

//Handle number buttons
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        let value = e.target.textContent;

        if (op === ''){
            num1 += value;
            display.textContent = num1;
        } else {
            num2 += value;
            display.textContent = num2;
        }
    });
});

//Handle operator buttons
operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        let value = e.target.textContent;

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
        display.textContent = result;
        num1 = result;
        num2 = '';
        op == '';
    };
});

//Handle clear button
clear.addEventListener('click', () => {
    num1 = '';
    num2 = '';
    op = '';
    display.textContent = '';
});

//Handle negative button
negative.addEventListener('click', () => {
    if (op === ''){
        num1 = (parseFloat(num1) * -1);
        display.textContent = num1;
    } else {
        num2 = (parseFloat(num2) * -1);
        display.textContent = num2;
    }
});

//Handle decimal button
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