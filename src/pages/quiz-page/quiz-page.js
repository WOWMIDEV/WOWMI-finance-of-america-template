import './quiz-page.scss';
import '../../assets/scripts/main';

import Dropdowns from '../../modules/dropdowns/dropdowns';

// FAQ dropdowns init
const quizDropdowns = new Dropdowns({
  dropdownSelector: '.faq__item',
  toggleSelector: '.faq__question',
  contentSelector: '.faq__content',
  activeClass: 'js-open',
});

quizDropdowns.init();

const previewAnswer = document.querySelectorAll('.faq-quiz__answer-preview');
const faqQuizItem = document.querySelector('.quiz__item');
// const btnNextQuestion = document.querySelectorAll('.btn-next');
// const disabledItem = document.querySelectorAll('.faq-quiz__block');
const valueRadioBtn = document.querySelectorAll('[data-question = "1"] .faq-quiz__radio');


// получить все значения радио кнопок
// заблокировать вопрос, если не выбран предыдущий
//

valueRadioBtn.forEach((radio) => {
  radio.addEventListener('change', () => {
    console.log(radio.value);
    previewAnswer.textContent = radio.value;
    faqQuizItem.classList.add('js-fill');
  });
});
