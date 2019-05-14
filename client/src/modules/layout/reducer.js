import { types } from './actions';

import { isMobile } from '../../lib/is-mobile';

const initialState = {
  hoverIndex: null,
  isMobile: isMobile(),
  isSelectedPageOpen: false,
  isSelectingMultiple: false,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_HOVER_INDEX:
      return {
        ...state,
        hoverIndex: action.payload,
      };

    case types.TOGGLE_SELECTED_PAGE:
      return {
        ...state,
        isSelectedPageOpen: action.payload,
      };

    case types.TOGGLE_SELECTING_MULTIPLE:
      return {
        ...state,
        hoverIndex: action.payload
          ? state.hoverIndex
          : initialState.hoverIndex,
        isSelectingMultiple: action.payload,
      };

    default:
      return state;
  }
};

export default layoutReducer;
