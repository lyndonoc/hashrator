import { actions } from './actions';

const toggleHistoryPage = (payload) => (dispatch) => {
  dispatch(actions.toggleHistoryPage(payload));
};

const toggleSelectedPage = (payload) => (dispatch) => {
  dispatch(actions.toggleSelectedPage(payload));
};

export default {
  toggleHistoryPage,
  toggleSelectedPage,
};
