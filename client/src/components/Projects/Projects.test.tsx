import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GET_PROJECTS } from '@graphql/queries';
import { project } from '@mocks';
import Projects from './Projects';

const getProjectsSuccessData = [
  {
    request: {
      query: GET_PROJECTS,
    },
    result: {
      data: {
        projects: [project],
      },
    },
  },
];

const getProjectsErrorData = [
  {
    request: {
      query: GET_PROJECTS,
    },
    error: new Error('An error occurred'),
  },
];

const renderProjects = (
  mocks: readonly MockedResponse<Record<string, any>>[]
) =>
  render(
    <MockedProvider mocks={mocks}>
      <Router>
        <Projects />
      </Router>
    </MockedProvider>
  );

describe('Projects Component', () => {
  it('Should render loading', async () => {
    renderProjects(getProjectsSuccessData);

    const loading = await screen.findByText('Loading...');

    expect(loading).toBeInTheDocument();
  });

  it('Should render data', async () => {
    renderProjects(getProjectsSuccessData);

    const projectsHeading = await screen.findByText('Projects');
    const clientName = await screen.findByText('John Doe');
    const projectName = await screen.findByText('Project 1');
    const projectDescription = await screen.findByText('Project Description');
    const projectStatus = await screen.findByText('new');

    expect(projectsHeading).toBeInTheDocument();
    expect(clientName).toBeInTheDocument();
    expect(projectName).toBeInTheDocument();
    expect(projectDescription).toBeInTheDocument();
    expect(projectStatus).toBeInTheDocument();
  });

  it('Should render error alert', async () => {
    renderProjects(getProjectsErrorData);

    const alertMessage = await screen.findByText(
      'Oops! Somethong went wrong...'
    );

    expect(alertMessage).toBeInTheDocument();
  });
});
