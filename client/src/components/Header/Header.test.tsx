import { screen, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

describe('Header Component', () => {
  it('Should render with logo and brand', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const logo = screen.queryByAltText('Home Page');
    const brand = screen.queryByText('MERN - GraphQL');

    expect(logo).toBeInTheDocument();
    expect(brand).toBeInTheDocument();
  });
});
