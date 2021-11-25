import '../styles/main.scss';

const menuBtn = document.querySelector('.header__burger');
const header = document.querySelector('.header');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('js-open');
  header.classList.toggle('js-open');
});
