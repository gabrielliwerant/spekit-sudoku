import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Alert from '@mui/material/Alert';

import { selectHasError as selectHasErrorGenerate } from '../redux/selectors/board';
import { selectHasError as selectHasErrorSolve } from '../redux/selectors/solve';
import { selectHasError as selectHasErrorValidate } from '../redux/selectors/validate';

const Errors = props => {
  const { generate, solve, validate } = props;

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
    </>
  );
};

Errors.propTypes = {
  generate: PropTypes.bool,
  solve: PropTypes.bool,
  validate: PropTypes.bool
};

Errors.defaultProps = {
  generate: false,
  solve: false,
  validate: false
};

const mapStateToProps = state => ({
  generate: selectHasErrorGenerate(state),
  solve: selectHasErrorSolve(state),
  validate: selectHasErrorValidate(state)
});

export default connect(mapStateToProps, null)(Errors);
