/**
 * selectors/validate.js
 *
 * Creates validate selectors for accessing redux store.
 */

import { selectPuzzleData, selectOrdering } from './board';

const selectValidate = state => state.validate;

const selectUi = state => selectValidate(state).ui;
const selectIsPending = state => selectUi(state).isPending;
const selectHasError = state => selectUi(state).hasError;

const selectBoard = state => {
  const data = selectPuzzleData(state);
  const ordering = selectOrdering(state);

  return ordering.map(row =>
    row.map(cell => {
      if (data[cell]) return parseInt(data[cell], 10);
      else return 0;
    })
  );
};
const selectStatus = state => selectValidate(state).status;

export { selectIsPending, selectHasError, selectBoard, selectStatus };
