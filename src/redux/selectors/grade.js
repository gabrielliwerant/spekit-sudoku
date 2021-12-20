/**
 * selectors/grade.js
 *
 * Creates grade selectors for accessing redux store.
 */

const selectGrade = state => state.grade;

const selectUi = state => selectGrade(state).ui;
const selectDifficulty = state => selectGrade(state).difficulty;

const selectIsPending = state => selectUi(state).isPending;
const selectHasError = state => selectUi(state).hasError;

export { selectDifficulty, selectIsPending, selectHasError };
