import { MockedProvider } from '@apollo/client/testing';
import { UPDATE_PROJECT } from '@graphql/mutations';
import { project } from '@mocks';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import EditProject from './EditProject';

const onCloseModal = () => vitest.fn();

const spy = vitest.fn(() => ({
  data: {
    project: [],
  },
}));

const mocks = [
  {
    request: {
      query: UPDATE_PROJECT,
      variables: {
        id: '62dfe6ed894b8a3b0a4e4df8',
        name: 'Project 1',
        description: 'Project Description',
      },
    },
    newData: spy,
  },
];

const renderEditProject = () =>
  render(
    <MockedProvider mocks={mocks}>
      <EditProject
        onCloseModal={onCloseModal}
        project={project}
        shouldShowModal={true}
      />
    </MockedProvider>
  );

describe('EditProject component', () => {
  it('Should render with provided props', async () => {
    renderEditProject();

    const modal = await screen.findByRole('dialog');

    const updateButton = await within(modal).findByRole('button', {
      name: /update project/i,
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

    expect(updateButton).toBeInTheDocument();
    expect(projectDescriptionInput).toBeInTheDocument();
    expect(projectNameInput).toBeInTheDocument();
    expect(projectStatusInput).toBeInTheDocument();
  });

  it('Should call graphql mutation function when user clicks on update button', async () => {
    renderEditProject();

    const modal = await screen.findByRole('dialog');

    const updateButton = await within(modal).findByRole('button', {
      name: /update project/i,
    });

    fireEvent.click(updateButton);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Should show error while user inputs wrong data', async () => {
    renderEditProject();

    const modal = await screen.findByRole('dialog');

    const projectNameInput = await within(modal).findByRole('textbox', {
      name: /name/i,
    });

    const projectDescriptionInput = await within(modal).findByRole('textbox', {
      name: /description/i,
    });

    fireEvent.change(projectNameInput, { target: { value: 'ab' } });
    fireEvent.change(projectDescriptionInput, { target: { value: 'ab' } });

    const nameErrorMessage = await waitFor(() =>
      screen.queryByText(
        'Please enter a valid name contains more than 3 characters.'
      )
    );
    const descriptionErrorMessage = await waitFor(() =>
      screen.queryByText(
        'Please enter a valid description contains more than 5 characters.'
      )
    );

    expect(nameErrorMessage).toBeInTheDocument();
    expect(descriptionErrorMessage).toBeInTheDocument();
  });
});
