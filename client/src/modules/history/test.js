import historyReducer, { initialState } from './reducer';
import operations from './operations';
import {
  actions,
  types,
} from './actions';
import { storeFactory } from '../../tests/testUtils';

describe('all actions are dispatched correctly', () => {
  it('adds a new history', () => {
    const expectedAction = actions.addNewHistory('new history');

    expect(expectedAction).toEqual({
      payload: 'new history',
      type: types.ADD_NEW_HISTORY,
    });
  });

  it('clears history', () => {
    const expectedAction = actions.clearHistory();

    expect(expectedAction).toEqual({
      type: types.CLEAR_HISTORY,
    });
  });

  it('removes a history', () => {
    const expectedAction = actions.removeHistory('history to remove');

    expect(expectedAction).toEqual({
      payload: 'history to remove',
      type: types.REMOVE_HISTORY,
    });
  });
});

describe('history operations behaves correctly', () => {
  const store = storeFactory();

  it('adds new history', () => {
    operations.addNewHistory('new history')(store.dispatch);

    expect(store.getState().history).toEqual(['new history']);
  });

  it('clears history', () => {
    operations.clearHistory()(store.dispatch);

    expect(store.getState().history).toEqual([]);
  });

  it('removes_history', () => {
    operations.addNewHistory('new history')(store.dispatch);
    expect(store.getState().history).toEqual(['new history']);
    operations.removeHistory('new history')(store.dispatch);
    expect(store.getState().history).toEqual([]);
  });
});

describe('history reducer behaves correctly', () => {
  it('should render initial state', () => {
    expect(historyReducer(undefined, {})).toEqual(initialState);
  });

  it('adds a new history', () => {
    const action = actions.addNewHistory('new history');

    expect(historyReducer(undefined, action)).toEqual([
      'new history',
    ]);
  });

  it('clears history', () => {
    const action = actions.clearHistory();

    expect(historyReducer(undefined, action)).toEqual([]);
  });

  it('removes a history', () => {
    const action = actions.removeHistory('history to remove');

    expect(historyReducer(undefined, action)).toEqual([]);
  });
});
