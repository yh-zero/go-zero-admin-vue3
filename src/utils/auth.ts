import storage from './storage';
const TokenKey = 'Authorization';

export function getStorageToken() {
  return storage.get(TokenKey) || '';
}

export function setStorageToken(token: string) {
  storage.set(TokenKey, token, 23 * 60 * 60 * 1000);
}

export function removeStorageToken() {
  storage.remove(TokenKey);
}
