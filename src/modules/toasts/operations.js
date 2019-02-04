import { actions } from './actions';

const addNewToast = (message, type = 'success', timeout = 1500) => (dispatch) => {
  const id = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now();

  dispatch(actions.addNewToast({
    id,
    message,
    type,
    timeout,
  }));

  setTimeout(() => {
    dispatch(actions.removeToast(id));
  }, timeout);
};

const removeToast = (payload) => (dispatch) => {
  dispatch(actions.removeToast(payload));
};

export default {
  addNewToast,
  removeToast,
};
