import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import {
  selectOrdering,
  selectPuzzleData,
  selectOriginal,
  selectHasSuccess
} from '../redux/selectors/board';
import { boardSlice } from '../redux/slices/board';

import GenerateButton from './GenerateButton';
import SolveButton from './SolveButton';
import ValidateButton from './ValidateButton';

const classNames = require('classnames');

const BACKSPACE_KEY = 'Backspace';
const DELETE_KEY = 'Delete';

const useStyles = createUseStyles({
  '@global': {},
  board: {
    display: 'flex',
    flexDirection: 'column',
    paddingInlineStart: 0,
    width: '508px',
    border: '3px solid #000'
  },
  row: {
    display: 'flex',
    listStyle: 'none',
    marginTop: '-1px',
    paddingInlineStart: 0
  },
  cell: {
    width: '50px',
    height: '50px',
    fontSize: '35px',
    textAlign: 'center',
    border: '1px solid #000',
    '&::-webkit-inner-spin-button': {
      display: 'none'
    }
  },
  rightBorder: {
    borderRight: '3px solid #000'
  },
  bottomBorder: {
    borderBottom: '3px solid #000'
  }
});

const isMultipleOfThreeButNotNine = n => (n + 1) % 3 === 0 && (n + 1) % 9 !== 0;

const Main = props => {
  const classes = useStyles();
  const { ordering, puzzle, original, hasSuccess, change } = props;
  const onKeyDown = e => {
    const value = parseInt(e.key, 10);

    if (e.key === BACKSPACE_KEY || e.key === DELETE_KEY) return;
    if (isNaN(value) || value < 1 || value > 9) e.preventDefault();
  };
  const onChange = key => e => {
    const { value } = e.target;

    if (parseInt(value, 10) < 1 || parseInt(value, 10) > 9) return;
    else change(key, value);
  };

  return (
    <>
      <h1>Spekit Sudoku</h1>
      <GenerateButton />
      <ValidateButton />
      <SolveButton />
      {hasSuccess && (
        <ol className={classes.board}>
          {ordering.map((row, i) => (
            <ol key={i} className={classes.row}>
              {row.map((cell, j) => (
                <li key={cell}>
                  <input
                    type="number"
                    min="1"
                    max="9"
                    maxLength="1"
                    value={puzzle[cell] || ''}
                    readOnly={!!original[cell]}
                    onKeyDown={onKeyDown}
                    onChange={onChange(cell)}
                    className={classNames({
                      [classes.cell]: true,
                      [classes.rightBorder]: isMultipleOfThreeButNotNine(j),
                      [classes.bottomBorder]: isMultipleOfThreeButNotNine(i)
                    })}
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
  original: PropTypes.object,
  hasSuccess: PropTypes.bool,
  change: PropTypes.func.isRequired
};

Main.defaultProps = {
  ordering: [],
  puzzle: {},
  original: {},
  hasSuccess: false
};

const mapStateToProps = state => ({
  ordering: selectOrdering(state),
  puzzle: selectPuzzleData(state),
  original: selectOriginal(state),
  hasSuccess: selectHasSuccess(state)
});

const mapDispatchToProps = {
  change: (key, value) => boardSlice.actions.change({ key, value })
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
