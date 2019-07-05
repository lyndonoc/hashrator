import {
  STORAGE_KEYS,
  getStorage,
} from '../../lib/storage';
import { types } from './actions';

export const initialState = getStorage(STORAGE_KEYS.history) || [];

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_NEW_HISTORY:
      return state.concat(action.payload);

    case types.CLEAR_HISTORY:
      return [];

    case types.REMOVE_HISTORY:
      return state.filter((history) => {
        return history.tag !== action.payload.tag
          && history.timestamp !== action.payload.timestamp;
      });

    default:
      return state;
  }
};

export default historyReducer;
