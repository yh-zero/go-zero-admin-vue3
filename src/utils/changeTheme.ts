// src/style.css

// 修改背景颜色
export function checkThemebg(color: string) {
  document.documentElement.style.setProperty(`--themebg`, color);
}
// 修改背景颜色
export function checkTextColor(color: string) {
  document.documentElement.style.setProperty(`--textColor`, color);
}
