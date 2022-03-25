const title = 'Project 24';
const screens = 'Простые, Сложные, Интеративные';
const rollback = 25;
let screenPrice = 1500,
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