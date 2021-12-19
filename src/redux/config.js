/**
 * config.js
 *
 * Handle initial setup of redux store.
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { boardSlice } from './slices';

const store = configureStore({
  reducer: combineReducers({
    board: boardSlice.reducer
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore thunk warnings
        ignoredActions: [
          'fetch/generateByDifficulty/fulfilled',
          'fetch/generateByDifficulty/rejected'
        ]
      }
    })
});

export default store;
