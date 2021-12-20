import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import {
  selectOrdering,
  selectPuzzleData,
  selectOriginal
} from '../redux/selectors/board';

import Cell from './Cell';

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
  }
});

const Board = props => {
  const classes = useStyles();
  const { ordering, puzzle, original } = props;

  return (
    <ol className={classes.board}>
      {ordering.map((row, i) => (
        <ol key={i} className={classes.row}>
          {row.map((cell, j) => (
            <li key={cell}>
              <Cell
                columnIndex={j}
                rowIndex={i}
                cellKey={cell}
                puzzleCell={puzzle[cell] || ''}
                originalCell={original[cell] || ''}
              />
            </li>
          ))}
        </ol>
      ))}
    </ol>
  );
};

Board.propTypes = {
  ordering: PropTypes.array,
  puzzle: PropTypes.object,
  original: PropTypes.object
};

Board.defaultProps = {
  ordering: [],
  puzzle: {},
  original: {}
};

const mapStateToProps = state => ({
  ordering: selectOrdering(state),
  puzzle: selectPuzzleData(state),
  original: selectOriginal(state)
});

export default connect(mapStateToProps, null)(Board);
