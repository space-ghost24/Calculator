const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');

let num1 = '';
let num2 = '';
let op = '';
let result;

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