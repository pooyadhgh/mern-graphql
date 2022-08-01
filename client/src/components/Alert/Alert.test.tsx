import { render, screen } from '@testing-library/react';
import Alert from './Alert';

describe('Alert Component', () => {
  it('Should render with provided props', () => {
    render(<Alert variant='danger'>message</Alert>);

    const alertMessage = screen.queryByText('message');

    expect(alertMessage).toBeInTheDocument();
  });
});
