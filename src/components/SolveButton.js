import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectIsPending, selectHasError } from '../redux/selectors/solve';
import { selectBoard } from '../redux/selectors/validate';
import { solve } from '../redux/slices/solve';

const SolveButton = props => {
  const { isPending, hasError, board, solve } = props;
  const handleOnClick = () => solve(board);

  return (
    <>
      {isPending && <div>Loading...</div>}
      {hasError && <div>Error solving puzzle</div>}
      <button onClick={handleOnClick}>Solve Sudoku</button>
    </>
  );
};

SolveButton.propTypes = {
  isPending: PropTypes.bool,
  hasError: PropTypes.bool,
  board: PropTypes.array,
  solve: PropTypes.func.isRequired
};

SolveButton.defaultProps = {
  isPending: false,
  hasError: false,
  board: []
};

const mapStateToProps = state => ({
  isPending: selectIsPending(state),
  hasError: selectHasError(state),
  board: selectBoard(state)
});

const mapDispatchToProps = {
  solve: board => solve({ board })
};

export default connect(mapStateToProps, mapDispatchToProps)(SolveButton);
export { SolveButton };
