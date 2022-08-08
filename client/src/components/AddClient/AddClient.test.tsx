import { fireEvent, render, screen, within } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ADD_CLIENT } from '@graphql/mutations';
import { client } from '@mocks';
import AddClient from './AddClient';

const onCloseModal = () => vitest.fn();

const spy = vitest.fn(() => ({
  data: {
    addClient: [],
  },
}));

const mocks = [
  {
    request: {
      query: ADD_CLIENT,
      variables: {
        name: 'John Doe',
        email: 'john.doe@mail.com',
        phone: '123456',
      },
    },
    newData: spy,
  },
];

const renderAddClient = async () => {
  render(
    <MockedProvider mocks={mocks}>
      <AddClient onCloseModal={onCloseModal} modalOpen={true} />
    </MockedProvider>
  );

  const modal = await screen.findByRole('dialog');
  const addButton = await within(modal).findByRole('button', {
    name: /add new client/i,
  });
  const clientNameInput = await within(modal).findByRole('textbox', {
    name: /name/i,
  });
  const clientEmailInput = await within(modal).findByRole('textbox', {
    name: /email address/i,
  });
  const clientPhoneInput = await within(modal).findByRole('textbox', {
    name: /phone number/i,
  });

  return {
    addButton,
    clientNameInput,
    clientEmailInput,
    clientPhoneInput,
  };
};

describe('AddClient component', () => {
  it('Should render with provided props', async () => {
    const { addButton, clientNameInput, clientEmailInput, clientPhoneInput } =
      await renderAddClient();

    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled();
    expect(clientNameInput).toBeInTheDocument();
    expect(clientEmailInput).toBeInTheDocument();
    expect(clientPhoneInput).toBeInTheDocument();
  });

  it('Should call graphql mutation function when user clicks on add button', async () => {
    const { addButton, clientNameInput, clientEmailInput, clientPhoneInput } =
      await renderAddClient();

    fireEvent.change(clientNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(clientEmailInput, {
      target: { value: 'john.doe@mail.com' },
    });
    fireEvent.change(clientPhoneInput, {
      target: { value: '123456' },
    });
    fireEvent.click(addButton);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Should show error while user inputs wrong data', async () => {
    const { addButton, clientNameInput, clientEmailInput, clientPhoneInput } =
      await renderAddClient();

    fireEvent.change(clientNameInput, { target: { value: 'ab' } });
    fireEvent.change(clientEmailInput, {
      target: { value: 'john.doe' },
    });
    fireEvent.change(clientPhoneInput, {
      target: { value: '12' },
    });

    const nameErrorMessage = await screen.findByText(
      'Please enter a valid name contains more than 3 characters.'
    );
    const emailErrorMessage = await screen.findByText(
      'Please enter a valid email address.'
    );
    const phoneErrorMessage = await screen.findByText(
      'Please enter a valid phone number contains more than 5 characters.'
    );

    expect(nameErrorMessage).toBeInTheDocument();
    expect(emailErrorMessage).toBeInTheDocument();
    expect(phoneErrorMessage).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });
});
