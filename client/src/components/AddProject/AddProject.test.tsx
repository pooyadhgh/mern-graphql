import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { ADD_PROJECT } from '@graphql/mutations';
import { GET_CLIENTS } from '@graphql/queries';
import { client } from '@mocks';
import AddProject from './AddProject';

const onCloseModal = () => vitest.fn();

const spy = vitest.fn(() => ({
  data: {
    addProject: [],
  },
}));

const mocks = [
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
      query: ADD_PROJECT,
      variables: {
        name: 'abc',
        description: 'abcde',
        clientId: '62e7f8e85fc98adb86409923',
        status: 'new',
      },
    },
    newData: spy,
  },
];

const renderAddProject = async () => {
  render(
    <MockedProvider mocks={mocks}>
      <AddProject onCloseModal={onCloseModal} modalOpen={true} />
    </MockedProvider>
  );

  const modal = await screen.findByRole('dialog');
  const addButton = await within(modal).findByRole('button', {
    name: /add new project/i,
  });
  const projectNameInput = await within(modal).findByRole('textbox', {
    name: /name/i,
  });
  const projectDescriptionInput = await within(modal).findByRole('textbox', {
    name: /description/i,
  });
  const projectStatusInput = await within(modal).findByRole('combobox', {
    name: /status/i,
  });
  const projectClientInput = await within(modal).findByRole('combobox', {
    name: /client/i,
  });

  return {
    modal,
    addButton,
    projectNameInput,
    projectDescriptionInput,
    projectStatusInput,
    projectClientInput,
  };
};
describe('AddProject component', () => {
  it('Should render with provided props', async () => {
    const {
      addButton,
      projectNameInput,
      projectDescriptionInput,
      projectStatusInput,
      projectClientInput,
    } = await renderAddProject();

    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled();
    expect(projectDescriptionInput).toBeInTheDocument();
    expect(projectNameInput).toBeInTheDocument();
    expect(projectStatusInput).toBeInTheDocument();
    expect(projectClientInput).toBeInTheDocument();
  });

  it('Should call graphql mutation function when user clicks on add button', async () => {
    const {
      modal,
      addButton,
      projectNameInput,
      projectDescriptionInput,
      projectClientInput,
    } = await renderAddProject();

    const clientOption = await within(modal).findByText('John Doe');

    fireEvent.change(projectNameInput, { target: { value: 'abc' } });
    fireEvent.change(projectDescriptionInput, { target: { value: 'abcde' } });
    fireEvent.change(projectClientInput, {
      target: { value: '62e7f8e85fc98adb86409923' },
    });
    userEvent.selectOptions(projectClientInput, clientOption);
    fireEvent.click(addButton);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Should show error while user inputs wrong data', async () => {
    const { addButton, projectNameInput, projectDescriptionInput } =
      await renderAddProject();

    fireEvent.change(projectNameInput, { target: { value: 'ab' } });
    fireEvent.change(projectDescriptionInput, { target: { value: 'ab' } });

    const nameErrorMessage = await screen.findByText(
      'Please enter a valid name contains more than 3 characters.'
    );

    const descriptionErrorMessage = await screen.findByText(
      'Please enter a valid description contains more than 5 characters.'
    );

    expect(nameErrorMessage).toBeInTheDocument();
    expect(descriptionErrorMessage).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });
});
