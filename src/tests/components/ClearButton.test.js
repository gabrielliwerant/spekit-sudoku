import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ClearButton } from '../../components/ClearButton';

describe('ClearButton.js', () => {
  it('should render', () => {
    render(<ClearButton clear={() => {}} />);

    expect(screen.getByRole('button')).toBeDefined();
  });

  it('should not call clear function without button click', () => {
    const clear = jest.fn();

    render(<ClearButton clear={clear} />);

    expect(clear).not.toHaveBeenCalled();
  });

  it('should call clear function on button click', () => {
    const clear = jest.fn();

    render(<ClearButton clear={clear} />);

    userEvent.click(screen.getByRole('button'));
    expect(clear).toHaveBeenCalled();
  });
});
