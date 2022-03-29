
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
let fullPrice = screenPrice + servicePrice1 + servicePrice2;  
let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));


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



showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);


console.log(getRollbackMessage(fullPrice));

console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(", "));
console.log(`Процент отката посреднику за работу составляет ${fullPrice * (rollback/100)} рублей`);

console.log(servicePercentPrice);

// Вариант со switch что-то не срабатывает (выдает default):
/* switch (fullPrice) {
    case fullPrice >= 30000:
        console.log('Даём скидку в 10%');
        break
    case fullPrice < 30000 && fullPrice >= 15000:
        console.log('Даём скидку в 5%');
        break
    case fullPrice < 15000 && fullPrice > 0:
        console.log('Скидка не предусмотрена');
        break
    default:
        console.log('Что-то пошло не так');
} */