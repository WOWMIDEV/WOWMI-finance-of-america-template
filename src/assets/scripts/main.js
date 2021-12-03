import '../styles/main.scss';

const menuBtn = document.querySelector('.header__burger');
const header = document.querySelector('.header');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('js-open');
  header.classList.toggle('js-open');
  menu.classList.toggle('js-open');
});

const menuItem = document.querySelectorAll('.menu__dd-item');

menuItem.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('js-open');
  });
});
