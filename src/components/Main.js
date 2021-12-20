import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectHasSuccess } from '../redux/selectors/board';
import { selectSolution } from '../redux/selectors/solve';
import { boardSlice } from '../redux/slices/board';
import { validateSlice } from '../redux/slices/validate';
import { STATUSES } from '../constants';

import Board from './Board';
import ClearButton from './ClearButton';
import GenerateButton from './GenerateButton';
import SolveButton from './SolveButton';
import ValidateButton from './ValidateButton';

const Main = props => {
  const { hasSuccess, hasSolution, solution, setPuzzle, setStatus } = props;

  useEffect(() => {
    if (hasSolution) {
      setPuzzle(solution);
      setStatus(STATUSES.SOLVED);
    }
  }, [hasSolution]);

  return (
    <>
      <h1>Spekit Sudoku</h1>
      <GenerateButton />
      <ClearButton />
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
  status: PropTypes.string,
  setPuzzle: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired
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
  setPuzzle: solution => boardSlice.actions.setPuzzle({ solution }),
  setStatus: status => validateSlice.actions.setStatus({ status })
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
