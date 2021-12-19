import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  selectOrdering,
  selectPuzzleData,
  selectIsPending,
  selectHasSuccess,
  selectHasError
} from '../redux/selectors';
import { generateByDifficulty } from '../redux/slices';

const Main = props => {
  const { ordering, puzzle, isPending, hasSuccess, hasError, generate } = props;
  const onClick = () => generate('easy');

  return (
    <>
      <h1>Spekit Sudoku</h1>
      <button onClick={onClick}>Get Sudoku</button>
      {isPending && <div>Loading...</div>}
      {hasError && <div>Error loading puzzle</div>}
      {hasSuccess && (
        <ul>
          {ordering.map(key => (
            <li key={key}>{puzzle[key]}</li>
          ))}
        </ul>
      )}
    </>
  );
};

Main.propTypes = {
  ordering: PropTypes.array,
  puzzle: PropTypes.object,
  isPending: PropTypes.bool,
  hasSuccess: PropTypes.bool,
  hasError: PropTypes.bool,
  generate: PropTypes.func.isRequired
};

Main.defaultProps = {
  ordering: [],
  puzzle: {},
  isPending: false,
  hasSuccess: false,
  hasError: false
};

const mapStateToProps = state => ({
  ordering: selectOrdering(state),
  puzzle: selectPuzzleData(state),
  isPending: selectIsPending(state),
  hasSuccess: selectHasSuccess(state),
  hasError: selectHasError(state)
});

const mapDispatchToProps = {
  generate: difficulty => generateByDifficulty({ difficulty })
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
