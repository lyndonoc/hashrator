import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import AppContainer from './containers/app';
import rootReducer from './modules';
import { createNewStore } from './store';

import * as serviceWorker from './serviceWorker';

import './index.scss';

render(
  <Provider store={createNewStore(rootReducer)}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();