/**
 * ClearButton
 *
 * Handles display and functionality of the clear button.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@mui/material/Button';
import Clear from '@mui/icons-material/Clear';

import { boardSlice } from '../redux/slices/board';

const ClearButton = props => {
  const { clear } = props;
  const handleOnClick = () => clear();

  return (
    <Button
      disableElevation
      color="primary"
      variant="contained"
      aria-label="clear"
      size="small"
      startIcon={<Clear />}
      onClick={handleOnClick}
    >
      Clear
    </Button>
  );
};

ClearButton.propTypes = {
  clear: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  clear: boardSlice.actions.clear
};

export default connect(null, mapDispatchToProps)(ClearButton);
export { ClearButton };
