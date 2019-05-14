import { types } from './actions';

const initialState = [];

const toastsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_NEW_TOAST:
      return [
        ...state,
        action.payload,
      ];

    case types.REMOVE_TOAST:
      return [
        ...state.filter((toast) => {
          return toast.id !== action.payload;
        })
      ];

    default:
      return state;
  }
};

export default toastsReducer;
