'use strict';

const appData = {
    title: '',
    screens: [],
    rollback: 25,
    screenPrice: 0,
    adaptive: true,
    services: {},
    fullPrice: 0,  
    allServicePrices: 0,
    servicePercentPrice: 0,
    asking: function() {
        do {
            appData.title = prompt('Как называется ваш проект?');
        } 
        while (appData.isNumber(appData.title));
                   
        for (let i = 0; i < 2; i++) {
            let name;
            let price = 0;
            
            do {
                name = prompt('Какие типы экранов нужно разработать?');
            } 
            while (appData.isNumber(name));

            do {
                price = prompt('Сколько будет стоить данная работа?');
            } 
            while (!appData.isNumber(price));

            appData.screens.push({id: i, name: name, price: +price});
        }

        for (let i = 0; i < 2; i++) {                      
            let name;
            let price = 0;

            do {
                name = prompt('Какой дополнительный тип услуги нужен?');
            } 
            while (appData.isNumber(name));

            do {
                price = prompt('Сколько это будет стоить?');
            } 
            while (!appData.isNumber(price));

            if (appData.services.hasOwnProperty(name)) {
                appData.services[name + i] = +price;
            } else {
                appData.services[name] = +price;
            }
        }
        
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    addPrices: function() {
        appData.screenPrice = appData.screens.reduce((sum, current) => (sum + current.price), 0);
        
        for(let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    getFullPrice: function() {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },
    isNumber: function(num) {                         
        return !isNaN(parseFloat(num)) && isFinite(num); 
    },
    getRollbackMessage: function(price) {
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
    getTitle: function() {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
    },
    getServicePercentPrice: function() {
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
    },
    logger: function() {
        console.log(appData.services);
        console.log(appData.screenPrice);
        console.log(appData.allServicePrices);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        console.log(appData.services);
        
    },
    start: function() {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrice();
        appData.getTitle();
        appData.logger();
    },
};


appData.start();