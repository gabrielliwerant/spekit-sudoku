/**
 * slices/validate.js
 *
 * Handles redux actions, reducers, and initial state for validate concerns.
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
  status: 'unsolved'
};

const validate = createAsyncThunk('post/validate', (options, thunkAPI) =>
  axios({
    method: 'post',
    url: `${API_ROOT_CREATE}/validate`,
    data: encodeURIComponent(JSON.stringify({ board: options.board })),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
    .then(response => thunkAPI.fulfillWithValue(response))
    .catch(error => thunkAPI.rejectWithValue(error))
);

const validateSlice = createSlice({
  name: 'validate',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [validate.pending]: state => {
      state.ui.isPending = true;
      state.ui.hasSuccess = false;
      state.ui.hasError = false;
    },
    [validate.fulfilled]: (state, action) => {
      state.ui.isPending = false;
      state.ui.hasSuccess = true;
      state.ui.hasError = false;
      state.status = action.payload.data.status;
    },
    [validate.rejected]: state => {
      state.ui.isPending = false;
      state.ui.hasSuccess = false;
      state.ui.hasError = true;
    }
  }
});

export { validateSlice, validate };