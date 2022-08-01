import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { project } from '@mocks';

describe('ProjectCard Component', () => {
  it('Should render with provided props', () => {
    render(
      <Router>
        <ProjectCard {...project} />
      </Router>
    );

    const projectURL = '/project/62dfe6ed894b8a3b0a4e4df8';
    const viewMoreButton = screen.queryByText('View More');
    const projectTitle = screen.queryByText('Project 1');
    const projectDescription = screen.queryByText('Project Description');
    const projectStatus = screen.queryByText('new');
    const projectId = screen.queryByText('62dfe6ed894b8a3b0a4e4df8');
    const clientName = screen.queryByText('John Doe');

    expect(viewMoreButton).toBeInTheDocument();
    expect(viewMoreButton).toHaveAttribute('href', projectURL);
    expect(projectTitle).toBeInTheDocument();
    expect(projectDescription).toBeInTheDocument();
    expect(projectStatus).toBeInTheDocument();
    expect(projectId).not.toBeInTheDocument();
    expect(clientName).toBeInTheDocument();
  });
});
