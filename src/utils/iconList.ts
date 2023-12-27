import storage from './storage';
const keyName = 'iconList';
// 保存图标
export function setIcon(iconList: string[]) {
  storage.set(keyName, iconList);
}

export function getIcon(): string[] {
  return storage.get(keyName);
}
