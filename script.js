
let title = 'Project 24',
    screens = 'Простые, Сложные, Интерактивные',
    rollback = 25,
    screenPrice = 1500,
    fullPrice = 8000,
    adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(", "));
console.log(`Процент отката посреднику за работу составляет ${fullPrice * (rollback/100)} рублей`);


title = prompt('Как называется ваш проект?');

screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');

adaptive = confirm('Нужен ли адаптив на сайте?');

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

fullPrice = screenPrice + servicePrice1 + servicePrice2;

let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));
console.log(servicePercentPrice);

if (fullPrice >= 30000) {
    console.log('Даём скидку в 10%');
} else if (fullPrice < 30000 && fullPrice >= 15000) {
    console.log('Даём скидку в 5%');
} else if (fullPrice < 15000 && fullPrice > 0) {
    console.log('Скидка не предусмотрена');
} else {
    console.log('Что-то пошло не так');
}

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