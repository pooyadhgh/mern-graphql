import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner Component', () => {
  it('Loading text should not be visible to the user', () => {
    render(<Spinner />);

    const loadingTextElement = screen.queryByText('Loading...');

    expect(loadingTextElement).toBeInTheDocument();
    expect(loadingTextElement).toHaveClass('visually-hidden');
  });
});
