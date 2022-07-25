import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { FaTrash, FaPen } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ClientDetail from '@components/ClientDetail';
import EditProject from '@components/EditProject';
import { GET_PROJECTS } from '@graphql/queries';
import { DELETE_PROJECT } from '@graphql/mutations';
import { Project } from '@types';

type Props = {
  project: Project;
};

const ProjectDetail: React.FC<Props> = ({ project }) => {
  const { name, description, status, client, id } = project;

  const navigate = useNavigate();
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);

  const [deleteProject] = useMutation<
    { deleteProject: Project },
    { id: string }
  >(DELETE_PROJECT, {
    variables: { id },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <Card className='mx-auto w-75 card p-5 my-5'>
      <h2 className='h3 mb-3'>{name}</h2>
      <p>{description}</p>

      <h3 className='mt-3 h5'>Project Status</h3>
      <p>{status}</p>

      <ClientDetail {...client} />

      <EditProject
        shouldShowModal={shouldShowModal}
        onCloseModal={() => setShouldShowModal(false)}
        project={project}
      />

      <Container className='d-flex px-0 mx-0'>
        <Button
          variant='secondary'
          onClick={() => setShouldShowModal(true)}
          className='d-flex align-items-center p-2 mx-2'
        >
          <FaPen className='mx-1' aria-hidden='true' />
          <span className='px-1'>Update Project</span>
        </Button>

        <Button
          variant='outline-danger'
          onClick={() => deleteProject()}
          className='d-flex align-items-center p-2 mx-2'
        >
          <FaTrash className='mx-1' aria-hidden='true' />
          <span className='px-1'>Delete Project</span>
        </Button>
      </Container>
    </Card>
  );
};

export default ProjectDetail;
