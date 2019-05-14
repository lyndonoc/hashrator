import { types } from './actions';

const initialState = {
  currentIndex: 0,
  isLoading: false,
  results: {},
  selected: [],
  size: 50,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_SELECTED:
      return {
        ...state,
        selected: Array.from(new Set([
          ...state.selected,
          action.payload
        ])),
      };

    case types.CHANGE_SEARCH_INDEX:
      return {
        ...state,
        currentIndex: action.payload
      };

    case types.REMOVE_FROM_SELECTED:
      return {
        ...state,
        selected: state
          .selected
          .filter((tag) => tag !== action.payload)
      };

    case types.SET_SEARCH_RESULTS:
      return {
        ...state,
        results: {
          ...state.results,
          [action.payload.term]: {
            ...state.results[action.payload.term],
            isConsecutive: action.payload.isConsecutive,
            results: action.payload.isConsecutive
              ? Array.from(new Set([
                ...state.results[action.payload.term].results,
                ...action.payload.results,
              ]))
              : action.payload.results,
          }
        }
      };

    case types.TOGGLE_IS_SEARCHING:
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};

export default searchReducer;
