import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@mui/material/Button';
import Assignment from '@mui/icons-material/Assignment';

import { selectIsPending } from '../redux/selectors/grade';
import { selectBoard } from '../redux/selectors/validate';
import { grade } from '../redux/slices/grade';

import Loading from './Loading';

const GradeButton = props => {
  const { isPending, board, grade } = props;
  const handleOnClick = () => grade(board);

  return (
    <>
      <Button
        disableElevation
        color="primary"
        variant="contained"
        aria-label="grade"
        size="small"
        endIcon={isPending && <Loading color="white" />}
        startIcon={<Assignment />}
        onClick={handleOnClick}
      >
        Grade
      </Button>
    </>
  );
};

GradeButton.propTypes = {
  isPending: PropTypes.bool,
  board: PropTypes.array,
  grade: PropTypes.func.isRequired
};

GradeButton.defaultProps = {
  isPending: false,
  board: []
};

const mapStateToProps = state => ({
  isPending: selectIsPending(state),
  board: selectBoard(state)
});

const mapDispatchToProps = {
  grade: board => grade({ board })
};

export default connect(mapStateToProps, mapDispatchToProps)(GradeButton);
