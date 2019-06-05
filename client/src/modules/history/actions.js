const ADD_NEW_HISTORY = 'app/history/ADD_NEW_HISTORY';
const CLEAR_HISTORY = 'app/history/CLEAR_HISTORY';
const REMOVE_HISTORY = 'app/history/REMOVE_HISTORY';

const addNewHistory = (payload) => ({
  type: ADD_NEW_HISTORY,
  payload,
});

const clearHistory = (payload) => ({
  type: CLEAR_HISTORY,
  payload,
});

const removeHistory = (payload) => ({
  type: REMOVE_HISTORY,
  payload,
});

export const types = {
  ADD_NEW_HISTORY,
  CLEAR_HISTORY,
  REMOVE_HISTORY,
};

export const actions = {
  addNewHistory,
  clearHistory,
  removeHistory,
};
