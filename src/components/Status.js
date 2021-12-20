/**
 * Status
 *
 * Handles the display of the puzzle statuses.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import { selectDifficulty } from '../redux/selectors/board';
import { selectStatus } from '../redux/selectors/validate';
import { STATUS, DIFFICULTY } from '../constants';

const mapDifficultyToColor = {
  [DIFFICULTY.EASY]: 'success',
  [DIFFICULTY.MEDIUM]: 'warning',
  [DIFFICULTY.HARD]: 'error'
};

const mapStatusToVariant = {
  [STATUS.BROKEN]: 'filled',
  [STATUS.UNSOLVED]: 'filled',
  [STATUS.UNSOLVABLE]: 'filled',
  [STATUS.SOLVED]: 'outlined'
};

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  status: {
    display: 'flex'
  },
  intro: {
    marginRight: '0.5rem'
  }
});

const Status = props => {
  const classes = useStyles();
  const { difficulty, status } = props;

  return (
    <div className={classes.container}>
      <div className={classes.status}>
        <Typography variant="h6" component="h2" className={classes.intro}>
          Difficulty:
        </Typography>
        <Chip label={difficulty} color={mapDifficultyToColor[difficulty]} />
      </div>
      <div className={classes.status}>
        <Typography variant="h6" component="h2" className={classes.intro}>
          Status:
        </Typography>
        <Chip label={status} variant={mapStatusToVariant[status]} />
      </div>
    </div>
  );
};

Status.propTypes = {
  status: PropTypes.string,
  difficulty: PropTypes.string
};

Status.defaultProps = {
  status: STATUS.UNSOLVED,
  difficulty: DIFFICULTY.EASY
};

const mapStateToProps = state => ({
  status: selectStatus(state),
  difficulty: selectDifficulty(state)
});

export default connect(mapStateToProps, null)(Status);
