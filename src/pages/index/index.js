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


const quizCards = document.querySelectorAll('.quiz__card');
const stepNumber = document.querySelector('.quiz__step span');
const btnBack = document.querySelector('.btn-back');
const quizTitle = document.querySelector('.quiz__title');

quizCards.forEach((card) => {
  card.addEventListener('click', () => {
    quizTabs.goTo(1);
    stepNumber.textContent = '2';
    quizTitle.textContent = 'Select the type of assistance';
  });
});

btnBack.addEventListener('click', () => {
  quizTabs.goTo(0);
  stepNumber.textContent = '1';
  quizTitle.textContent = 'Сhoose who you are';
});

const reviewsDropdowns = new Dropdowns(
  {
    dropdownSelector: '.reviews__slide',
    contentSelector: '.reviews__dropdown',
    eventType: 'none',
    initialDropdowns: [0],
  },
);
reviewsDropdowns.init();

function setMinReviewsHeight(swiper) {
  setTimeout(() => {
    const firstSlide = swiper.slides[0];
    const wrp = swiper.$wrapperEl[0];
    wrp.style.minHeight = `${firstSlide.clientHeight}px`;
  }, 2000);
}

Swiper.use([Navigation, Pagination]);
// eslint-disable-next-line no-unused-vars
const reviewsSwiper = new Swiper('.swiper', {
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

  on: {
    activeIndexChange: () => {
      reviewsDropdowns.open(reviewsSwiper.activeIndex);
    },
    init: setMinReviewsHeight,
  },
});


function isTouchDevice() {
  return 'ontouchstart' in document.documentElement;
}

if (isTouchDevice()) {
  document.querySelector('body').classList.add('touch-device');
} else {
  document.querySelector('body').classList.remove('touch-device');
}

const quizSteps = document.querySelectorAll('.quiz__tab .quiz__wrap-grid, .quiz__tab .quiz-step-2');

if (!isTouchDevice()) {
  initMousemoveHandler({
    wrapperSelector: '.quiz__wrap-grid',
    targetSelector: '.quiz',
  });
  quizSteps.forEach((step) => {
    step.classList.remove('swipe');
  });
} else {
  quizSteps.forEach((step) => {
    step.classList.add('swipe');
  });
}


const sectionFuture = document.querySelector('.future');

sectionFuture.addEventListener('aos:in', ({ detail }) => {
  console.log('animated in', detail);
});

sectionFuture.addEventListener('aos:out', ({ detail }) => {
  console.log('animated out', detail);
});

