import { types } from './actions';

import { isMobile } from '../../lib/is-mobile';

const initialState = {
  isMobile: isMobile(),
  isHistoryPageOpen: false,
  isSelectedPageOpen: false,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.TOGGLE_HISTORY_PAGE:
      return {
        ...state,
        isHistoryPageOpen: action.payload,
        isSelectedPageOpen: false,
      };

    case types.TOGGLE_SELECTED_PAGE:
      return {
        ...state,
        isHistoryPageOpen: false,
        isSelectedPageOpen: action.payload,
      };

    default:
      return state;
  }
};

export default layoutReducer;
