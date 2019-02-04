import { types } from './actions';

import { isMobile } from '../../lib/is-mobile';

const initialState = {
  isMobile: isMobile(),
  isSelectedPageOpen: false,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_SELECTED_PAGE:
      return {
        ...state,
        isSelectedPageOpen: action.payload,
      };

    default:
      return state;
  }
};

export default layoutReducer;
