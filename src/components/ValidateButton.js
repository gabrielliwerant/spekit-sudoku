import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  selectIsPending,
  selectHasError,
  selectBoard
} from '../redux/selectors/validate';
import { validate } from '../redux/slices/validate';

const ValidateButton = props => {
  const { isPending, hasError, validate, board } = props;
  const handleOnClick = () => validate(board);

  return (
    <>
      {isPending && <div>Loading...</div>}
      {hasError && <div>Error validating puzzle</div>}
      <button onClick={handleOnClick}>Validate Sudoku</button>
    </>
  );
};

ValidateButton.propTypes = {
  isPending: PropTypes.bool,
  hasError: PropTypes.bool,
  validate: PropTypes.func.isRequired,
  board: PropTypes.array
};

ValidateButton.defaultProps = {
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
  validate: board => validate({ board })
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidateButton);
