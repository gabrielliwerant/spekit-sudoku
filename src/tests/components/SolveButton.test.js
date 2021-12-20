import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SolveButton } from '../../components/SolveButton';

describe('SolveButton.js', () => {
  it('should render', () => {
    render(
      <SolveButton
        isPending={false}
        hasError={false}
        board={[]}
        solve={() => {}}
      />
    );

    expect(screen.getByRole('button')).toBeDefined();
  });

  it('should not call solve function without button click', () => {
    const solve = jest.fn();

    render(
      <SolveButton
        isPending={false}
        hasError={false}
        board={[]}
        solve={solve}
      />
    );

    expect(solve).not.toHaveBeenCalled();
  });

  it('should call solve function on button click', () => {
    const solve = jest.fn();

    render(
      <SolveButton
        isPending={false}
        hasError={false}
        board={[]}
        solve={solve}
      />
    );

    userEvent.click(screen.getByRole('button'));
    expect(solve).toHaveBeenCalled();
  });
});
