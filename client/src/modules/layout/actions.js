const UPDATE_HOVER_INDEX = 'app/layout/UPDATE_HOVER_INDEX';
const TOGGLE_HISTORY_PAGE = 'app/layout/TOGGLE_HISTORY_PAGE';
const TOGGLE_SELECTED_PAGE = 'app/layout/TOGGLE_SELECTED_PAGE';
const TOGGLE_SELECTING_MULTIPLE = 'app/layout/TOGGLE_SELECTING_MULTIPLE';

const updateHoverIndex = (payload) => ({
  type: UPDATE_HOVER_INDEX,
  payload,
});

const toggleHistoryPage = (payload) => ({
  type: TOGGLE_HISTORY_PAGE,
  payload,
});

const toggleSelectedPage = (payload) => ({
  type: TOGGLE_SELECTED_PAGE,
  payload,
});

const toggleSelectingMultiple = (payload) => ({
  type: TOGGLE_SELECTING_MULTIPLE,
  payload,
});

export const types = {
  UPDATE_HOVER_INDEX,
  TOGGLE_HISTORY_PAGE,
  TOGGLE_SELECTED_PAGE,
  TOGGLE_SELECTING_MULTIPLE,
};

export const actions = {
  updateHoverIndex,
  toggleHistoryPage,
  toggleSelectedPage,
  toggleSelectingMultiple,
};
