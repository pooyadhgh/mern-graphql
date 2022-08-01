import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner Component', () => {
  it('Loading text should not be visible to the user', () => {
    const loadingText = 'Loading...';

    const { queryByText } = render(<Spinner />);

    const loadingTextElement = queryByText(loadingText);

    expect(loadingTextElement).toBeInTheDocument();
    expect(loadingTextElement).toHaveClass('visually-hidden');
  });
});
