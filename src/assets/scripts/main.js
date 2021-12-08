import '../styles/main.scss';

import AOS from 'aos';
import 'aos/dist/aos.css';
import SmoothScroll from 'smooth-scroll';

import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import Dropdowns from '../../modules/dropdowns/dropdowns';
import Tabs from '../../modules/tabs/tabs';

Swiper.use([Navigation, Pagination]);

function isTouchDevice() {
  return 'ontouchstart' in document.documentElement;
}

if (isTouchDevice()) {
  document.body.classList.add('touch-device');
} else {
  document.body.classList.remove('touch-device');
}


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

(function initMenuTabs() {
  const tabSelector = '.types__cards';
  const btnSelector = '.menu__dd-link';


  if (!document.body.classList.contains('touch-device')) {
    const menuTabs = new Tabs({
      tabSelector,
      btnSelector,
      eventType: 'mouseover',
    });

    menuTabs.init();
  } else {
    const buttons = document.querySelectorAll(btnSelector);
    const tabs = document.querySelectorAll(tabSelector);
    const tabsGroups = [[]];
    const swiperTemplate = document.querySelector('.menu__swiper');
    const swipersWrappers = document.querySelectorAll('.menu__dd-content-inner');
    const menuSwipers = [];

    let buttonParent = buttons[0].parentNode;
    let k = 0;

    for (let i = 0; i < buttons.length; i += 1) {
      if (buttonParent !== buttons[i].parentNode) {
        k += 1;
        buttonParent = buttons[i].parentNode;
        tabsGroups[k] = [];
      }
      tabsGroups[k].push(tabs[i]);
    }

    for (let i = 0; i < tabsGroups.length; i += 1) {
      const group = tabsGroups[i];
      const swiperEl = swiperTemplate.cloneNode(true);
      const wrapper = swiperEl.firstElementChild;

      for (let j = 0; j < group.length; j += 1) {
        const tab = group[j];
        tab.classList.remove('tab');
        tab.classList.add('swiper-slide');
        wrapper.appendChild(tab);
      }
      swiperEl.classList.add(`menu__swiper--${i + 1}`);
      swipersWrappers[i].appendChild(swiperEl);

      const swiper = new Swiper(`.menu__swiper--${i + 1}`, {
        slidesPerView: 1,
        speed: 800,
      });

      menuSwipers.push(swiper);
    }
  }
}());


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
