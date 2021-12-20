import React from 'react';
import { render, screen } from '@testing-library/react';

import { Board } from '../../components/Board';

describe('Board.js', () => {
  it('should render', () => {
    const Cell = () => <div />;
    render(
      <Board
        ordering={[['A1']]}
        puzzle={{ A1: '1' }}
        original={{ A1: '1' }}
        RenderCell={Cell}
      />
    );

    expect(screen.queryAllByRole('listitem').length).toEqual(1);
    expect(screen.queryAllByRole('list').length).toEqual(2);
  });

  it('should render a listitem per cell rendered', () => {
    const Cell = () => <div />;
    render(
      <Board
        ordering={[['A1', 'A2', 'A3']]}
        puzzle={{ A1: '1', A2: '1', A3: '1' }}
        original={{ A1: '1', A2: '1', A3: '1' }}
        RenderCell={Cell}
      />
    );

    expect(screen.queryAllByRole('listitem').length).toEqual(3);
  });
});
