import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ValidateButton } from '../../components/ValidateButton';

describe('ValidateButton.js', () => {
  it('should render', () => {
    render(
      <ValidateButton
        isPending={false}
        hasError={false}
        validate={() => {}}
        board={[]}
        status="unsolved"
      />
    );

    expect(screen.getByText('unsolved')).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();
  });

  it('should not call validate function without button click', () => {
    const validate = jest.fn();

    render(
      <ValidateButton
        isPending={false}
        hasError={false}
        validate={validate}
        board={[]}
        status="unsolved"
      />
    );

    expect(validate).not.toHaveBeenCalled();
  });

  it('should call validate function on button click', () => {
    const validate = jest.fn();

    render(
      <ValidateButton
        isPending={false}
        hasError={false}
        validate={validate}
        board={[]}
        status="unsolved"
      />
    );

    userEvent.click(screen.getByRole('button'));
    expect(validate).toHaveBeenCalled();
  });
});
