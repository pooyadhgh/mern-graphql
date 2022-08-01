import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ClientsTable from './ClientsTable';
import { client } from '@mocks';

const removeClientHandler = vitest.fn();
const clients = [client];

describe('ClientsTable Component', () => {
  beforeEach(() => {
    render(
      <ClientsTable clients={clients} onRemoveClient={removeClientHandler} />
    );
  });

  it('Should render with provided props', () => {
    const clientName = screen.queryByText('John Doe');
    const clientEmail = screen.queryByText('john.doe@gmail.com');
    const clientPhone = screen.queryByText('123456');
    const clientId = screen.queryByText('62e7f8e85fc98adb86409923');

    expect(clientName).toBeInTheDocument();
    expect(clientEmail).toBeInTheDocument();
    expect(clientPhone).toBeInTheDocument();
    expect(clientId).not.toBeInTheDocument();
  });

  it('Should call onRemoveClient prop when clicking on delete button', () => {
    const removeBtn = screen.getByRole('button', {
      name: /delete client/i,
    });

    fireEvent.click(removeBtn);

    waitFor(() => expect(removeClientHandler).toBeCalled());
  });
});
