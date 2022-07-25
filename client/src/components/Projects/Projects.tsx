import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '@graphql/queries';
import Spinner from '@components/Spinner';
import Alert from '@components/Alert';
import ProjectCard from '@components/ProjectCard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Project } from '@types';

const Projects: React.FC = () => {
  const { loading, error, data } = useQuery<{ projects: Project[] }>(
    GET_PROJECTS
  );

  if (loading) return <Spinner />;

  if (error)
    return <Alert variant='danger'>Oops! Somethong went wrong...</Alert>;

  if (!loading && !error && data && data.projects) {
    return (
      <>
        <h2 className='mt-5 h3'>Projects</h2>

        {!data.projects.length ? (
          <p>No projects found</p>
        ) : (
          <Row xs={1} sm={2} lg={3} className='mt-3 mb-5'>
            {data.projects.map((project) => (
              <Col key={project.id}>
                <ProjectCard {...project} />
              </Col>
            ))}
          </Row>
        )}
      </>
    );
  }

  return null;
};

export default Projects;
