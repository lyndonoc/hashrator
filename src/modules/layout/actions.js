const TOGGLE_SELECTED_PAGE = 'app/layout/TOGGLE_SELECTED_PAGE';

const toggleSelectedPage = (payload) => ({
  type: TOGGLE_SELECTED_PAGE,
  payload,
});

export const types = {
  TOGGLE_SELECTED_PAGE
};

export const actions = {
  toggleSelectedPage
};
