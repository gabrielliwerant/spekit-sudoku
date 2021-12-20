import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { StyledEngineProvider } from '@mui/material/styles';

import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import {
  selectIsPending,
  selectHasSuccess,
  selectDifficulty
} from '../redux/selectors/board';
import { selectSolution } from '../redux/selectors/solve';
import { selectStatus } from '../redux/selectors/validate';
import { boardSlice, generateByDifficulty } from '../redux/slices/board';
import { validateSlice } from '../redux/slices/validate';
import { STATUS, DIFFICULTY } from '../constants';

import Board from './Board';
import ClearButton from './ClearButton';
import Errors from './Errors';
import GenerateButton from './GenerateButton';
import Loading from './Loading';
import SolveButton from './SolveButton';
import ValidateButton from './ValidateButton';

const mapDifficultyToColor = {
  [DIFFICULTY.EASY]: 'success',
  [DIFFICULTY.MEDIUM]: 'warning',
  [DIFFICULTY.HARD]: 'error'
};

const mapStatusToVariant = {
  [STATUS.UNSOLVED]: 'filled',
  [STATUS.SOLVED]: 'outlined'
};

const useStyles = createUseStyles({
  main: {
    margin: 'auto',
    width: '514px',
    '& > *': {
      marginBottom: '1rem'
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& > *': {
      marginRight: '0.25rem'
    },
    '& > *:last-child': {
      marginRight: 0
    }
  },
  container: {
    display: 'flex'
  },
  status: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  intro: {
    marginRight: '1rem'
  }
});

const Main = props => {
  const classes = useStyles();
  const {
    isPending,
    hasSuccess,
    hasSolution,
    solution,
    status,
    difficulty,
    generate,
    setPuzzle,
    setStatus
  } = props;

  useEffect(() => {
    if (hasSolution) {
      setPuzzle(solution);
      setStatus(STATUS.SOLVED);
    }
  }, [hasSolution]);

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
          <SolveButton />
        </nav>
        {hasSuccess && <Board />}
        {isPending && (
          <div className={classes.loading}>
            <Loading size={150} />
          </div>
        )}
        <div className={classes.status}>
          <div className={classes.container}>
            <Typography variant="h6" component="h2" className={classes.intro}>
              Difficulty:
            </Typography>
            <Chip label={difficulty} color={mapDifficultyToColor[difficulty]} />
          </div>
          <div className={classes.container}>
            <Typography variant="h6" component="h2" className={classes.intro}>
              Status:
            </Typography>
            <Chip label={status} variant={mapStatusToVariant[status]} />
          </div>
        </div>
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
  status: PropTypes.string,
  difficulty: PropTypes.string,
  generate: PropTypes.func,
  setPuzzle: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired
};

Main.defaultProps = {
  isPending: false,
  hasSolution: false,
  solution: null,
  hasSuccess: false,
  status: STATUS.UNSOLVED,
  difficulty: DIFFICULTY.EASY
};

const mapStateToProps = state => ({
  isPending: selectIsPending(state),
  hasSuccess: selectHasSuccess(state),
  hasSolution: !!selectSolution(state),
  solution: selectSolution(state),
  status: selectStatus(state),
  difficulty: selectDifficulty(state)
});

const mapDispatchToProps = {
  generate: difficulty => generateByDifficulty({ difficulty }),
  setPuzzle: solution => boardSlice.actions.setPuzzle({ solution }),
  setStatus: status => validateSlice.actions.setStatus({ status })
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
