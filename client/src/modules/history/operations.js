import { actions } from './actions';
import {
  STORAGE_KEYS,
  getStorage,
  setStorage,
} from '../../lib/storage';

const addNewHistory = (payload) => (dispatch) => {
  const existingHistory = getStorage(STORAGE_KEYS.history) || [];
  setStorage(
    STORAGE_KEYS.history,
    existingHistory.concat(payload),
  );
  dispatch(actions.addNewHistory(payload));
};

const clearHistory = (payload) => (dispatch) => {
  setStorage(
    STORAGE_KEYS.history,
    [],
  );
  dispatch(actions.clearHistory(payload));
};

const removeHistory = (payload) => (dispatch) => {
  const existingHistory = getStorage(STORAGE_KEYS.history) || [];
  const newHistory = existingHistory.filter((history) => {
    return history.tag !== payload.tag && history.timestamp !== payload.timestamp;
  });

  setStorage(
    STORAGE_KEYS.history,
    newHistory,
  );
  dispatch(actions.removeHistory(payload));
};

export default {
  addNewHistory,
  clearHistory,
  removeHistory,
};
