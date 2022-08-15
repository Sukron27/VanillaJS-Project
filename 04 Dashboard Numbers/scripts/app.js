class Count {
    constructor(elementClassName) {
        this.numberCountAnimateEl = elementClassName;
        this.initialValue = 0;
        this.value = parseInt(this.numberCountAnimateEl.dataset.value);

        /* 
        set increment agar selesai dalam waktu +- 1 detik :
        value <= 1000 akan increment += 1
        value >= 1000 akan increment += 2
        dst, agar selesai dalam waktu 1 detik
        */

        this.oneSecondInMilis = 1000;
        this.increment = Math.ceil(this.value / this.oneSecondInMilis);

        this.increaseCount();
    }

    increaseCount() {
        setInterval(() => {
            this.initialValue += this.increment;

            if (this.initialValue > this.value) {
                this.numberCountAnimateEl.innerText = `${this.value}+`;
                clearInterval(this.increaseCount);
                return;
            }

            this.numberCountAnimateEl.innerText = `${this.initialValue}+`
        }, 1);
    }
}

const items = [...document.querySelectorAll('.number')];

items.forEach((item) => {
    new Count(item);
});