/**
 * GenerateButton
 *
 * Handles the display and functionality the generate buttons.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';

import { generateByDifficulty } from '../redux/slices/board';
import { gradeSlice } from '../redux/slices/grade';
import { solveSlice } from '../redux/slices/solve';
import { validateSlice } from '../redux/slices/validate';
import { DIFFICULTY } from '../constants';

const useStyles = createUseStyles({
  container: {
    display: 'flex'
  },
  intro: {
    marginRight: '0.5rem'
  },
  buttonGroup: {
    display: 'block'
  }
});

const GenerateButton = props => {
  const classes = useStyles();
  const { generate, resetDifficulty, resetStatus, reset } = props;
  const handleOnClick = difficulty => () => {
    resetDifficulty();
    resetStatus();
    reset();
    generate(difficulty);
  };

  return (
    <>
      <div className={classes.container}>
        <Typography variant="h6" component="h2" className={classes.intro}>
          Generate New:
        </Typography>
        <ButtonGroup
          variant="outlined"
          aria-label="generate sudoku by difficulty"
        >
          <Button
            aria-label={DIFFICULTY.EASY}
            onClick={handleOnClick(DIFFICULTY.EASY)}
          >
            Easy
          </Button>
          <Button
            aria-label={DIFFICULTY.MEDIUM}
            onClick={handleOnClick(DIFFICULTY.MEDIUM)}
          >
            Medium
          </Button>
          <Button
            aria-label={DIFFICULTY.HARD}
            onClick={handleOnClick(DIFFICULTY.HARD)}
          >
            Hard
          </Button>
          <Button
            aria-label={DIFFICULTY.RANDOM}
            onClick={handleOnClick(DIFFICULTY.RANDOM)}
          >
            Random
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};

GenerateButton.propTypes = {
  generate: PropTypes.func.isRequired,
  resetDifficulty: PropTypes.func.isRequired,
  resetStatus: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  generate: difficulty => generateByDifficulty({ difficulty }),
  resetDifficulty: gradeSlice.actions.resetDifficulty,
  resetStatus: validateSlice.actions.resetStatus,
  reset: solveSlice.actions.reset
};

export default connect(null, mapDispatchToProps)(GenerateButton);
export { GenerateButton };
