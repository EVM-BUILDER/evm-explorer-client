/* eslint-disable import/no-extraneous-dependencies */
import Cookies from 'js-cookie';
import _isString from 'lodash/isString';
import { TOKEN_KEY } from 'config/constants';

export default {
  set(key, rawValue, option) {
    const value = _isString(rawValue) ? rawValue : JSON.stringify(rawValue);

    Cookies.set(key, value, option);
  },
  get(key) {
    const value = Cookies.get(key) || "";

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  },

  remove(key) {
    Cookies.remove(key);
  },
  removeAll() {
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  },

  setToken(value, option) {
    this.set(TOKEN_KEY, value, option);
  },
  getToken() {
    return this.get(TOKEN_KEY);
  },
};


export const getTokenFromCookie = cookies => {
  let token = null
  if (typeof cookies === 'string' && cookies.length > 1) {
    const datatoken = cookies.split(';').filter(data => data.search(TOKEN_KEY) !== -1) || ['']
    const tokens = datatoken[0] ? datatoken[0].split('=') : datatoken
    token = tokens.length === 2 && tokens[1]
  }
  return token
}

export const protectPage = (req) => {
  const cookies = (req && req.headers && req.headers.cookie) || ''
  const token = getTokenFromCookie(cookies)
  return token;
}