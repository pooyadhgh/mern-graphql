import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import { GET_PROJECT } from '@graphql/queries';
import { project } from '@mocks';
import Project from './Project';

vitest.mock('react-router-dom', async () => {
  const router = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...router,
    useParams: () => ({
      id: '62dfe6ed894b8a3b0a4e4df8',
    }),
  };
});

const getProjectSuccessData = [
  {
    request: {
      query: GET_PROJECT,
      variables: { id: '62dfe6ed894b8a3b0a4e4df8' },
    },
    result: {
      data: {
        project,
      },
    },
  },
];

const getProjectErrorData = [
  {
    request: {
      query: GET_PROJECT,
    },
    error: new Error('An error occurred'),
  },
];

const renderProjectPage = (
  mocks: readonly MockedResponse<Record<string, any>>[]
) =>
  render(
    <MockedProvider mocks={mocks}>
      <Router>
        <Project />
      </Router>
    </MockedProvider>
  );

describe('Project Page', () => {
  it('Should render loading', async () => {
    renderProjectPage(getProjectSuccessData);

    const loading = await screen.findByText('Loading...');

    expect(loading).toBeInTheDocument();
  });

  it('Should render page', async () => {
    renderProjectPage(getProjectSuccessData);

    const button = await screen.findByText('Back Home');
    const heading = await screen.findByText(
      'Project #62dfe6ed894b8a3b0a4e4df8'
    );

    expect(button).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });

  it('Should render error alert', async () => {
    renderProjectPage(getProjectErrorData);

    const alertMessage = await screen.findByText(
      'Oops! Somethong went wrong...'
    );

    expect(alertMessage).toBeInTheDocument();
  });
});
