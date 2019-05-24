export const STORAGE_KEYS = {
  history: 'HASHRATOR_SEARCH_HISTORY',
  selected: 'HASHRATOR_SELECTED_TAGS',
};

export const getStorage = (key) => {
  if (!window || !window.localStorage) {
    return null;
  }

  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (e) {
    return window.localStorage.getItem(key);
  }
};

export const removeStorage = (key) => {
  if (!window || !window.localStorage) {
    return false;
  }

  return window.localStorage.removeItem(key);
};

export const setStorage = (key, val) => {
  if (!window || !window.localStorage) {
    return true;
  }

  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }

  return window.localStorage.setItem(key, val);
};
