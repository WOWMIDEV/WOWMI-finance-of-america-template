import './module.scss';
import '../../assets/scripts/main';

import Dropdowns from '../../modules/dropdowns/dropdowns';

const dropdowns = new Dropdowns({
  dropdownSelector: '.faq__item',
  contentSelector: '.faq__content',
});
dropdowns.init();
