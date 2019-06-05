import { combineReducers } from 'redux';

import historyReducer from './history';
import layoutReducer from './layout';
import searchReducer from './search';
import selectionReducer from './selection';
import toastsReducer from './toasts';

export default combineReducers({
  history: historyReducer,
  layout: layoutReducer,
  search: searchReducer,
  selection: selectionReducer,
  toasts: toastsReducer,
});
