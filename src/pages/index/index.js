import './index.scss';
import '../../assets/scripts/main';

import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import Tabs from '../../modules/tabs/tabs';
import Dropodowns from '../../modules/dropdowns/dropdowns';

const tabs = new Tabs({
  tabSelector: '.tab',
  btnSelector: '.tabs__nav-btn',
});

tabs.init();

Swiper.use([Navigation, Pagination]);
// eslint-disable-next-line no-unused-vars
const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 30,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const menuBtn = document.querySelector('.header__burger');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('js--open');
});
