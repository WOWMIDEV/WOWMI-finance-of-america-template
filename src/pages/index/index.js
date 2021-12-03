import './index.scss';
import '../../assets/scripts/main';

import Lottie from 'lottie-web';
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
  speed: 800,

  navigation: {
    nextEl: '.reviews__slider-btn--next',
    prevEl: '.reviews__slider-btn--prev',
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

Lottie.loadAnimation({
  container: document.querySelector('.quiz__lottie'), // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '../assets/images/Closer.json', // the path to the animation json
});

function initMousemoveHandler({
  wrapperSelector,
  targetSelector,
  padding = 60,
  softness = 20,
}) {
  const wrapper = document.querySelector(wrapperSelector);
  const target = document.querySelector(targetSelector);

  const targetWidth = target.clientWidth;
  const targetScrollWidth = target.scrollWidth;
  const widthDifferenceRatio = targetScrollWidth / targetWidth - 1;

  let mX = 0; // Real mouse position
  let mX2 = 0; // Modified mouse position
  let posX = 0;
  const mmAA = targetWidth - padding * 2; // The mousemove available area
  const mmAAr = targetWidth / mmAA; // get available mousemove fidderence ratio

  target.addEventListener('mousemove', (event) => {
    mX = event.pageX - target.offsetLeft;
    mX2 = Math.min(Math.max(0, mX - padding), mmAA) * mmAAr;
  });

  setInterval(() => {
    posX += (mX2 - posX) / softness; // zeno's paradox equation "catching delay"
    wrapper.style.marginLeft = `${-posX * widthDifferenceRatio}px`;
  }, 10);
}

initMousemoveHandler({
  wrapperSelector: '.quiz__wrap',
  targetSelector: '.quiz',
});

const quizCards = document.querySelectorAll('.quiz__card');
const quizWrap = document.querySelector('.quiz__wrap');
const quizWrapStep2 = document.querySelector('.quiz__wrap-2');
const stepNumber = document.querySelector('.quiz__step span');
const btnBack = document.querySelector('.btn-back');

quizCards.forEach((card) => {
  card.addEventListener('click', () => {
    quizWrap.classList.add('js-hide');
    quizWrapStep2.classList.add('js-visible');
    stepNumber.textContent = '2';
  });
});

btnBack.addEventListener('click', () => {
  quizWrapStep2.classList.remove('js-visible');
  quizWrap.classList.remove('js-hide');
});
