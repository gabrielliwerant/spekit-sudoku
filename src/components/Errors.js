/**
 * Errors
 *
 * Handles the display of possible API errors.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Alert from '@mui/material/Alert';

import { selectHasError as selectHasErrorGenerate } from '../redux/selectors/board';
import { selectHasError as selectHasErrorGrade } from '../redux/selectors/grade';
import { selectHasError as selectHasErrorSolve } from '../redux/selectors/solve';
import { selectHasError as selectHasErrorValidate } from '../redux/selectors/validate';

const Errors = props => {
  const { generate, grade, solve, validate } = props;

  return (
    <>
      {generate && (
        <Alert variant="filled" severity="error">
          Error generating puzzle
        </Alert>
      )}
      {solve && (
        <Alert variant="filled" severity="error">
          Error solving puzzle
        </Alert>
      )}
      {validate && (
        <Alert variant="filled" severity="error">
          Error validating puzzle
        </Alert>
      )}
      {grade && (
        <Alert variant="filled" severity="error">
          Error grading puzzle
        </Alert>
      )}
    </>
  );
};

Errors.propTypes = {
  generate: PropTypes.bool,
  grade: PropTypes.bool,
  solve: PropTypes.bool,
  validate: PropTypes.bool
};

Errors.defaultProps = {
  generate: false,
  grade: false,
  solve: false,
  validate: false
};

const mapStateToProps = state => ({
  generate: selectHasErrorGenerate(state),
  grade: selectHasErrorGrade(state),
  solve: selectHasErrorSolve(state),
  validate: selectHasErrorValidate(state)
});

export default connect(mapStateToProps, null)(Errors);
