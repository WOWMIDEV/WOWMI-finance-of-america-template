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

// const $bl = document.querySelector('.quiz');
// const $th = document.querySelector('.quiz__wrap');
// const blW = $bl.offsetWidth;
// const blSW = $bl.scrollWidth;
// const wDiff = blSW / blW - 1; // widths difference ratio
// const mPadd = 60; // Mousemove Padding
// const damp = 20; // Mousemove response softness
// let mX = 0; // Real mouse position
// let mX2 = 0; // Modified mouse position
// let posX = 0;
// const mmAA = blW - mPadd * 2; // The mousemove available area
// const mmAAr = blW / mmAA;

// $bl.addEventListener('mousemove', (e) => {
//   mX = e.pageX - $bl.offsetLeft;
//   mX2 = Math.min(Math.max(0, mX - mPadd), mmAA) * mmAAr;
// });

// (function delay() {
//   posX += (mX2 - posX) / damp;
//   const marginLeft = `${-posX * wDiff} + "px"`;
//   $th.style.marginLeft = marginLeft;
// })();
// delay();

const quizCards = document.querySelectorAll('.quiz__card');
const quizWrap = document.querySelector('.quiz__wrap');
const quizWrapStep2 = document.querySelector('.quiz-step-2');
const stepNumber = document.querySelector('.quiz__step span');
const btnBack = document.querySelector('.btn-back');

quizCards.forEach((card) => {
  card.addEventListener('click', () => {
    quizWrap.classList.add('js-hide');
    quizWrapStep2.classList.add('js-visible');
    stepNumber.textContent = 2;
  });
});

btnBack.addEventListener('click', () => {
  quizWrapStep2.classList.remove('js-visible');
  quizWrap.classList.remove('js-hide');
});
