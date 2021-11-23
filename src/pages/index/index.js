import './index.scss';
import '../../assets/scripts/main';

import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import Tabs from '../../modules/tabs/tabs';
import initDD from '../../modules/dropdowns/dropdowns';

const tabs = new Tabs({
  tabSelector: '.tab',
  btnSelector: '.tabs__nav-btn',
});

tabs.init();

Swiper.use([Navigation, Pagination]);
// eslint-disable-next-line no-unused-vars
const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 20,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const menuBtn = document.querySelector('.header__burger');
const header = document.querySelector('.header');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('js-open');
  header.classList.toggle('js-open');
});

window.addEventListener('load', () => {
  initDD({
    ddSelector: '.faq__item',
    contentSelector: '.faq__content',
  });
});

window.addEventListener('resize', () => {
  initDD({
    ddSelector: '.faq__item',
    contentSelector: '.faq__content',
  });
});

// const $bl = document.querySelector('.blog-posts__category'),
//   $th = document.querySelector('.category--blog'),
//   blW = $bl.offsetWidth(),
//   blSW = $bl[0].scrollWidth,
//   wDiff = blSW / blW - 1, // widths difference ratio
//   mPadd = 60, // Mousemove Padding
//   damp = 20, // Mousemove response softness
//   mX = 0, // Real mouse position
//   mX2 = 0, // Modified mouse position
//   posX = 0,
//   mmAA = blW - mPadd * 2, // The mousemove available area
//   mmAAr = blW / mmAA;

// var $bl = $('.blog-posts__category'),
//   $th = $('.category--blog'),
//   blW = $bl.outerWidth(),
//   blSW = $bl[0].scrollWidth,
//   wDiff = blSW / blW - 1, // widths difference ratio
//   mPadd = 60, // Mousemove Padding
//   damp = 20, // Mousemove response softness
//   mX = 0, // Real mouse position
//   mX2 = 0, // Modified mouse position
//   posX = 0,
//   mmAA = blW - mPadd * 2, // The mousemove available area
//   mmAAr = blW / mmAA; // get available mousemove fidderence ratio

// $bl.mousemove(function (e) {
//   mX = e.pageX - this.offsetLeft;
//   mX2 = Math.min(Math.max(0, mX - mPadd), mmAA) * mmAAr;
// });

// setInterval(function () {
//   posX += (mX2 - posX) / damp; // zeno's paradox equation "catching delay"
//   $th.css({
//     marginLeft: -posX * wDiff,
//   });
// }, 10);
