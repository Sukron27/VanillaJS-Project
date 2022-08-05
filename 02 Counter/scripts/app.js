class Counter {
    constructor(counterValue, counterName) {
        this.counterValue = counterValue;
        this.counterName = counterName;

        /* load data for first time */
        this.value = this.loadData();
        this.displayValue();
    }

    reset() {
        this.value = 0;
        this.saveData();
    }

    increase() {
        this.value++;
        this.saveData();
    }

    decrease() {
        this.value--;
        this.saveData();
    }

    displayValue() {
        this.counterValue.innerText = this.value;
        if (this.value < 0) {
            this.counterValue.style.color = `var(--clr-red-light)`;
        } else if (this.value > 0){
            this.counterValue.style.color = `var(--clr-green-light)`;
        } else {
            this.counterValue.style.color = `var(--clr-grey-1)`;
        }
    }

    /* local storage */
    localStorageIsExist() {
        return typeof (Storage) !== 'undefined';
    }

    saveData() {
        localStorage.setItem(`value${this.counterName}`, `${this.value}`);
    }

    loadData() {
        return localStorage.getItem(`value${this.counterName}`) ? 
            parseInt(localStorage.getItem(`value${this.counterName}`)): 0;
    }
}

// select value and all buttons
const firstCounterValueEl = document.querySelector('.first-counter .value');
const secondCounterValueEl = document.querySelector('.second-counter .value');
const decreaseBtns = document.querySelectorAll('.decrease');
const increaseBtns = document.querySelectorAll('.increase');
const resetBtns = document.querySelectorAll('.reset');


// unique name for counter
const FIRST_COUNTER = 'FirstCounter';
const SECOND_COUNTER = 'SecondCounter';

// create button instance
const counter = [
                new Counter(firstCounterValueEl, FIRST_COUNTER),
                new Counter(secondCounterValueEl, SECOND_COUNTER),
                ];

// add button listener 
increaseBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        counter[index].increase();
        counter[index].displayValue();
    })
});

decreaseBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        counter[index].decrease();
        counter[index].displayValue();
    })
});

resetBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        counter[index].reset();
        counter[index].displayValue();
    })
})