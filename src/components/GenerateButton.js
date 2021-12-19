import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  selectDifficulty,
  selectIsPending,
  selectHasError
} from '../redux/selectors/board';
import { generateByDifficulty } from '../redux/slices/board';

const GenerateButton = props => {
  const { difficulty, isPending, hasError, board } = props;
  const handleOnClick = () => board('easy');

  return (
    <>
      {isPending && <div>Loading...</div>}
      {hasError && <div>Error generating puzzle</div>}
      <div>{difficulty}</div>
      <button onClick={handleOnClick}>Generate Sudoku</button>
    </>
  );
};

GenerateButton.propTypes = {
  difficulty: PropTypes.string,
  isPending: PropTypes.bool,
  hasError: PropTypes.bool,
  board: PropTypes.func.isRequired
};

GenerateButton.defaultProps = {
  isPending: false,
  hasError: false,
  difficulty: 'easy'
};

const mapStateToProps = state => ({
  difficulty: selectDifficulty(state),
  isPending: selectIsPending(state),
  hasError: selectHasError(state)
});

const mapDispatchToProps = {
  board: difficulty => generateByDifficulty({ difficulty })
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerateButton);
