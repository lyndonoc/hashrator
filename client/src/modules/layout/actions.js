const TOGGLE_HISTORY_PAGE = 'app/layout/TOGGLE_HISTORY_PAGE';
const TOGGLE_SELECTED_PAGE = 'app/layout/TOGGLE_SELECTED_PAGE';

const toggleHistoryPage = (payload) => ({
  type: TOGGLE_HISTORY_PAGE,
  payload,
});

const toggleSelectedPage = (payload) => ({
  type: TOGGLE_SELECTED_PAGE,
  payload,
});

export const types = {
  TOGGLE_HISTORY_PAGE,
  TOGGLE_SELECTED_PAGE,
};

export const actions = {
  toggleHistoryPage,
  toggleSelectedPage,
};
