'use strict';

const appData = {
    title: '',
    screens: '',
    rollback: 25,
    screenPrice: 0,
    adaptive: true,
    service1: 0,
    service2: 0,
    fullPrice: 0,  
    allServicePrices: 0,
    servicePercentPrice: 0,
    asking: function() {
        appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
    
        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?');
        } 
        while (!isNumber(appData.screenPrice));
        appData.screenPrice = +appData.screenPrice;
        
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

};

const isNumber = function(num) {                         
    return !isNaN(parseFloat(num)) && isFinite(num);  // проверка на число
};

const getAllServicePrices = function() {
    let sum = 0;
    

    for (let i = 0; i < 2; i++) {
        let amount = 0;

        if (i === 0) {
            appData.service1 = prompt('Какой дополнительный тип услуги нужен?', 'Карусель');
        } else if (i === 1) {
            appData.service2 = prompt('Какой дополнительный тип услуги нужен?', 'Модальное окно');
        }

        do {
            amount = prompt('Сколько это будет стоить?');
        } 
        while (!isNumber(amount));
        
        sum += +amount;
    }
    return sum;
};

function getFullPrice() {
    return appData.screenPrice + appData.allServicePrices;
}

const getRollbackMessage = function(price) {
    if (price >= 30000) {
        return 'Даём скидку в 10%';
    } else if (price < 30000 && price >= 15000) {
        return 'Даём скидку в 5%';
    } else if (price < 15000 && price > 0) {
        return 'Скидка не предусмотрена';
    } else {
        return 'Что-то пошло не так';
    }
};

function getTitle(title) {
    title = title.trim();
    title = title.toLowerCase();
    title = title[0].toUpperCase() + title.substring(1);
    return title;
}

function getServicePercentPrices(fullPrice, rollback) {
    return Math.ceil(fullPrice - fullPrice * (rollback / 100));
}



appData.asking();
appData.allServicePrices = getAllServicePrices();
appData.fullPrice = getFullPrice();
appData.servicePercentPrice = getServicePercentPrices(appData.fullPrice, appData.rollback);
appData.title = getTitle(appData.title);


console.log(appData.fullPrice, appData.servicePercentPrice);