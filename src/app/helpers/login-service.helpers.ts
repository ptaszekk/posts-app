import { LocalStorageKeys } from '../constants/app.constants';

export const isUserSavedInLocalStorage = (): boolean => {
  const loggedUser = localStorage.getItem(LocalStorageKeys.LOGGED_USER);
  return loggedUser !== 'undefined' && loggedUser !== null
}
