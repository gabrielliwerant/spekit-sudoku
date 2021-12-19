import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import {
  selectOrdering,
  selectPuzzleData,
  selectIsPending,
  selectHasSuccess,
  selectHasError
} from '../redux/selectors';
import { generateByDifficulty } from '../redux/slices';

const useStyles = createUseStyles({
  '@global': {},
  board: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    listStyle: 'none'
  },
  cell: {
    width: '50px',
    height: '50px',
    fontSize: '35px',
    textAlign: 'center',
    '&::-webkit-inner-spin-button': {
      display: 'none'
    }
  }
});

const Main = props => {
  const classes = useStyles();
  const { ordering, puzzle, isPending, hasSuccess, hasError, generate } = props;
  const onClick = () => generate('easy');

  return (
    <>
      <h1>Spekit Sudoku</h1>
      <button onClick={onClick}>Get Sudoku</button>
      {isPending && <div>Loading...</div>}
      {hasError && <div>Error loading puzzle</div>}
      {hasSuccess && (
        <ol className={classes.board}>
          {ordering.map((row, i) => (
            <ol key={i} className={classes.row}>
              {row.map(cell => (
                <li key={cell}>
                  <input
                    type="number"
                    value={puzzle[cell] || null}
                    className={classes.cell}
                  />
                </li>
              ))}
            </ol>
          ))}
        </ol>
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
