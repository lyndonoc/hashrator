const ADD_TO_SELECTED = 'app/search/ADD_TO_SELECTED';
const CHANGE_SEARCH_INDEX = 'app/search/CHANGE_SEARCH_INDEX';
const REMOVE_FROM_SELECTED = 'app/search/REMOVE_FROM_SELECTED';
const SET_SEARCH_RESULTS = 'app/search/SET_SEARCH_RESULTS';
const TOGGLE_IS_SEARCHING = 'app/search/TOGGLE_IS_SEARCHING';

const addToSelected = (payload) => ({
  type: ADD_TO_SELECTED,
  payload,
});

const changeSearchIndex = (payload) => ({
  type: CHANGE_SEARCH_INDEX,
  payload,
});

const removeFromSelected = (payload) => ({
  type: REMOVE_FROM_SELECTED,
  payload,
});

const setSearchResults = (payload) => ({
  type: SET_SEARCH_RESULTS,
  payload,
});

const toggleIsSearching = (payload) => ({
  type: TOGGLE_IS_SEARCHING,
  payload,
});

export const types = {
  ADD_TO_SELECTED,
  CHANGE_SEARCH_INDEX,
  REMOVE_FROM_SELECTED,
  SET_SEARCH_RESULTS,
  TOGGLE_IS_SEARCHING,
};

export const actions = {
  addToSelected,
  changeSearchIndex,
  removeFromSelected,
  setSearchResults,
  toggleIsSearching,
};
