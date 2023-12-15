import { isString, isObject } from './lang';

export const replaceLineBreaks = (str: any, tag = false) => {
  if (!isString(str)) return str || '';
  if (!tag) return str.replace(/\r\n|\n|\\n|\\r\\n/g, '<br />');
  const strExHtml = str
    .replace(/<[^>]+>/g, '')
    .replace(/\r\n|\n|\\n|\\r\\n/g, '');
  return strExHtml;
};

export const getProperties = () => {
  const div = document.createElement('div');

  return {
    transform: 'transform' in div.style ? 'transform' : '-webkit-transform',
    transition: 'transition' in div.style ? 'transition' : '-webkit-transition',
    duration:
      'transition-duration' in div.style
        ? 'transition-duration'
        : '-webkit-transition-duration',
  };
};

// fix error when value is null
export const letPxGo = (value: any) => Number((value || '').replace('px', ''));

export const getComputedProp = (el: any, prop: any) =>
  el instanceof Element ? window.getComputedStyle(el, null)[prop] : null;

export const getPropNumeric = (el: any, prop: any) => {
  if (!el) {
    return 0;
  }

  const value = letPxGo(getComputedProp(el, prop));

  return isNaN(value) ? 0 : value;
};

export const setStyle = (el: any, styles: any, keepStyle = false) => {
  if (isObject(styles)) {
    styles = Object.keys(styles).reduce(
      (style, key) => `${style} ${key}: ${styles[key]};`,
      '',
    );
  }

  if (!isString(styles)) {
    return;
  }

  el.style.cssText = (keepStyle ? el.style.cssText : '') + styles;
};

export const getAbsoultPosition = (el: any) => {
  const originalEle = el;
  let top = 0;
  let left = 0;

  while (el) {
    left += el.offsetLeft;
    top += el.offsetTop;
    el = el.offsetParent;
  }

  const zoom = getPropNumeric(originalEle, 'zoom');
  top *= zoom;
  left *= zoom;

  return { left, top };
};

export const getPositionAgainstRoot = (el: any) => {
  const { top, left } = el.getBoundingClientRect();
  const { scrollX, scrollY } = window;

  return {
    left: left + scrollX,
    top: top + scrollY,
  };
};

export const getScrollTop = () =>
  Math.max(
    document.body.scrollTop,
    document.documentElement.scrollTop,
    Math.abs(getPropNumeric(document.body, 'top')),
  );

const to = (scrollTop: any) => {
  document.body.scrollTop = scrollTop;
  document.documentElement.scrollTop = scrollTop;
};
const dialogOpenClass = 'dialog-open';
const scrollTop = null;

export function rem2Px(rem: any) {
  return getPropNumeric(document.documentElement, 'fontSize') * rem;
}
