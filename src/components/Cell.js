/**
 * Cell
 *
 * Handles the display and functionality of individual cells in the puzzle
 * board.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { boardSlice } from '../redux/slices/board';
import { isMultipleOfThreeButNotNine } from '../utilities';
import { BACKSPACE_KEY, DELETE_KEY } from '../constants';

const classNames = require('classnames');

const useStyles = createUseStyles({
  srOnly: {
    position: 'absolute !important',
    height: '1px',
    width: '1px',
    overflow: 'hidden',
    clip: 'rect(1px, 1px, 1px, 1px)'
  },
  cell: {
    width: '50px',
    height: '50px',
    fontSize: '35px',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    textAlign: 'center',
    border: '1px solid #bbb',
    '&::-webkit-inner-spin-button': {
      display: 'none'
    },
    '&:focus-visible': {
      outline: 'none'
    }
  },
  originalCell: {
    cursor: 'not-allowed'
  },
  puzzleCell: {
    cursor: 'pointer',
    '&:hover': {
      background: '#eee'
    },
    '&:focus-visible': {
      background: 'rgb(229, 246, 253)'
    }
  },
  rightBorder: {
    borderRight: '3px solid #000'
  },
  bottomBorder: {
    borderBottom: '3px solid #000'
  }
});

const Cell = props => {
  const classes = useStyles();
  const { columnIndex, rowIndex, cellKey, puzzleCell, originalCell, change } =
    props;

  const onHandleKeyDown = e => {
    const value = parseInt(e.key, 10);

    if (e.key === BACKSPACE_KEY || e.key === DELETE_KEY) return;
    if (isNaN(value) || value < 1 || value > 9) e.preventDefault();
  };

  const onHandleChange = key => e => {
    const { value } = e.target;

    if (parseInt(value, 10) < 1 || parseInt(value, 10) > 9) return;
    else change(key, value);
  };

  return (
    <>
      <label htmlFor={cellKey} className={classes.srOnly}>
        {cellKey}
      </label>
      <input
        id={cellKey}
        data-testid={cellKey}
        aria-label={cellKey}
        type="number"
        min="1"
        max="9"
        maxLength="1"
        value={puzzleCell || ''}
        readOnly={!!originalCell}
        onKeyDown={onHandleKeyDown}
        onChange={onHandleChange(cellKey)}
        className={classNames({
          [classes.cell]: true,
          [classes.originalCell]: !!originalCell,
          [classes.puzzleCell]: !originalCell,
          [classes.rightBorder]: isMultipleOfThreeButNotNine(columnIndex + 1),
          [classes.bottomBorder]: isMultipleOfThreeButNotNine(rowIndex + 1)
        })}
      />
    </>
  );
};

Cell.propTypes = {
  columnIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  cellKey: PropTypes.string.isRequired,
  puzzleCell: PropTypes.string.isRequired,
  originalCell: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired
};

Cell.defaultProps = {
  columnIndex: 0,
  rowIndex: 0
};

const mapDispatchToProps = {
  change: (key, value) => boardSlice.actions.change({ key, value })
};

export default connect(null, mapDispatchToProps)(Cell);
export { Cell };
