// 是否移动端
export function isMobail() {
  const flag =
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
    ) || document.body.clientWidth < 750;
  return flag;
}

//判断是否横屏
export function isHorizontal() {
  const width = document.documentElement.clientWidth; //视窗宽
  const height = document.documentElement.clientHeight; //视窗高
  // return width <= height
  if (window.orientation === 180 || window.orientation === 0) {
    return false;
  }
  if (window.orientation === 90 || window.orientation === -90) {
    return true;
  }
}

// 判断是否微信打开
export function ixWx() {
  const ua = window.navigator.userAgent.toLowerCase();
  return /MicroMessenger/i.test(ua);
}
