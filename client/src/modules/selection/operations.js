import { actions } from './actions';
import {
  STORAGE_KEYS,
  getStorage,
  setStorage,
} from '../../lib/storage';

const addToSelected = (payload, index) => (dispatch, getState) => {
  const {
    search: {
      currentIndex,
      results,
    },
  } = getState();

  const searchTerm = Object.keys(results)[currentIndex];
  registerLastSelectedMap({
    searchTerm,
    index,
  })(dispatch);

  const _payload = Array.isArray(payload) ? payload : [payload];
  const existingSelectedTags = getStorage(STORAGE_KEYS.selected) || [];
  const newSelectedTags = Array.from(new Set([
    ...existingSelectedTags,
    ..._payload,
  ]));

  setStorage(
    STORAGE_KEYS.selected,
    newSelectedTags,
  );
  dispatch(actions.addToSelected(_payload));
};

const registerLastSelectedMap = (payload) => (dispatch) => {
  dispatch(actions.registerLastSelectedMap(payload));
};

const removeFromSelected = (payload, index) => (dispatch, getState) => {
  const {
    search: {
      currentIndex,
      results,
    },
    selection: {
      lastSelectedMap,
    }
  } = getState();

  const searchTerm = Object.keys(results)[currentIndex];
  if (lastSelectedMap[searchTerm] && lastSelectedMap[searchTerm] === index) {
    unRegisterLastSelectedMap({
      searchTerm,
      index,
    })(dispatch);
  }

  const existingSelectedTags = getStorage(STORAGE_KEYS.selected) || [];
  const newSelectedTags = existingSelectedTags.filter((existingTag) => {
    return existingTag !== payload;
  });

  setStorage(
    STORAGE_KEYS.selected,
    newSelectedTags,
  );
  dispatch(actions.removeFromSelected(payload));
};

const toggleSelectingMultiple = (payload) => (dispatch) => {
  dispatch(actions.toggleSelectingMultiple(payload));
};

const unRegisterLastSelectedMap = (payload) => (dispatch) => {
  dispatch(actions.unRegisterLastSelectedMap(payload));
};

const updateHoverIndex = (payload) => (dispatch) => {
  dispatch(actions.updateHoverIndex(payload));
};

export default {
  addToSelected,
  registerLastSelectedMap,
  removeFromSelected,
  toggleSelectingMultiple,
  unRegisterLastSelectedMap,
  updateHoverIndex,
};
