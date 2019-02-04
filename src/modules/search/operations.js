import { actions } from './actions';
import { getMoreHashtags, getTopHashtags } from '../../services/hashtags';
import { toastsOperations } from '../toasts';

const changeSearchIndex = (nextIndex) => (dispatch) => {
  dispatch(actions.changeSearchIndex(nextIndex));
};

const removeFromSelected = (tag) => (dispatch) => {
  dispatch(actions.removeFromSelected(tag));
};

const searchForHashtag = (term) => (dispatch, getState) => {
  const {
    results
  } = getState().search;

  toggleIsSearching(true)(dispatch, getState);

  return getTopHashtags(term)
    .then((response) => {

      if (response.data.length) {
        dispatch(actions.setSearchResults({
          isConsecutive: response.isConsecutive,
          results: response.data,
          term,
        }));
        dispatch(actions.changeSearchIndex(Object.keys(results).length));
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

const searchForMoreHashtags = (term) => (dispatch, getState) => {
  toggleIsSearching(true)(dispatch, getState);

  return getMoreHashtags(term)
    .then((response) => {
      if (!response.data.length) {
        dispatch(actions.setSearchResults({
          isConsecutive: response.isConsecutive,
          results: response.data,
          term,
        }));
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
  searchForHashtag,
  searchForMoreHashtags,
  selectAHashtag,
  toggleIsSearching,
};
