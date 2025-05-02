const USER_STORAGE_KEY = 'EMIPD_DASHBOARD';

const { localStorage } = window;

export const saveUserInformation = (userInfo) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userInfo));
};

export const getUserInformation = () =>
  localStorage.getItem(USER_STORAGE_KEY);

export const removeUserInformation = () =>
  localStorage.removeItem(USER_STORAGE_KEY);
