/**
 * selectors.js
 *
 * Creates selectors for accessing redux store.
 */

const selectBoard = state => state.board;
const selectPuzzle = state => selectBoard(state).puzzle;
const selectOrdering = state => selectPuzzle(state).ordering;
const selectPuzzleData = state => selectPuzzle(state).data;
const selectBoardUi = state => selectBoard(state).ui;
const selectIsPending = state => selectBoardUi(state).isPending;
const selectHasSuccess = state => selectBoardUi(state).hasSuccess;
const selectHasError = state => selectBoardUi(state).hasError;

export {
  selectOrdering,
  selectPuzzleData,
  selectIsPending,
  selectHasSuccess,
  selectHasError
};
