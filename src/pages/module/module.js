import './module.scss';
import '../../assets/scripts/main';

import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import Dropdowns from '../../modules/dropdowns/dropdowns';

const dropdowns = new Dropdowns({
  dropdownSelector: '.faq__item',
  contentSelector: '.faq__content',
});
dropdowns.init();

Swiper.use([Navigation, Pagination]);
// eslint-disable-next-line no-unused-vars
const swiper = new Swiper('.video-slider', {
  spaceBetween: 40,
  slidesPerView: 'auto',

  breakpoints: {
    810: {
      slidesPerView: 1,
      loop: false,
      spaceBetween: 0,
    },
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.video-slider__next',
    prevEl: '.video-slider__prev',
  },
});
