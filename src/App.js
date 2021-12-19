/**
 * App
 *
 * Main entry point for react.
 */

import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/config';

import Main from './components/Main';

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
