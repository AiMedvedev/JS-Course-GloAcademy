'use strict';

// Загадывание случайного числа от 1 до 100
const isNumber = function(num) {                         
    return !isNaN(parseFloat(num)) && isFinite(num);  // проверка на число
};

function guessGame (numberX) {
    return function guessing (userAnswer) {    
        
        if(+userAnswer > numberX) {
            if (userAnswer === null) {
                alert('Игра окончена.');
                return;
            }
            if (!isNumber(userAnswer)) {
                alert('Введите число!');
                
            }
            alert('Загаданное число меньше');
            let newTry = prompt('Введите новый вариант');
            if (newTry === null) {
                alert('Игра окончена.');
                return;
            } else {
            userAnswer = +newTry;
            
            }
        }
        
        if (+userAnswer < numberX) {
            if (userAnswer === null) {
                alert('Игра окончена.');
                return;
            }
        
            if (!isNumber(userAnswer)) {
                alert('Введите число!');
            }
            alert('Загаданное число больше'); 
            let newTry = prompt('Введите новый вариант');
            if (newTry === null) {
                alert('Игра окончена.');
                return;
            } else {
            userAnswer = +newTry;
            }
        } 

        if (+userAnswer === numberX) {
            alert(`Поздравляю, Вы угадали!!! Это было число ${numberX}`);
            return;
        }

        guessing(userAnswer);
    };
}

const numberToGuess = () => {return Math.round(Math.random() * 100);};
let answer = prompt('Угадай число от 1 до 100');


let gameStart = guessGame(numberToGuess());

gameStart(answer);
