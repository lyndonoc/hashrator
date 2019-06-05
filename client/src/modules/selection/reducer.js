import {
  STORAGE_KEYS,
  getStorage,
} from '../../lib/storage';
import { types } from './actions';

const initialState = {
  hoverIndex: null,
  isSelectingMultiple: false,
  lastSelectedMap: {},
  selected: getStorage(STORAGE_KEYS.selected) || [],
};

const selectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_SELECTED:
      return {
        ...state,
        selected: Array.from(new Set([
          ...state.selected,
          ...action.payload,
        ])),
      };

    case types.REGISTER_LAST_SELECTED_MAP:
      return {
        ...state,
        lastSelectedMap: {
          ...state.lastSelectedMap,
          [action.payload.searchTerm]: action.payload.index,
        },
      };

    case types.REMOVE_FROM_SELECTED:
      return {
        ...state,
        selected: state.selected.filter((tag) => tag !== action.payload),
      };

    case types.TOGGLE_SELECTING_MULTIPLE:
      return {
        ...state,
        hoverIndex: !action.payload
          ? initialState.hoverIndex
          : state.hoverIndex,
        isSelectingMultiple: action.payload,
      };

    case types.UNREGISTER_LAST_SELECTED_MAP:
      return {
        ...state,
        lastSelectedMap: Object
          .keys(state.lastSelectedMap)
          .reduce((acc, curr) => {
            if (curr !== action.payload.searchTerm) {
              return {
                ...acc,
                [curr]: acc[curr]
              };
            }
            return acc;
          }, {}),
      };

    case types.UPDATE_HOVER_INDEX:
      return {
        ...state,
        hoverIndex: action.payload,
      };

    default:
      return state;
  }
};

export default selectionReducer;
