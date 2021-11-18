import '../../assets/scripts/main';
import Tabs from '../../modules/tabs/tabs';
import './tabs-page.scss';

const tabs = new Tabs({
  tabSelector: '.tab',
  btnSelector: '.tabs__nav-btn',
});
tabs.init();
