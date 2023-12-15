// import offlineStore from 'store/dist/store.modern';

/**
 * 检测类型
 */
const { toString } = Object.prototype;
const is = (type: any) => (obj: any) =>
  toString.call(obj) === `[object ${type}]`;

export const isRegExp = is('RegExp');

export const isString = is('String');

export const isFunction = is('Function');

export const isObject = is('Object');

export const isArray = is('Array');

export const isNumber = is('Number');

export const isDate = is('Date');

export const isError = is('Error');

export const isDigital = (n: any) => /^\d+$/.test(n);

export const isDefined = (n: any) => typeof n !== 'undefined';

export const isUndefined = (n: any) => !isDefined(n);

export const isHex = (n: any) => {
  n = String(n);
  const len = n.length;

  return (len === 3 || len === 6) && /^[0-9a-f]+$/g.test(n);
};

export const hasOwnProperty = (obj: any, key: any) =>
  Object.prototype.hasOwnProperty.call(obj, key);

export const is32Hash = (value: any) => value.length === 32;

// 某个 fn 的结果为 true，说明此 fn 成功执行完成，否则，认为其中有报错
export const pipelineFns = async (...fns: any) => {
  fns = fns.filter((fn: any) => isFunction(fn));
  for (let i = 0; i < fns.length; i += 1) {
    const res = await fns[i](); // eslint-disable-line no-await-in-loop
    if (!res) return;
  }
};

// 不带四舍五入的fixed
export const toFixedNoCarry = (num: any, len: any) => {
  num = `${num}`;
  const [integet, decimal] = num.split('.');
  if (!decimal) return integet;
  return decimal ? `${integet}.${decimal.substr(0, len)}` : integet;
};
