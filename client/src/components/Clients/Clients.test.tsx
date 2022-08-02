import { fireEvent, render, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { DELETE_CLIENT } from '@graphql/mutations';
import { GET_CLIENTS } from '@graphql/queries';
import { client } from '@mocks';
import Clients from './Clients';

const spy = vitest.fn(() => ({
  data: {
    clients: [],
  },
}));

const getClientsSuccessData = [
  {
    request: {
      query: GET_CLIENTS,
    },
    result: {
      data: {
        clients: [client],
      },
    },
  },
  {
    request: {
      query: DELETE_CLIENT,
      variables: { id: '62e7f8e85fc98adb86409923' },
    },
    newData: spy,
  },
];

const getClientsErrorData = [
  {
    request: {
      query: GET_CLIENTS,
    },
    error: new Error('An error occurred'),
  },
];

const renderClients = (mocks: readonly MockedResponse<Record<string, any>>[]) =>
  render(
    <MockedProvider mocks={mocks}>
      <Clients />
    </MockedProvider>
  );

describe('Clients Component', () => {
  it('Should render loading', async () => {
    renderClients(getClientsSuccessData);

    const loading = await screen.findByText('Loading...');

    expect(loading).toBeInTheDocument();
  });

  it('Should render data', async () => {
    renderClients(getClientsSuccessData);

    const username = await screen.findByText('John Doe');
    const userEmail = await screen.findByText('john.doe@gmail.com');
    const userPhone = await screen.findByText('123456');

    expect(username).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
    expect(userPhone).toBeInTheDocument();
  });

  it('Should render error alert', async () => {
    renderClients(getClientsErrorData);

    const alertMessage = await screen.findByText(
      'Oops! Somethong went wrong...'
    );

    expect(alertMessage).toBeInTheDocument();
  });

  it('Should call graphql mutation function when user clicks on remove button', async () => {
    renderClients(getClientsSuccessData);

    const removeBtn = await screen.findByRole('button', {
      name: /delete client/i,
    });

    fireEvent.click(removeBtn);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
