const CHANGE_SEARCH_INDEX = 'app/search/CHANGE_SEARCH_INDEX';
const SET_SEARCH_RESULTS = 'app/search/SET_SEARCH_RESULTS';
const TOGGLE_IS_SEARCHING = 'app/search/TOGGLE_IS_SEARCHING';

const changeSearchIndex = (payload) => ({
  type: CHANGE_SEARCH_INDEX,
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
  CHANGE_SEARCH_INDEX,
  SET_SEARCH_RESULTS,
  TOGGLE_IS_SEARCHING,
};

export const actions = {
  changeSearchIndex,
  setSearchResults,
  toggleIsSearching,
};
