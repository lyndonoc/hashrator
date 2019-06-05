const ADD_TO_SELECTED = 'app/selection/ADD_TO_SELECTED';
const REGISTER_LAST_SELECTED_MAP = 'app/selection/REGISTER_LAST_SELECTED_MAP';
const REMOVE_FROM_SELECTED = 'app/selection/REMOVE_FROM_SELECTED';
const TOGGLE_SELECTING_MULTIPLE = 'app/selection/TOGGLE_SELECTING_MULTIPLE';
const UNREGISTER_LAST_SELECTED_MAP = 'app/selection/UNREGISTER_LAST_SELECTED_MAP';
const UPDATE_HOVER_INDEX = 'app/selection/UPDATE_HOVER_INDEX';

const addToSelected = (payload) => ({
  type: ADD_TO_SELECTED,
  payload,
});

const registerLastSelectedMap = (payload) => ({
  type: REGISTER_LAST_SELECTED_MAP,
  payload,
});

const removeFromSelected = (payload) => ({
  type: REMOVE_FROM_SELECTED,
  payload,
});

const toggleSelectingMultiple = (payload) => ({
  type: TOGGLE_SELECTING_MULTIPLE,
  payload,
});

const unRegisterLastSelectedMap = (payload) => ({
  type: UNREGISTER_LAST_SELECTED_MAP,
  payload,
});

const updateHoverIndex = (payload) => ({
  type: UPDATE_HOVER_INDEX,
  payload,
});

export const types = {
  ADD_TO_SELECTED,
  REGISTER_LAST_SELECTED_MAP,
  REMOVE_FROM_SELECTED,
  TOGGLE_SELECTING_MULTIPLE,
  UNREGISTER_LAST_SELECTED_MAP,
  UPDATE_HOVER_INDEX,
};

export const actions = {
  addToSelected,
  registerLastSelectedMap,
  removeFromSelected,
  toggleSelectingMultiple,
  unRegisterLastSelectedMap,
  updateHoverIndex,
};
