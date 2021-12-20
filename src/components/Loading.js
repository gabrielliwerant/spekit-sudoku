/**
 * Loading
 *
 * Handles the display of the application loading state.
 */

import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@mui/material/CircularProgress';

const Loading = props => (
  <CircularProgress size={props.size} sx={{ color: props.color }} />
);

Loading.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

Loading.defaultProps = {
  size: 20,
  color: '#1565c0'
};

export default Loading;
