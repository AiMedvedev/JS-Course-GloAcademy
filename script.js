
'use strict';

let title = prompt('Как называется ваш проект?'),
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные'),
    rollback = 25,
    screenPrice = +prompt('Сколько будет стоить данная работа?', '12000'),
    adaptive = confirm('Нужен ли адаптив на сайте?');

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let fullPrice;  
let allServicePrices;
let servicePercentPrice;


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

const getAllServicePrices = function(a, b) {
    return a + b;
};

function getFullPrice(screen, services) {
    return screen + services;
}

function getTitle(title) {
    title = title.trim();
    title = title.toLowerCase();
    title = title[0].toUpperCase() + title.substring(1);
    return title;
}

function getServicePercentPrices(fullPrice, rollback) {
    return Math.ceil(fullPrice - fullPrice * (rollback / 100));
}


allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);


console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices(fullPrice, rollback));
console.log(getTitle(title));
