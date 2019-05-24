import { combineReducers } from 'redux';

import historyReducer from './history';
import layoutReducer from './layout';
import searchReducer from './search';
import toastsReducer from './toasts';

export default combineReducers({
  history: historyReducer,
  layout: layoutReducer,
  search: searchReducer,
  toasts: toastsReducer,
});
