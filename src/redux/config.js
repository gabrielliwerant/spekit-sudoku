/**
 * config.js
 *
 * Handle initial setup of redux store.
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { boardSlice } from './slices/board';
import { solveSlice } from './slices/solve';
import { validateSlice } from './slices/validate';

const store = configureStore({
  reducer: combineReducers({
    board: boardSlice.reducer,
    solve: solveSlice.reducer,
    validate: validateSlice.reducer
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore thunk warnings
        ignoredActions: [
          'fetch/generateByDifficulty/fulfilled',
          'fetch/generateByDifficulty/rejected',
          'post/validate/fulfilled',
          'post/validate/rejected',
          'post/solve/fulfilled',
          'post/solve/rejected'
        ]
      }
    })
});

export default store;
