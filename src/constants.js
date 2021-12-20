/**
 * constants.js
 *
 * Creates and exports constants for use throughout the application/
 */

const BACKSPACE_KEY = 'Backspace';
const DELETE_KEY = 'Delete';
const API_ROOT_FETCH = 'https://vast-chamber-17969.herokuapp.com';
const API_ROOT_CREATE = 'https://sugoku.herokuapp.com';
const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  RANDOM: 'random'
};
const STATUS = {
  BROKEN: 'broken',
  UNSOLVED: 'unsolved',
  UNSOLVABLE: 'unsolvable',
  SOLVED: 'solved'
};

export {
  BACKSPACE_KEY,
  DELETE_KEY,
  API_ROOT_FETCH,
  API_ROOT_CREATE,
  DIFFICULTY,
  STATUS
};
