/**
 * Main
 *
 * Handles the main section of the application, containing puzzle board, title,
 * statuses, and the various actions available.
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { StyledEngineProvider } from '@mui/material/styles';

import Typography from '@mui/material/Typography';

import {
  selectIsPending,
  selectHasSuccess,
  selectDifficulty
} from '../redux/selectors/board';
import {
  selectSolution,
  selectStatus as selectStatusSolve
} from '../redux/selectors/solve';
import { boardSlice, generateByDifficulty } from '../redux/slices/board';
import { solveSlice } from '../redux/slices/solve';
import { validateSlice } from '../redux/slices/validate';
import { STATUS, DIFFICULTY } from '../constants';

import Board from './Board';
import ClearButton from './ClearButton';
import Errors from './Errors';
import GenerateButton from './GenerateButton';
import GradeButton from './GradeButton';
import Loading from './Loading';
import SolveButton from './SolveButton';
import Status from './Status';
import ValidateButton from './ValidateButton';

const useStyles = createUseStyles({
  main: {
    margin: 'auto',
    width: '514px',
    '& > *': {
      marginBottom: '1.25rem'
    },
    '& > *:last-child': {
      marginBottom: 0
    }
  },
  loading: {
    textAlign: 'center',
    marginTop: '5rem',
    marginBottom: '5rem'
  },
  title: {
    textAlign: 'center'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      marginRight: '0.25rem'
    },
    '& > *:last-child': {
      marginRight: 0
    }
  }
});

const Main = props => {
  const classes = useStyles();
  const {
    isPending,
    hasSuccess,
    hasSolution,
    solution,
    statusSolve,
    difficulty,
    generate,
    setPuzzle,
    reset,
    setStatus
  } = props;

  useEffect(() => {
    if (hasSolution && statusSolve === STATUS.SOLVED) {
      setPuzzle(solution);
      setStatus(STATUS.SOLVED);
    } else if (statusSolve === STATUS.UNSOLVABLE) {
      setStatus(statusSolve);
      reset();
    }
  }, [hasSolution, statusSolve]);

  useEffect(() => generate(difficulty), []);

  return (
    <StyledEngineProvider injectFirst>
      <main className={classes.main}>
        <Errors />
        <Typography className={classes.title} variant="h3" component="h1">
          Spekit Sudoku
        </Typography>
        <nav className={classes.actions}>
          <ClearButton />
          <ValidateButton />
          <GradeButton />
          <SolveButton />
        </nav>
        {hasSuccess && <Board />}
        {isPending && (
          <div className={classes.loading}>
            <Loading size={150} />
          </div>
        )}
        <Status />
        <GenerateButton />
      </main>
    </StyledEngineProvider>
  );
};

Main.propTypes = {
  isPending: PropTypes.bool,
  hasSuccess: PropTypes.bool,
  hasSolution: PropTypes.bool,
  solution: PropTypes.array,
  statusSolve: PropTypes.string,
  difficulty: PropTypes.string,
  generate: PropTypes.func,
  setPuzzle: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired
};

Main.defaultProps = {
  isPending: false,
  hasSolution: false,
  solution: null,
  hasSuccess: false,
  statusSolve: null,
  difficulty: DIFFICULTY.EASY
};

const mapStateToProps = state => ({
  isPending: selectIsPending(state),
  hasSuccess: selectHasSuccess(state),
  hasSolution: !!selectSolution(state),
  solution: selectSolution(state),
  statusSolve: selectStatusSolve(state),
  difficulty: selectDifficulty(state)
});

const mapDispatchToProps = {
  generate: difficulty => generateByDifficulty({ difficulty }),
  setPuzzle: solution => boardSlice.actions.setPuzzle({ solution }),
  reset: solveSlice.actions.reset,
  setStatus: status => validateSlice.actions.setStatus({ status })
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
