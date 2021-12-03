import './branch-manager.scss';
import '../../assets/scripts/main';

import Tabs from '../../modules/tabs/tabs';
import initDD from '../../modules/dropdowns/dropdowns';

const tabs = new Tabs({
  tabSelector: '.tab',
  btnSelector: '.tabs__nav-btn',
});

tabs.init();

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
