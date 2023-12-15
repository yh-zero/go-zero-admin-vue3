/**
 * 获取单个assets静态资源
 * @param url
 * @param fileName
 * @returns
 */
export function getAssetsFile(url: string, fileName: string) {
  return new URL(`../assets/${url}/${fileName}`, import.meta.url).href;
}
export function getAFile(url: string) {
  return new URL(`../assets/${url}`, import.meta.url).href;
}
/**
 *  顺序获取多个assets静态资源 未完善
 * @param url
 * @param assets
 * @returns
 */
export function getAssetsFiles(url: string, assets?: string[]) {
  return [];
}
