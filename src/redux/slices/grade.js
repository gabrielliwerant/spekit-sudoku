/**
 * slices/grade.js
 *
 * Handles redux actions, reducers, and initial state for grade concerns.
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { convertObjectToFormData } from '../../utilities';
import { API_ROOT_CREATE } from '../../constants';

const initialState = {
  ui: {
    isPending: false,
    hasSuccess: false,
    hasError: false
  },
  difficulty: null
};

const grade = createAsyncThunk('post/grade', (options, thunkAPI) =>
  axios({
    method: 'post',
    url: `${API_ROOT_CREATE}/grade`,
    data: convertObjectToFormData(options.board),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
    .then(response => thunkAPI.fulfillWithValue(response))
    .catch(error => thunkAPI.rejectWithValue(error))
);

const gradeSlice = createSlice({
  name: 'grade',
  initialState: initialState,
  reducers: {
    resetDifficulty: state => {
      state.difficulty = null;
    }
  },
  extraReducers: {
    [grade.pending]: state => {
      state.ui.isPending = true;
      state.ui.hasSuccess = false;
      state.ui.hasError = false;
    },
    [grade.fulfilled]: (state, action) => {
      state.ui.isPending = false;
      state.ui.hasSuccess = true;
      state.ui.hasError = false;
      state.difficulty = action.payload.data.difficulty;
    },
    [grade.rejected]: state => {
      state.ui.isPending = false;
      state.ui.hasSuccess = false;
      state.ui.hasError = true;
    }
  }
});

export { gradeSlice, grade };
