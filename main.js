const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');

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
            }else{
                return num1 / num2;
            };
    };
};

//Handle number buttons
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        let value = e.target.textContent;

        if(op === ''){
            num1 += value;
            display.textContent = num1;
        }else{
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