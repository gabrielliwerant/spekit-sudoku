/**
 * constants.js
 *
 * Creates and exports constants for use throughout the application/
 */

const API_ROOT_FETCH = 'https://vast-chamber-17969.herokuapp.com';
const API_ROOT_CREATE = 'https://sugoku.herokuapp.com';
const DIFFICULTIES = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  RANDOM: 'random'
};
const STATUSES = {
  UNSOLVED: 'unsolved',
  SOLVED: 'solved'
};

export { API_ROOT_FETCH, API_ROOT_CREATE, DIFFICULTIES, STATUSES };
