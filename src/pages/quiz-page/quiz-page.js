import './quiz-page.scss';
import '../../assets/scripts/main';

import Dropdowns from '../../modules/dropdowns/dropdowns';

// FAQ dropdowns init
const quizDropdowns = new Dropdowns({
  dropdownSelector: '.faq__item',
  toggleSelector: '.faq__question',
  contentSelector: '.faq__content',
  activeClass: 'js--active',
  initialDropdowns: [0],
});

quizDropdowns.init();

// const previewAnswer = document.querySelectorAll('.faq-quiz__answer-preview');
// const faqQuizItem = document.querySelectorAll('.quiz__item');
// // const btnNextQuestion = document.querySelectorAll('.btn-next');
// // const disabledItem = document.querySelectorAll('.faq-quiz__block');
// const valueRadioBtn = document.querySelectorAll('[data-question] .faq-quiz__radio');
//
//
// // получить все значения радио кнопок
// // заблокировать вопрос, если не выбран предыдущий
// //
//
// valueRadioBtn.forEach((radio, i) => {
//   radio.addEventListener('change', () => {
//     console.log(radio.value);
//     previewAnswer.textContent = radio.value;
//     faqQuizItem[i].classList.add('js--filled');
//   });
// });

(function initQuiz() {
  const radioButtons = document.querySelectorAll('.faq-quiz__radio');
  const nextButtons = document.querySelectorAll('.btn-next');

  radioButtons.forEach((radio) => {
    radio.addEventListener('change', () => {
      const quizStep = radio.closest('.quiz__item');
      const answerPreview = quizStep.querySelector('.faq-quiz__answer-preview');
      const nextButton = quizStep.querySelector('.btn-next');
      const labelText = radio.nextElementSibling.textContent;

      quizStep.classList.add('js--filled');
      answerPreview.textContent = labelText;
      nextButton.removeAttribute('disabled');
    });
  });

  nextButtons.forEach((button, i) => {
    button.addEventListener('click', () => {
      quizDropdowns.open(i + 1);
    });
  });

  console.log([...radioButtons].filter((r) => r.checked));
}());
