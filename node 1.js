
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button');
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let fullExpression = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                operator = '';
                previousInput = '';
                fullExpression = '';
                display.innerText = '0';
            } else if (value === '=') {
                if (currentInput && previousInput && operator) {
                    currentInput = operate(previousInput, currentInput, operator).toString();
                    display.innerText = currentInput;
                    previousInput = '';
                    operator = '';
                    fullExpression = currentInput;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    if (previousInput) {
                        currentInput = operate(previousInput, currentInput, operator).toString();
                    }
                    previousInput = currentInput;
                    operator = value;
                    fullExpression += ` ${value} `;
                    currentInput = '';
                }
            } else {
                currentInput += value;
                fullExpression += value;
                display.innerText = fullExpression;
            }
        });
    });

    function operate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return 0;
        }
    }
});
