import React from 'react';
import { useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '@graphql/queries';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from '@components/Spinner';
import Alert from '@components/Alert';
import ProjectDetail from '@components/ProjectDetail';
import { Project as ProjectType } from '@types';

const Project: React.FC = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<{ project: ProjectType }>(
    GET_PROJECT,
    {
      variables: { id },
    }
  );

  if (loading) return <Spinner />;

  if (error)
    return <Alert variant='danger'>Oops! Somethong went wrong...</Alert>;

  if (!loading && !error && data && data.project) {
    return (
      <Container>
        <LinkContainer to='/'>
          <Button variant='light' className='text-dark'>
            Back Home
          </Button>
        </LinkContainer>

        <h1 className='my-5 h2'>{`Project #${id}`}</h1>

        <ProjectDetail {...data.project} />
      </Container>
    );
  }

  return null;
};

export default Project;
