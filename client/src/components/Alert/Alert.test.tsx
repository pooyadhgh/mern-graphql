import { render } from '@testing-library/react';
import Alert from './Alert';

describe('Alert Component', () => {
  it('Should render with provided props', () => {
    const alertMessage = 'Hello World';

    const { queryByText } = render(
      <Alert variant='danger'>{alertMessage}</Alert>
    );

    expect(queryByText(alertMessage)).toBeInTheDocument();
  });
});
