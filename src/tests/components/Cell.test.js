import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Cell } from '../../components/Cell';

describe('Cell.js', () => {
  it('should render', () => {
    render(
      <Cell
        columnIndex={0}
        rowIndex={0}
        cellKey="A1"
        puzzleCell="1"
        originalCell="1"
        change={() => {}}
      />
    );

    expect(screen.getByLabelText('A1')).toBeDefined();
  });

  it('should call change function on input when entering valid input into non-original cell', () => {
    const change = jest.fn();

    render(
      <Cell
        columnIndex={0}
        rowIndex={0}
        cellKey="A1"
        puzzleCell=""
        originalCell=""
        change={change}
      />
    );

    userEvent.type(screen.getByTestId('A1'), '1');
    expect(change).toHaveBeenCalled();
  });

  it('should not run change function when entering invalid input into non-original cell', () => {
    const change = jest.fn();

    render(
      <Cell
        columnIndex={0}
        rowIndex={0}
        cellKey="A1"
        puzzleCell=""
        originalCell=""
        change={change}
      />
    );

    userEvent.type(screen.getByTestId('A1'), '0');
    userEvent.type(screen.getByTestId('A1'), '-');
    expect(change).not.toHaveBeenCalled();
  });

  it('should not run change function when entering valid input into original cell', () => {
    const change = jest.fn();

    render(
      <Cell
        columnIndex={0}
        rowIndex={0}
        cellKey="A1"
        puzzleCell=""
        originalCell="1"
        change={change}
      />
    );

    userEvent.type(screen.getByTestId('A1'), '2');
    userEvent.type(screen.getByTestId('A1'), '{backspace}');
    expect(change).not.toHaveBeenCalled();
  });
});
