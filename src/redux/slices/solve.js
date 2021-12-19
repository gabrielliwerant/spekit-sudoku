/**
 * slices/solve.js
 *
 * Handles redux actions, reducers, and initial state for solve concerns.
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_ROOT_CREATE = 'https://sugoku.herokuapp.com';

const initialState = {
  ui: {
    isPending: false,
    hasSuccess: true,
    hasError: false
  },
  solution: []
};

const solve = createAsyncThunk('post/solve', (options, thunkAPI) =>
  axios({
    method: 'post',
    url: `${API_ROOT_CREATE}/solve`,
    data: encodeURIComponent(JSON.stringify({ board: options.board })),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
    .then(response => thunkAPI.fulfillWithValue(response))
    .catch(error => thunkAPI.rejectWithValue(error))
);

const solveSlice = createSlice({
  name: 'solve',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [solve.pending]: state => {
      state.ui.isPending = true;
      state.ui.hasSuccess = false;
      state.ui.hasError = false;
    },
    [solve.fulfilled]: (state, action) => {
      state.ui.isPending = false;
      state.ui.hasSuccess = true;
      state.ui.hasError = false;
      state.solution = action.payload.data.solution;
    },
    [solve.rejected]: state => {
      state.ui.isPending = false;
      state.ui.hasSuccess = false;
      state.ui.hasError = true;
    }
  }
});

export { solveSlice, solve };
