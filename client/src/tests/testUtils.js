import checkPropTypes from 'check-prop-types';
import {
  applyMiddleware,
  createStore,
} from 'redux';

import rootReducer from '../modules';
import { middlewares } from '../store';

export const storeFactory = (initialState = {}) => {
  const storeWithMiddlewares = applyMiddleware(...middlewares)(createStore);
  return storeWithMiddlewares(rootReducer, initialState);
};

export const checkProps = (component, propsToCheck) => {
  const propError = checkPropTypes(
    component.propTypes,
    propsToCheck,
    'prop',
    component.name,
  );

  expect(propError).toBeUndefined();
};
