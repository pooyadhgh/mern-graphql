import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { UPDATE_PROJECT } from '@graphql/mutations';
import { project } from '@mocks';
import ProjectDetail from './ProjectDetail';

const spy = vitest.fn(() => ({
  data: {
    updateProject: [],
  },
}));

const updateProjectData = [
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

const renderProjectDetail = () =>
  render(
    <MockedProvider mocks={updateProjectData}>
      <Router>
        <ProjectDetail project={project} />
      </Router>
    </MockedProvider>
  );

describe('Projects Component', () => {
  it('Should render with provided props', async () => {
    renderProjectDetail();

    const projectName = await screen.findByText('Project 1');
    const projectDescription = await screen.findByText('Project Description');
    const statusHeading = await screen.findByText('Project Status');
    const projectStatus = await screen.findByText('new');

    expect(projectName).toBeInTheDocument();
    expect(projectDescription).toBeInTheDocument();
    expect(statusHeading).toBeInTheDocument();
    expect(projectStatus).toBeInTheDocument();
  });

  it('Should call graphql mutation function when user clicks on update button in modal', async () => {
    renderProjectDetail();

    const updateBtn = await screen.findByRole('button', {
      name: /update project/i,
    });

    fireEvent.click(updateBtn);

    const modal = await screen.findByRole('dialog');

    const modalUpdateBtn = within(modal).getByRole('button', {
      name: /update project/i,
    });

    fireEvent.click(modalUpdateBtn);

    expect(spy).toBeCalledTimes(1);
  });
});
