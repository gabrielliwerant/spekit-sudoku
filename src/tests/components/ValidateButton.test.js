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
      />
    );

    expect(screen.getByText('Validate')).toBeDefined();
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
      />
    );

    userEvent.click(screen.getByRole('button'));
    expect(validate).toHaveBeenCalled();
  });
});
