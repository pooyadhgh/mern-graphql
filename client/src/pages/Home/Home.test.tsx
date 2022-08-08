import { MockedProvider } from '@apollo/client/testing';
import { GET_CLIENTS, GET_PROJECTS } from '@graphql/queries';
import { client, project } from '@mocks';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

const mockData = [
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
      query: GET_PROJECTS,
    },
    result: {
      data: {
        projects: [project],
      },
    },
  },
];

const renderHomePage = () =>
  render(
    <MockedProvider mocks={mockData}>
      <Router>
        <Home />
      </Router>
    </MockedProvider>
  );

describe('Home Page', () => {
  it('Should render page', () => {
    renderHomePage();

    const heading = screen.queryByText('Home Page');
    const addProjectBtn = screen.queryByText('Add Project');
    const addClientBtn = screen.queryByText('Add Client');

    expect(heading).toBeInTheDocument();
    expect(addProjectBtn).toBeInTheDocument();
    expect(addClientBtn).toBeInTheDocument();
  });

  it('Should open modal when clicking on the button', async () => {
    renderHomePage();

    const addProjectBtn = await screen.findByRole('button', {
      name: /add project/i,
    });

    fireEvent.click(addProjectBtn);

    const modal = await screen.findByRole('dialog');

    expect(modal).toBeInTheDocument();
  });
});
