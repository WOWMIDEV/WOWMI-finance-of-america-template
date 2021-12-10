import './branch-manager.scss';
import '../../assets/scripts/main';

import Lottie from 'lottie-web';
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import Tabs from '../../modules/tabs/tabs';
import Dropdowns from '../../modules/dropdowns/dropdowns';

const tabs = new Tabs({
  tabSelector: '.types-tabs__tab',
  btnSelector: '.tabs__nav-btn',
});
tabs.init();

const dropdowns = new Dropdowns({
  dropdownSelector: '.faq__item',
  contentSelector: '.faq__content',
});
dropdowns.init();

Lottie.loadAnimation({
  container: document.querySelector('.lottie'), // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: './lottie/branch-manager.json', // the path to the animation json
});

Swiper.use([Navigation, Pagination]);
// eslint-disable-next-line no-unused-vars
const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 800,
  dynamicBullets: true,
  dynamicMainBullets: 3,

  navigation: {
    nextEl: '.reviews__slider-btn--next',
    prevEl: '.reviews__slider-btn--prev',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  breakpoints: {
    // when window width is >= 320px
    570: {
      slidesPerView: 'auto',
      spaceBetween: 20,
    },
  },
});
