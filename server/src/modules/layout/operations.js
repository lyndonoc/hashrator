import { actions } from './actions';

const updateHoverIndex = (payload) => (dispatch) => {
  dispatch(actions.updateHoverIndex(payload));
};

const toggleSelectedPage = (payload) => (dispatch) => {
  dispatch(actions.toggleSelectedPage(payload));
};

const toggleSelectingMultiple = (payload) => (dispatch) => {
  dispatch(actions.toggleSelectingMultiple(payload));
};

export default {
  updateHoverIndex,
  toggleSelectedPage,
  toggleSelectingMultiple,
};
