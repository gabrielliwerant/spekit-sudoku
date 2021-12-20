/**
 * SolveButton
 *
 * Handles the display and functionality of the solve button.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@mui/material/Button';
import PlayArrow from '@mui/icons-material/PlayArrow';

import { selectIsPending } from '../redux/selectors/solve';
import { selectBoard } from '../redux/selectors/validate';
import { solve } from '../redux/slices/solve';

import Loading from './Loading';

const SolveButton = props => {
  const { isPending, board, solve } = props;
  const handleOnClick = () => solve(board);

  return (
    <Button
      disableElevation
      color="primary"
      variant="contained"
      aria-label="solve"
      size="small"
      endIcon={isPending && <Loading color="white" />}
      startIcon={<PlayArrow />}
      onClick={handleOnClick}
    >
      Solve
    </Button>
  );
};

SolveButton.propTypes = {
  isPending: PropTypes.bool,
  board: PropTypes.array,
  solve: PropTypes.func.isRequired
};

SolveButton.defaultProps = {
  isPending: false,
  board: []
};

const mapStateToProps = state => ({
  isPending: selectIsPending(state),
  board: selectBoard(state)
});

const mapDispatchToProps = {
  solve: board => solve({ board })
};

export default connect(mapStateToProps, mapDispatchToProps)(SolveButton);
export { SolveButton };
