const books = document.querySelectorAll('.book');
const book3Header = books[4].querySelector('h2 a');
const body = document.querySelector('body');
const adv = document.querySelector('.adv');
const chaptersBook2 = books[0].querySelectorAll('li');
const chaptersBook5 = books[5].querySelectorAll('li');
const chaptersBook6 = books[2].querySelectorAll('li');
const chapter8 = chaptersBook2[3].cloneNode(true);


books[0].before(books[1]);
books[4].after(books[3]);
books[5].after(books[2]);

body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

book3Header.textContent = 'Книга 3. this и Прототипы Объектов';

adv.style.display = 'none';

chaptersBook2[4].before(chaptersBook2[8]);
chaptersBook2[3].after(chaptersBook2[6]);
chaptersBook2[10].before(chaptersBook2[2]);

chaptersBook5[1].after(chaptersBook5[9]);
chaptersBook5[4].after(chaptersBook5[2]);
chaptersBook5[7].after(chaptersBook5[5]);

chapter8.textContent = 'Глава 8: За пределами ES6';
books[2].append(chapter8);
chaptersBook6[9].before(chapter8);
