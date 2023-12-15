import storage from './storage';
const TokenKey = 'Token';

export function getToken() {
  return storage.get(TokenKey) || '';
}

export function setToken(token: string) {
  storage.set(TokenKey, token, 23 * 60 * 60 * 1000);
}

export function removeToken() {
  storage.remove(TokenKey);
}
