/**
 * slices.js
 *
 * Creates reducer/state slices and related helper functions.
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_ROOT = 'https://vast-chamber-17969.herokuapp.com';

const initialState = {
  board: {
    ui: {
      isPending: false,
      hasSuccess: false,
      hasError: false
    },
    difficulty: 'easy',
    puzzle: {
      ordering: [],
      data: {}
    }
  }
};

const generateByDifficulty = createAsyncThunk(
  'fetch/generateByDifficulty',
  (options, thunkAPI) =>
    axios
      .get(`${API_ROOT}/generate?difficulty=${options.difficulty}`)
      .then(response => thunkAPI.fulfillWithValue(response))
      .catch(error => thunkAPI.rejectWithValue(error))
);

const boardSlice = createSlice({
  name: 'board',
  initialState: initialState.board,
  reducers: {},
  extraReducers: {
    [generateByDifficulty.pending]: state => {
      state.ui.isPending = true;
      state.ui.hasSuccess = false;
      state.ui.hasError = false;
    },
    [generateByDifficulty.fulfilled]: (state, action) => {
      state.ui.isPending = false;
      state.ui.hasSuccess = true;
      state.ui.hasError = false;
      state.puzzle.ordering = Object.keys(action.payload.data.puzzle);
      state.puzzle.data = action.payload.data.puzzle;
    },
    [generateByDifficulty.rejected]: state => {
      state.ui.isPending = false;
      state.ui.hasSuccess = false;
      state.ui.hasError = true;
    }
  }
});

export { boardSlice, generateByDifficulty };
