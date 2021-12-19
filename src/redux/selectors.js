/**
 * selectors.js
 *
 * Creates selectors for accessing redux store.
 */

const selectBoard = state => state.board;
const selectPuzzle = state => selectBoard(state).puzzle;
const selectOrdering = state => selectPuzzle(state).ordering;
const selectPuzzleData = state => selectPuzzle(state).data;
const selectOriginal = state => selectPuzzle(state).original;

const selectBoardUi = state => selectBoard(state).ui;
const selectBoardUiGenerate = state => selectBoardUi(state).generate;
const selectIsPending = state => selectBoardUiGenerate(state).isPending;
const selectHasSuccess = state => selectBoardUiGenerate(state).hasSuccess;
const selectHasError = state => selectBoardUiGenerate(state).hasError;

export {
  selectOrdering,
  selectPuzzleData,
  selectOriginal,
  selectIsPending,
  selectHasSuccess,
  selectHasError
};
