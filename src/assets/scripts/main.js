import '../styles/main.scss';

import AOS from 'aos';
import 'aos/dist/aos.css';
import SmoothScroll from 'smooth-scroll';

import Swiper, { Navigation, Pagination, EffectFade } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/effect-fade/effect-fade.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import Dropdowns from '../../modules/dropdowns/dropdowns';
import Tabs from '../../modules/tabs/tabs';

Swiper.use([Navigation, Pagination, EffectFade]);

const observerConfig = {
  attributes: true,
  childList: false,
  subtree: false,
};

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

  const swiperTemplate = document.querySelector('.menu__swiper');

  if (!document.body.classList.contains('touch-device')) {
    const menuTabs = new Tabs({
      tabSelector,
      btnSelector,
      eventType: 'mouseover',
    });

    menuTabs.init();
  } else {
    const buttons = document.querySelectorAll(btnSelector);
    const tabs = [...document.querySelectorAll(tabSelector)];
    const tabsGroups = [[]];
    const swipersWrappers = document.querySelectorAll(
      '.menu__dd-content-inner',
    );
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
        effect: 'fade',
      });

      menuSwipers.push(swiper);
    }

    const ddCallback = function goToFirstSlide(mutationsList) {
      // eslint-disable-next-line no-restricted-syntax
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          const dropdown = mutation.target;
          const swiperIndex = menuDropdowns.dropdowns.findIndex(
            (dd) => dd.dropdownElement === dropdown,
          );

          if (dropdown.classList.contains(menuDropdowns.activeClass)) {
            menuSwipers[swiperIndex].slideTo(0);
          }
        }
      }
    };

    setTimeout(() => {
      menuDropdowns.open(0);
    }, 1000);

    const activeDropdownObserver = new MutationObserver(ddCallback);
    menuDropdowns.dropdowns.forEach((dropdown) => {
      activeDropdownObserver.observe(dropdown.dropdownElement, observerConfig);
    });

    const callback = function activeSlideToActiveTabcallback(mutationsList) {
      // eslint-disable-next-line no-restricted-syntax
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          const tab = mutation.target;
          if (tab.classList.contains('swiper-slide-active')) {
            const tabIndex = tabs.indexOf(tab);
            buttons.forEach((btn) => {
              btn.classList.remove('js--active');
            });
            buttons[tabIndex].classList.add('js--active');
          }
        }
      }
    };
    const activeTabObserver = new MutationObserver(callback);
    tabs.forEach((tab) => {
      activeTabObserver.observe(tab, observerConfig);
    });
  }
  swiperTemplate.remove();
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

function toggle() {
  const video = document.querySelector('.video');

  video.classList.toggle('js-active');
}
