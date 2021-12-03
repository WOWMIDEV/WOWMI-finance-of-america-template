import './module-carousel.scss';
import '../../assets/scripts/main';

import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

Swiper.use([Navigation, Pagination]);
// eslint-disable-next-line no-unused-vars
const swiper = new Swiper('.carousel', {
  spaceBetween: 112,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  loopedSlides: 1,

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    570: {
      spaceBetween: 40,
      slidesPerView: 'auto',
    },
    1024: {
      spaceBetween: 112,
      centeredSlides: true,
      loop: true,
      loopedSlides: 1,
    },
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
