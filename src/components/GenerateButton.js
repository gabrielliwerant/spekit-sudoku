import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  selectDifficulty,
  selectIsPending,
  selectHasError
} from '../redux/selectors/board';
import { generateByDifficulty } from '../redux/slices/board';
import { DIFFICULTIES } from '../constants';

const GenerateButton = props => {
  const { difficulty, isPending, hasError, generate } = props;
  const handleOnClick = newDifficulty => () => generate(newDifficulty);

  useEffect(() => generate(difficulty), []);

  return (
    <>
      {isPending && <div>Loading...</div>}
      {hasError && <div>Error generating puzzle</div>}
      <div>{difficulty}</div>
      <button
        aria-label={DIFFICULTIES.EASY}
        onClick={handleOnClick(DIFFICULTIES.EASY)}
      >
        Generate Easy Sudoku
      </button>
      <button
        aria-label={DIFFICULTIES.MEDIUM}
        onClick={handleOnClick(DIFFICULTIES.MEDIUM)}
      >
        Generate Medium Sudoku
      </button>
      <button
        aria-label={DIFFICULTIES.HARD}
        onClick={handleOnClick(DIFFICULTIES.HARD)}
      >
        Generate Hard Sudoku
      </button>
      <button
        aria-label={DIFFICULTIES.RANDOM}
        onClick={handleOnClick(DIFFICULTIES.RANDOM)}
      >
        Generate Random Sudoku
      </button>
    </>
  );
};

GenerateButton.propTypes = {
  difficulty: PropTypes.string,
  isPending: PropTypes.bool,
  hasError: PropTypes.bool,
  generate: PropTypes.func.isRequired
};

GenerateButton.defaultProps = {
  isPending: false,
  hasError: false,
  difficulty: DIFFICULTIES.EASY
};

const mapStateToProps = state => ({
  difficulty: selectDifficulty(state),
  isPending: selectIsPending(state),
  hasError: selectHasError(state)
});

const mapDispatchToProps = {
  generate: difficulty => generateByDifficulty({ difficulty })
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerateButton);
export { GenerateButton };
