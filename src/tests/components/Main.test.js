import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import store from '../../redux/config';
import Main from '../../components/Main';

describe('Main.js', () => {
  it('should render', () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toEqual(
      'Spekit Sudoku'
    );
  });

  it('should render Board component when sudoku generation is successful', () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    expect(screen.queryByTestId('board')).toBe(null);
    store.dispatch({
      type: 'fetch/generateByDifficulty/fulfilled',
      payload: { data: { difficulty: 'easy', puzzle: { A1: '1' } } }
    });
    expect(screen.getByTestId('board')).toBeDefined();
  });
});
