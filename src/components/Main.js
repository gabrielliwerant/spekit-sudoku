import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectHasSuccess } from '../redux/selectors/board';
import { selectSolution } from '../redux/selectors/solve';
import { boardSlice } from '../redux/slices/board';

import Board from './Board';
import GenerateButton from './GenerateButton';
import SolveButton from './SolveButton';
import ValidateButton from './ValidateButton';

const Main = props => {
  const { hasSuccess, hasSolution, solution, set } = props;

  useEffect(() => {
    if (hasSolution) set(solution);
  }, [hasSolution]);

  return (
    <>
      <h1>Spekit Sudoku</h1>
      <GenerateButton />
      <ValidateButton />
      <SolveButton />
      {hasSuccess && <Board />}
    </>
  );
};

Main.propTypes = {
  hasSuccess: PropTypes.bool,
  hasSolution: PropTypes.bool,
  solution: PropTypes.array,
  set: PropTypes.func.isRequired
};

Main.defaultProps = {
  hasSolution: false,
  solution: null,
  hasSuccess: false
};

const mapStateToProps = state => ({
  hasSuccess: selectHasSuccess(state),
  hasSolution: !!selectSolution(state),
  solution: selectSolution(state)
});

const mapDispatchToProps = {
  set: solution => boardSlice.actions.setPuzzle({ solution })
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
