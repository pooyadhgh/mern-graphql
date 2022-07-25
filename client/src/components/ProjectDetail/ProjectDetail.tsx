import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { FaTrash } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ClientDetail from '@components/ClientDetail';
import { GET_PROJECTS } from '@graphql/queries';
import { DELETE_PROJECT } from '@graphql/mutations';
import { Project } from '@types';

const ProjectDetail: React.FC<Project> = ({
  name,
  description,
  status,
  client,
  id,
}) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation<{ id: string }, { id: string }>(
    DELETE_PROJECT,
    {
      variables: { id },
      onCompleted: () => navigate('/'),
      refetchQueries: [{ query: GET_PROJECTS }],
    }
  );

  const deleteProjectHandler = (): void => {
    deleteProject();
  };

  return (
    <Card className='mx-auto w-75 card p-5 my-5'>
      <h2 className='h3 mb-3'>{name}</h2>
      <p>{description}</p>

      <h3 className='mt-3 h5'>Project Status</h3>
      <p>{status}</p>

      <ClientDetail {...client} />

      <Button
        variant='danger'
        onClick={deleteProjectHandler}
        className='d-block ms-auto'
      >
        <FaTrash className='mx-1' aria-hidden='true' />
        <span className='px-1'>Delete Project</span>
      </Button>
    </Card>
  );
};

export default ProjectDetail;
