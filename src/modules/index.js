import { combineReducers } from 'redux';

import layoutReducer from './layout';
import searchReducer from './search';
import toastsReducer from './toasts';

export default combineReducers({
  layout: layoutReducer,
  search: searchReducer,
  toasts: toastsReducer,
});
