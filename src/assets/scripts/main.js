import '../styles/main.scss';

import AOS from 'aos';
import 'aos/dist/aos.css';
import SmoothScroll from 'smooth-scroll';
import Dropdowns from '../../modules/dropdowns/dropdowns';
import Tabs from '../../modules/tabs/tabs';


AOS.init({
  offset: 100,
  delay: 200,
  duration: 600,
  once: true,
});

// eslint-disable-next-line no-unused-vars
const scroll = new SmoothScroll('a', {
  animationTime: 1000, // [ms]
  stepSize: 100, // [px]
  accelerationDelta: 20,
  accelerationMax: 5,
  keyboardSupport: true,
  arrowScroll: 50, // [px]
  touchpadSupport: true,
});

const menuTabs = new Tabs({
  eventType: 'mouseover',
  tabSelector: '.menu-tabs__tab',
  btnSelector: '.menu__dd-link',
});

menuTabs.init();


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
  initialDropdowns: [0],
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

window.onload = () => {
  const transitionElem = document.querySelector('.transition');
  const anchors = document.querySelectorAll('[data-link="page"]');

  setTimeout(() => {
    transitionElem.classList.remove('is-active');
  }, 500);

  anchors.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target.href;

      transitionElem.classList.add('is-active');

      setTimeout(() => {
        window.location.href = target;
      }, 500);
    });
  });
};
