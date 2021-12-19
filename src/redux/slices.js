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
      ordering: [
        ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'],
        ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
        ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'],
        ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9'],
        ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'],
        ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9'],
        ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9'],
        ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9'],
        ['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9']
      ],
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
