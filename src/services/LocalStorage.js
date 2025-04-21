import * as Constants from '@constants/StorageKey';
import secureLocalStorage from 'react-secure-storage';

// Set & remove data from local storage
const set = (key, value) => {
	return secureLocalStorage.setItem(key, JSON.stringify(value));
};

const get = (key) => {
	const value = secureLocalStorage.getItem(key);
	return value ? JSON.parse(value) : null;
};

export const setToken = (v) => set(Constants.TOKEN, v);
export const getToken = () => get(Constants.TOKEN);

export const setUserId = (v) => set(Constants.USER_ID, v);
export const getUserId = () => get(Constants.USER_ID);

export const setUserRole = (v) => set(Constants.USER_ROLE, v);
export const getUserRole = () => get(Constants.USER_ROLE);

export const setUserName = (v) => set(Constants.USER_NAME, v);
export const getUserName = () => get(Constants.USER_NAME);

export const setUserEmail = (v) => set(Constants.USER_EMAIL, v);
export const getUserEmail = () => get(Constants.USER_EMAIL);

export const setSessionExpiration = (v) => set(Constants.SESSION_EXPIRATION, v);
export const getSessionExpiration = () => get(Constants.SESSION_EXPIRATION);

export const clearSessionData = () => {
	secureLocalStorage.clear();
};