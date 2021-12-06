import './index.scss';
import '../../assets/scripts/main';

import Lottie from 'lottie-web';
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import Tabs from '../../modules/tabs/tabs';
import Dropdowns from '../../modules/dropdowns/dropdowns';


// grow tabs init
const growTabs = new Tabs({
  tabSelector: '.grow-tabs__tab',
  btnSelector: '.grow-tabs__btn',
});
growTabs.init();

// quiz tabs init
const quizTabs = new Tabs({
  tabSelector: '.quiz__wrap, .quiz__wrap-2',
});
quizTabs.init();

// FAQ dropdowns init
const faqDropdowns = new Dropdowns({
  dropdownSelector: '.faq__item',
  contentSelector: '.faq__content',
});
faqDropdowns.init();


const quizLottieContainer = [...document.querySelectorAll('.quiz__lottie')];

const lottieQuizAnimPath = [
  './lottie/closer.json',
  './lottie/loan-officer-assistant.json',
  './lottie/branch-manager.json',
  './lottie/underwriter.json',
  './lottie/mortgage-advisor.json',
  './lottie/processor.json',
];

lottieQuizAnimPath.forEach((item, i) => {
  const animData = {
    container: quizLottieContainer[i], // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: lottieQuizAnimPath[i],
  };
  Lottie.loadAnimation(animData);
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
  const mmAAr = targetWidth / mmAA; // get available mousemove difference ratio

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
const stepNumber = document.querySelector('.quiz__step span');
const btnBack = document.querySelector('.btn-back');

quizCards.forEach((card) => {
  card.addEventListener('click', () => {
    quizTabs.goTo(1);
    stepNumber.textContent = '2';
  });
});

btnBack.addEventListener('click', () => {
  quizTabs.goTo(0);
  stepNumber.textContent = '1';
});

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
