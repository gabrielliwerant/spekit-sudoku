/**
 * selectors/solve.js
 *
 * Creates solve selectors for accessing redux store.
 */

const selectSolve = state => state.solve;

const selectUi = state => selectSolve(state).ui;
const selectSolution = state => selectSolve(state).solution;
const selectStatus = state => selectSolve(state).status;

const selectIsPending = state => selectUi(state).isPending;
const selectHasError = state => selectUi(state).hasError;

export { selectSolution, selectStatus, selectIsPending, selectHasError };
