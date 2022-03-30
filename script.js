
'use strict';

let title,
    screens,
    rollback = 25,
    screenPrice,
    adaptive;

let service1;
let service2;
let fullPrice;  
let allServicePrices;
let servicePercentPrice;



const isNumber = function(num) {                         
    return !isNaN(parseFloat(num)) && isFinite(num);  // проверка на число
};

const asking = function() {
    title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

    do {
        screenPrice = prompt('Сколько будет стоить данная работа?');
    } 
    while (!isNumber(screenPrice));
    screenPrice = +screenPrice;
    
    adaptive = confirm('Нужен ли адаптив на сайте?');
};

const getAllServicePrices = function() {
    let sum = 0;
    let amount = 0;

    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?', 'Карусель');
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?', 'Модальное окно');
        }

        do {
            sum = prompt('Сколько это будет стоить?');
        } 
        while (!isNumber(sum));
        
        amount += +sum;
    }
    return amount;
};

function getFullPrice(screen, services) {
    return screen + services;
}

const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
};

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



asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle(title);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);
showTypeOf(screens);
showTypeOf(service1);
showTypeOf(service2);
showTypeOf(rollback);
showTypeOf(screenPrice);
showTypeOf(fullPrice);
showTypeOf(servicePercentPrice);
showTypeOf(allServicePrices);


/* 
console.log('allServicePrices: ' + allServicePrices);

console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices(fullPrice, rollback));
 */