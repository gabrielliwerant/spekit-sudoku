/**
 * ValidateButton
 *
 * Handles the display and functionality of the validate button.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@mui/material/Button';
import Check from '@mui/icons-material/Check';

import { selectIsPending, selectBoard } from '../redux/selectors/validate';
import { validate } from '../redux/slices/validate';

import Loading from './Loading';

const ValidateButton = props => {
  const { isPending, validate, board } = props;
  const handleOnClick = () => validate(board);

  return (
    <>
      <Button
        disableElevation
        color="primary"
        variant="contained"
        aria-label="clear"
        size="small"
        endIcon={isPending && <Loading color="white" />}
        startIcon={<Check />}
        onClick={handleOnClick}
      >
        Validate
      </Button>
    </>
  );
};

ValidateButton.propTypes = {
  isPending: PropTypes.bool,
  validate: PropTypes.func.isRequired,
  board: PropTypes.array
};

ValidateButton.defaultProps = {
  isPending: false,
  board: []
};

const mapStateToProps = state => ({
  isPending: selectIsPending(state),
  board: selectBoard(state)
});

const mapDispatchToProps = {
  validate: board => validate({ board })
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidateButton);
export { ValidateButton };
