/**
 * selectors/board.js
 *
 * Creates board selectors for accessing redux store.
 */

const selectBoard = state => state.board;
const selectPuzzle = state => selectBoard(state).puzzle;
const selectOrdering = state => selectPuzzle(state).ordering;
const selectPuzzleData = state => selectPuzzle(state).data;
const selectOriginal = state => selectPuzzle(state).original;

const selectUi = state => selectBoard(state).ui;
const selectIsPending = state => selectUi(state).isPending;
const selectHasSuccess = state => selectUi(state).hasSuccess;
const selectHasError = state => selectUi(state).hasError;

export {
  selectOrdering,
  selectPuzzleData,
  selectOriginal,
  selectIsPending,
  selectHasSuccess,
  selectHasError
};
