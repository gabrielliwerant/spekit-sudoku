import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GenerateButton } from '../../components/GenerateButton';

describe('GenerateButton.js', () => {
  it('should render', () => {
    render(
      <GenerateButton
        difficulty="easy"
        isPending={false}
        hasError={false}
        resetDifficulty={() => {}}
        resetStatus={() => {}}
        reset={() => {}}
        generate={() => {}}
      />
    );

    expect(screen.getByText('Easy')).toBeDefined();
    expect(screen.queryAllByRole('button').length).toEqual(4);
  });

  it('should call generate-related functions on button click', () => {
    const resetDifficulty = jest.fn();
    const resetStatus = jest.fn();
    const reset = jest.fn();
    const generate = jest.fn();

    render(
      <GenerateButton
        difficulty="easy"
        isPending={false}
        hasError={false}
        resetDifficulty={resetDifficulty}
        resetStatus={resetStatus}
        reset={reset}
        generate={generate}
      />
    );

    userEvent.click(screen.getByLabelText('easy'));
    expect(resetDifficulty).toHaveBeenCalledTimes(1);
    expect(resetStatus).toHaveBeenCalledTimes(1);
    expect(reset).toHaveBeenCalledTimes(1);
    expect(generate).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByLabelText('medium'));
    expect(resetDifficulty).toHaveBeenCalledTimes(2);
    expect(resetStatus).toHaveBeenCalledTimes(2);
    expect(reset).toHaveBeenCalledTimes(2);
    expect(generate).toHaveBeenCalledTimes(2);
    userEvent.click(screen.getByLabelText('hard'));
    expect(resetDifficulty).toHaveBeenCalledTimes(3);
    expect(resetStatus).toHaveBeenCalledTimes(3);
    expect(reset).toHaveBeenCalledTimes(3);
    expect(generate).toHaveBeenCalledTimes(3);
    userEvent.click(screen.getByLabelText('random'));
    expect(resetDifficulty).toHaveBeenCalledTimes(4);
    expect(resetStatus).toHaveBeenCalledTimes(4);
    expect(reset).toHaveBeenCalledTimes(4);
    expect(generate).toHaveBeenCalledTimes(4);
  });
});
