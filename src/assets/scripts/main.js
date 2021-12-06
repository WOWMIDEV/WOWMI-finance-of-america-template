import Dropdowns from '../../modules/dropdowns/dropdowns';

import '../styles/main.scss';


// TODO create function to init menu opening logic
const menuBtn = document.querySelector('.header__burger');
const header = document.querySelector('.header');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('js-open');
  header.classList.toggle('js-open');
  menu.classList.toggle('js-open');
});


const menuDropdowns = new Dropdowns({
  dropdownSelector: '.menu__dd-item',
  toggleSelector: '.menu__dd-category',
  contentSelector: '.menu__dd-content',
  activeClass: 'js-open',
});
menuDropdowns.init();

// TODO do we really need this observer?
const burgerMutationObserver = new MutationObserver((mutations) => {
  for (let i = 0; i < mutations.length; i += 1) {
    if (mutations[i].target.classList.contains('js-open')) {
      document.querySelector('html').style.overflowY = 'hidden';
    } else document.querySelector('html').style.overflowY = 'auto';
    break;
  }
});

burgerMutationObserver.observe(menuBtn, {
  attributes: true,
  attributeOldValue: true,
});
