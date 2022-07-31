class Calculator {
    constructor(prevValueEl, currentValueEl) {
        this.prevValueEl = prevValueEl;
        this.currentValueEl = currentValueEl;

        this.clear();
        this.displayHistory();
    }

    clear() {
        this.prevValue = '';
        this.currentValue = '';
        this.operator = '';
    }

    delete() {
        /* return new <string>, memotong karakter terakhir */
        this.currentValue = this.currentValue.toString().slice(0, -1);
    }

    invers() {
        if (this.currentValue == '') {
            return;
        }

        this.currentValue = parseFloat(this.currentValue) * -1;
    }

    addNumberToDisplay(number) {
        if (number == '.' && this.currentValue.includes('.')) {
            return;
        }

        if (this.currentValue == '0') {
            this.currentValue = number;
        } else if (this.currentValue == '.') {
            this.currentValue = '0' + this.currentValue.toString() + number.toString();
        }
        else {
            this.currentValue = this.currentValue + number.toString();
        }
    }

    updateDisplay() {
        this.currentValueEl.innerText = this.currentValue;

        if (this.operator) {
            this.prevValueEl.innerText = `${this.prevValue} ${this.operator}`;

        } else {
            this.prevValueEl.innerText = this.prevValue;
        }
    }

    chooseOperator(operator) {
        if (this.currentValue == '') return;

        if (this.prevValue !== '') {
            this.compute();
        }

        this.operator = operator;
        this.prevValue = this.currentValue;
        this.currentValue = '';
    }

    compute() {
        /* convert to number */
        const prev = parseFloat(this.prevValue);
        const current = parseFloat(this.currentValue);
        let result;

        /* hentikan fungsi, jika belum memasukkan ke-2 operand */
        if (isNaN(prev) && isNaN(current)) {
            return;
        }

        switch(this.operator) {
            case '%': 
                result = prev % current;
                break;
            case '÷': 
                result = prev / current;
                break;
            case '×': 
                result = prev * current;
                break;
            case '+': 
                result = prev + current;
                break;
            case '-': 
                result = prev - current;
                break;
            default:
                break;
        }

        if (this.localStorageIsExist) {
            this.saveDataToLocalStorage({
                operand1: prev,
                operand2: current,
                operator: this.operator,
                result: result,
            });
            this.displayHistory();
        }

        this.currentValue = result;
        this.prevValue = '';
        this.operator = '';
    }

    /* local storage */
    localStorageIsExist() {
        return typeof (Storage) !== 'undefined';
    }

    getDataFromLocalStorage() {
        return localStorage.getItem('calculator-history') ? JSON.parse(localStorage.getItem('calculator-history')) : []; /* [...] / [] */
    }

    saveDataToLocalStorage(history) {
        /* <array> */
        const items = this.getDataFromLocalStorage();

        items.push(history);
        while (items.length > 30) {
            items.shift();
        }

        localStorage.setItem('calculator-history', JSON.stringify(items));
    }

    clearDataFromLocalStorage() {
        localStorage.removeItem('calculator-history');
    }

    displayHistory() {
        const historyList = document.querySelector('.history-list');

        historyList.innerHTML = '';

        /* <array> */
        const items = this.getDataFromLocalStorage();

        if (items.length > 0) {
            items.forEach((item) => {
                let historyItem = this.#createHistoryItem(item);
                historyList.innerHTML += historyItem;
            });
        } else {
            historyList.innerHTML = `<h2 class="empty-history">Belum ada history...<h2/>`;
        }
    }

    #createHistoryItem(item) {
        return `
        <article class="history-item">
            <p class="input-value">${item.operand1} ${item.operator} ${item.operand2}</p>
            <p class="result">= ${item.result}</p>
        </article>
        `
    }
}

export {Calculator};