import { Calculator } from "./app.js";

/* hamburger btn */
const hamburgerBtn = document.querySelector('.hamburger-btn');
const closeBtn = document.querySelector('.close-btn');
const calculatorLinks = document.querySelector('.calculator-links');

hamburgerBtn.addEventListener('click', () => {
    calculatorLinks.classList.toggle('show-calculator-links');
});

closeBtn.addEventListener('click', () => {
    calculatorLinks.classList.remove('show-calculator-links');
});

/* tab-link-button*/
const tabLinksBtn = document.querySelectorAll('.tab-link');
const allContent = document.querySelectorAll('.content');
const linkIndicator = document.querySelector('.link-indicator');

calculatorLinks.addEventListener('click', (event) => {
    const id = event.target.dataset.targetId; /* data-target-id => targetId */
    if (id) {
        tabLinksBtn.forEach((btn) => {
            btn.classList.remove('active');
        });

        allContent.forEach((content) => {
            content.classList.remove('show-content');
        });

        const content = document.getElementById(id);
        content.classList.add('show-content');
        
        linkIndicator.innerText = id;
        event.target.classList.add('active');
        closeBtn.click();
    }
});

/* theme-changer-btn */
const themeChangerBtn = document.querySelector('.theme-changer-btn');
const htmlRoot = document.documentElement;

themeChangerBtn.addEventListener('click', () => {
    const theme = htmlRoot.dataset.theme;
    if (!theme || theme == '') {
        htmlRoot.dataset.theme = 'dark';
    } else {
        htmlRoot.dataset.theme = '';
    }
});

/* CALCULATOR */
const prevValueElDisplay = document.querySelector('.prev-value');
const currentValueElDisplay = document.querySelector('.current-value');
const numberBtns = document.querySelectorAll('[data-number]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const inversBtn = document.querySelector('[data-invers]');
const operators = document.querySelectorAll('[data-operator]');
const equalsBtn = document.querySelector('[data-equals]');

const calculator = new Calculator(prevValueElDisplay, currentValueElDisplay);

numberBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculator.addNumberToDisplay(btn.innerText);
        calculator.updateDisplay();
    })
});

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

allClearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

inversBtn.addEventListener('click', () => {
    calculator.invers();
    calculator.updateDisplay();
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        calculator.chooseOperator(operator.innerText);
        calculator.updateDisplay();
    })
});

equalsBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

/* clear history btn */
const clearHistoryBtn = document.querySelector('.clear-history');
clearHistoryBtn.addEventListener('click', () => {
    calculator.clearDataFromLocalStorage();
    calculator.displayHistory();
});
