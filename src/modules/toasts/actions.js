const ADD_NEW_TOAST = 'app/toasts/ADD_NEW_TOAST';
const REMOVE_TOAST = 'app/toasts/REMOVE_TOAST';

const addNewToast = (payload) => ({
  type: ADD_NEW_TOAST,
  payload,
});

const removeToast = (payload) => ({
  type: REMOVE_TOAST,
  payload,
});

export const types = {
  ADD_NEW_TOAST,
  REMOVE_TOAST,
};

export const actions = {
  addNewToast,
  removeToast,
};
