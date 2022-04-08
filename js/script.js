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
let screenBlocks = document.querySelectorAll('.screen');

let screenType = document.querySelector('.main-controls__select');
let screensAmount = document.querySelectorAll('.main-controls__input');

const appData = {
    title: '',
    screens: [],
    screensTotalAmount: 0,
    rollback: 25,
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
        plusBtn.addEventListener('click', appData.addScreenBlock);


        rollbackSlider.addEventListener('input', function () {
            rangeValue.textContent = `${rollbackSlider.value}%`;
            appData.rollback = +rollbackSlider.value;
            return appData.rollback;
        });


        calculateBtn.addEventListener('click', function () {

            screenBlocks = document.querySelectorAll('main-controls__item .screen');
            let screenType = document.querySelectorAll('.screen .main-controls__select');
            let screensAmount = document.querySelectorAll('.screen .main-controls__input');
            let selectTypeError;
            let inputError;

            screenType.forEach(function (screen) {
                const select = screen.querySelector('select');
                if (select.options[select.selectedIndex].textContent === 'Тип экранов') {
                    selectTypeError = select.options[select.selectedIndex].textContent;
                    return selectTypeError;
                }
            });

            screensAmount.forEach(function (screen) {
                const input = screen.querySelector('input');

                if (input.value === '') {
                    inputError = input.value;
                    return inputError;
                }
            });


            if (selectTypeError !== 'Тип экранов' && inputError !== '') {
                appData.start();
            } else {
                alert('Выберите тип экрана и их количество!');
            }

        });

    },
    addTitle: function () {
        document.title = title.textContent;
    },
    addScreenBlock: function () {
        const screenClone = screenBlocks[0].cloneNode(true);

        plusBtn.before(screenClone);

    },
    start: function () {

        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.showResult();

        /*
        appData.getServicePercentPrice();
        appData.logger(); */

        console.log(appData);
    },
    addScreens: function () {
        screenBlocks = document.querySelectorAll('.screen');

        screenBlocks.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            const amount = +input.value;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                amount: amount
            });
        });
    },
    addServices: function () {
        percentItems.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        numberItems.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addPrices: function () {
        appData.screenPrice = appData.screens.reduce((sum, current) => (sum + current.price), 0);

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += +appData.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;

        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));

        appData.screensTotalAmount = appData.screens.reduce((sum, current) => (sum + current.amount), 0);
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCount.value = appData.screensTotalAmount;
        totalCountOther.value = appData.servicePricesNumber + appData.servicePricesPercent;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
    },
    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return 'Даём скидку в 10%';
        } else if (price < 30000 && price >= 15000) {
            return 'Даём скидку в 5%';
        } else if (price < 15000 && price >= 0) {
            return 'Скидка не предусмотрена';
        } else {
            return 'Что-то пошло не так';
        }
    },
    /* getServicePercentPrice: function () {
        totalCountRollback.innerHTML = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
    }, */
    logger: function () {
        /* console.log(appData.services);
        console.log(appData.screenPrice);
        console.log(appData.allServicePrices);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        console.log(appData.services); */
    },
};


appData.init();