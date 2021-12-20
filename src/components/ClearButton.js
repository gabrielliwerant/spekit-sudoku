import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { boardSlice } from '../redux/slices/board';

const ClearButton = props => {
  const { clear } = props;
  const handleOnClick = () => clear();

  return <button onClick={handleOnClick}>Clear Sudoku</button>;
};

ClearButton.propTypes = {
  clear: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  clear: boardSlice.actions.clear
};

export default connect(null, mapDispatchToProps)(ClearButton);
