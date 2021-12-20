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
        generate={() => {}}
      />
    );

    expect(screen.getByText('Easy')).toBeDefined();
    expect(screen.queryAllByRole('button').length).toEqual(4);
  });

  it('should call generate function on button click', () => {
    const generate = jest.fn();

    render(
      <GenerateButton
        difficulty="easy"
        isPending={false}
        hasError={false}
        generate={generate}
      />
    );

    userEvent.click(screen.getByLabelText('easy'));
    expect(generate).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByLabelText('medium'));
    expect(generate).toHaveBeenCalledTimes(2);
    userEvent.click(screen.getByLabelText('hard'));
    expect(generate).toHaveBeenCalledTimes(3);
    userEvent.click(screen.getByLabelText('random'));
    expect(generate).toHaveBeenCalledTimes(4);
  });
});
