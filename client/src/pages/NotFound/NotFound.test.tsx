import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound Page', () => {
  it('Should render page', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );

    const heading = screen.queryByText('404 Page Not Found');
    const button = screen.queryByText('Go Back Home');

    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
