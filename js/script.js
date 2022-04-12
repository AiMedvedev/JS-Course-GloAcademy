'use strict';

const title = document.getElementsByTagName('h1')[0];
const calculateBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const plusBtn = document.querySelector('.screen-btn');
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');
const rollbackSlider = document.querySelector('.rollback input');
const rangeValue = document.querySelector('.rollback .range-value');
const total = document.getElementsByClassName('total-input').item(0);
const totalCount = document.getElementsByClassName('total-input').item(1);
const totalCountOther = document.getElementsByClassName('total-input').item(2);
const fullTotalCount = document.getElementsByClassName('total-input').item(3);
const totalCountRollback = document.getElementsByClassName('total-input').item(4);
let screenBlocks = document.querySelectorAll('.main-controls__item.screen');

let allInput = document.querySelectorAll('input');
let allSelect = document.querySelectorAll('select');

let screenType = document.querySelector('.main-controls__select');
let screensAmount = document.querySelectorAll('.main-controls__input');

const appData = {
    title: '',
    screens: [],
    screensTotalAmount: 0,
    rollback: 0,
    screenPrice: 0,
    adaptive: true,
    servicesPercent: {},
    servicesNumber: {},
    fullPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicePercentPrice: 0,
    init: function () {

        appData.addTitle();
        plusBtn.addEventListener('click', this.addScreenBlock);

        rollbackSlider.addEventListener('input', () => {
            rangeValue.textContent = `${rollbackSlider.value}%`;
            this.rollback = +rollbackSlider.value;
            return this.rollback;
        });

        const calculateAll = () => {
            let screenType = document.querySelectorAll('.screen .main-controls__select');
            let screensAmount = document.querySelectorAll('.screen .main-controls__input');
            let selectTypeError;
            let inputError;

            screenType.forEach( screen => {
                const select = screen.querySelector('select');
                if (select.options[select.selectedIndex].textContent === 'Тип экранов') {
                    selectTypeError = select.options[select.selectedIndex].textContent;
                    return selectTypeError;
                }
            });

            screensAmount.forEach( screen => {
                const input = screen.querySelector('input');

                if (input.value === '') {
                    inputError = input.value;
                    return inputError;
                }
            });

            if (selectTypeError !== 'Тип экранов' && inputError !== '') {
                this.start();
            } else {
                alert('Выберите тип экрана и их количество!');
            }
        };

        const disable = () => {
            plusBtn.setAttribute('disabled', true);
            
            allInput = document.querySelectorAll('input');
            allSelect = document.querySelectorAll('select');

            allInput.forEach((item) => {
                item.setAttribute('disabled', true);
            });
            
            allSelect.forEach((item) => {
                item.setAttribute('disabled', true);
            });
            
            resetBtn.style.display = 'block';
            calculateBtn.style.display = 'none';
        };

        const enable = () => {
            allInput = document.querySelectorAll('input');
            allSelect = document.querySelectorAll('select');
            screenBlocks = document.querySelectorAll('.main-controls__item.screen');
            let screenInput = document.querySelector('.main-controls__item.screen input');
            let screenDecr = document.querySelectorAll('.main-controls__select select option');
            
            plusBtn.removeAttribute('disabled');
            
            allInput.forEach((item) => {
                item.removeAttribute('disabled');
            });
            
            allSelect.forEach((item) => {
                item.removeAttribute('disabled');
            });

            for (let i = 1; i < screenBlocks.length; i++) {
                screenBlocks[i].parentNode.removeChild(screenBlocks[i]);
            }
            screenInput.value = '';
            console.log(screenDecr[0]);
            //screenDecr.value = '';
            //screenDecr.option[0].setAttribute('selected');
            //.option[0].value = '';
            

            resetBtn.style.display = 'none';
            calculateBtn.style.display = 'block';

           
            /* screenBlocks.input.value = '';
            screenType.value = '';
            screenBlocks.option.value = ''; */
           
            
            appData.reset();
            appData.showResult();
        };

        calculateBtn.addEventListener('click', calculateAll);

        calculateBtn.addEventListener('click', disable);

        resetBtn.addEventListener('click', enable);
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    addScreenBlock: function () {
        const screenClone = screenBlocks[0].cloneNode(true);
        plusBtn.before(screenClone);
    },
    start: function () {
        this.addScreens();
        this.addServices();
        this.addPrices();
        this.showResult();
        this.reset();
    },
    addScreens: function () {
        screenBlocks = document.querySelectorAll('.screen');

        screenBlocks.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            const amount = +input.value;

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                amount: amount
            });
        });
    },
    addServices: function () {
        percentItems.forEach( item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            } else {
                this.servicesPercent[label.textContent] = 0;
            }
        });

        numberItems.forEach( item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            } else {
                this.servicesNumber[label.textContent] = 0;
            }
        });
    },
    addPrices: function () {
        this.screenPrice = this.screens.reduce((sum, current) => (sum + current.price), 0);

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += +this.servicesNumber[key];
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }

        this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));

        this.screensTotalAmount = this.screens.reduce((sum, current) => (sum + current.amount), 0);
    },
    showResult: function () {
        total.value = this.screenPrice;
        totalCount.value = this.screensTotalAmount;
        totalCountOther.value = this.servicePricesNumber + this.servicePricesPercent;
        fullTotalCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
    },
    reset: function () {
        this.screens = [];
        this.screenPrice = 0;
        this.screensTotalAmount = 0;
        this.servicePricesNumber = 0;
        this.servicePricesPercent = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
    },
    logger: function () {
        console.log(appData);
    },
};


appData.init();