import { actions } from './actions';

const toggleSelectedPage = (payload) => (dispatch) => {
  dispatch(actions.toggleSelectedPage(payload));
};

export default {
  toggleSelectedPage,
};
