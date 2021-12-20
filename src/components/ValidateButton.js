import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  selectIsPending,
  selectHasError,
  selectBoard,
  selectStatus
} from '../redux/selectors/validate';
import { validate } from '../redux/slices/validate';
import { STATUSES } from '../constants';

const ValidateButton = props => {
  const { isPending, hasError, validate, board, status } = props;
  const handleOnClick = () => validate(board);

  return (
    <>
      {isPending && <div>Loading...</div>}
      {hasError && <div>Error validating puzzle</div>}
      <div>{status}</div>
      <button onClick={handleOnClick}>Validate Sudoku</button>
    </>
  );
};

ValidateButton.propTypes = {
  isPending: PropTypes.bool,
  hasError: PropTypes.bool,
  validate: PropTypes.func.isRequired,
  board: PropTypes.array,
  status: PropTypes.string
};

ValidateButton.defaultProps = {
  isPending: false,
  hasError: false,
  board: [],
  status: STATUSES.UNSOLVED
};

const mapStateToProps = state => ({
  isPending: selectIsPending(state),
  hasError: selectHasError(state),
  board: selectBoard(state),
  status: selectStatus(state)
});

const mapDispatchToProps = {
  validate: board => validate({ board })
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidateButton);
export { ValidateButton };
