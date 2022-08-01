import { render, screen } from '@testing-library/react';
import ClientDetail from './ClientDetail';
import { client } from '@mocks';

describe('ClientDetail Component', () => {
  it('Should render with provided props', () => {
    render(<ClientDetail {...client} />);

    const title = screen.queryByText('Client Information');
    const clientName = screen.queryByText('John Doe');
    const clientEmail = screen.queryByText('john.doe@gmail.com');
    const clientPhone = screen.queryByText('123456');
    const clientId = screen.queryByText('62e7f8e85fc98adb86409923');

    expect(title).toBeInTheDocument();
    expect(clientName).toBeInTheDocument();
    expect(clientEmail).toBeInTheDocument();
    expect(clientPhone).toBeInTheDocument();
    expect(clientId).not.toBeInTheDocument();
  });
});
