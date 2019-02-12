import { actions } from './actions';
import { getHashTags } from '../../services/hashtags';
import { toastsOperations } from '../toasts';

const changeSearchIndex = (nextIndex) => (dispatch) => {
  dispatch(actions.changeSearchIndex(nextIndex));
};

const removeFromSelected = (tag) => (dispatch) => {
  dispatch(actions.removeFromSelected(tag));
};

const searchForHashtags = (term, options = {}) => (dispatch, getState) => {
  const {
    results,
  } = getState().search;
  const _options = {
    ...options,
  };

  if (results.hasOwnProperty(term) && options.type) {
    const pageIndex = Object.keys(results).findIndex((result) => result === term);
    return dispatch(actions.changeSearchIndex(pageIndex));
  }

  toggleIsSearching(true)(dispatch, getState);

  return getHashTags(term, _options)
    .then((response) => {
      if (response.data.length) {
        dispatch(actions.setSearchResults({
          isConsecutive: response.isConsecutive,
          results: response.data,
          term,
        }));
        if (!response.isConsecutive) {
          dispatch(actions.changeSearchIndex(Object.keys(results).length));
        }
      } else {
        dispatch(toastsOperations.addNewToast(
          `Failed to find hashtags for ${term}.`,
          'warning'
        ));
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch(toastsOperations.addNewToast(
        `Failed to find hashtags for ${term}.`,
        'warning'
      ));
    })
    .finally(() => {
      toggleIsSearching(false)(dispatch, getState);
    });
};

const selectAHashtag = (tag) => (dispatch) => {
  dispatch(actions.addToSelected(tag));
};

const toggleIsSearching = (status) => (dispatch, getState) => {
  const isLoading = typeof status === 'boolean'
    ? status
    : !getState().search.isLoading;
  dispatch(actions.toggleIsSearching(isLoading));
};

export default {
  changeSearchIndex,
  removeFromSelected,
  searchForHashtags,
  selectAHashtag,
  toggleIsSearching,
};
