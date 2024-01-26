import {EMPTY_CHAR} from '../helpers/_empty';

export const getProvincFromPop = pop =>
  typeof pop === 'string' ? pop.slice(0, 3) : null;

export function capitalizeFLetter(string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return EMPTY_CHAR;
  }
}

export function cutEmail(email) {
  if (email) {
    const index = email?.indexOf('@');
    return email?.slice(0, index);
  } else {
    return EMPTY_CHAR;
  }
}
