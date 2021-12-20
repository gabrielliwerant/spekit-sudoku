/**
 * slices/board.js
 *
 * Handles redux actions, reducers, and initial state for board concerns.
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_ROOT_FETCH } from '../../constants';

const initialState = {
  ui: {
    isPending: false,
    hasSuccess: false,
    hasError: false
  },
  difficulty: null,
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
    original: {},
    data: {}
  }
};

const generateByDifficulty = createAsyncThunk(
  'fetch/generateByDifficulty',
  (options, thunkAPI) =>
    axios
      .get(`${API_ROOT_FETCH}/generate?difficulty=${options.difficulty}`)
      .then(response => thunkAPI.fulfillWithValue(response))
      .catch(error => thunkAPI.rejectWithValue(error))
);

const boardSlice = createSlice({
  name: 'board',
  initialState: initialState,
  reducers: {
    setPuzzle: (state, action) => {
      const flatOrdering = state.puzzle.ordering.flat();
      const flatSolution = action.payload.solution.flat();

      state.puzzle.data = flatOrdering.reduce(
        (prev, cur, i) => ({
          ...prev,
          [cur]: `${flatSolution[i]}`
        }),
        {}
      );
    },
    change: (state, action) => {
      state.puzzle.data[action.payload.key] = action.payload.value;
    },
    clear: state => {
      state.puzzle.data = {};
    }
  },
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
      state.difficulty = action.payload.data.difficulty;
      state.puzzle.data = action.payload.data.puzzle;
      state.puzzle.original = action.payload.data.puzzle;
    },
    [generateByDifficulty.rejected]: state => {
      state.ui.isPending = false;
      state.ui.hasSuccess = false;
      state.ui.hasError = true;
    }
  }
});

export { boardSlice, generateByDifficulty };
