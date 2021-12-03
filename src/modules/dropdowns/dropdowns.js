function initDD({
  ddSelector,
  contentSelector,
  toggleSelector = '',
  eventType = 'click',
  openClass = 'js-open',
}) {
  const ddList = [...document.querySelectorAll(ddSelector)].filter((el) => {
    if (!el.querySelector(contentSelector)) {
      el.querySelector(toggleSelector).remove();
      return false;
    }
    return true;
  });

  const contentHeights = [];
  let openedDdIndex;

  for (let i = 0; i < ddList.length; i += 1) {
    const dd = ddList[i];
    const toggle = !!toggleSelector.length
      ? dd.querySelector(toggleSelector)
      : dd;
    const content = dd.querySelector(contentSelector);

    contentHeights.push(content.querySelector('*').clientHeight);

    toggle.addEventListener(eventType, (event) => {
      event.stopPropagation();
      if (openedDdIndex === i) {
        close(i);
      } else {
        open(i);
      }
    });
    close(i);
  }
  function close(i) {
    if (!(+i + 1)) {
      return;
    }
    const dd = ddList[i];
    const content = dd.querySelector(contentSelector);
    dd.classList.remove(openClass);
    content.style.height = '0px';
    openedDdIndex = undefined;
  }
  function open(i) {
    close(openedDdIndex);
    openedDdIndex = i;
    const dd = ddList[i];
    const content = dd.querySelector(contentSelector);
    dd.classList.add(openClass);
    content.style.height = `${contentHeights[i]}px`;
  }
}

export default initDD;
