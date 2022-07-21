import React from 'react';
import Card from 'react-bootstrap/Card';
import ClientDetail from '@components/ClientDetail';
import { Project } from '@types';

const ProjectDetail: React.FC<Project> = ({
  name,
  description,
  status,
  client,
}) => {
  return (
    <Card className='mx-auto w-75 card p-5 my-5'>
      <h2 className='h3 mb-3'>{name}</h2>
      <p>{description}</p>

      <h3 className='mt-3 h5'>Project Status</h3>
      <p>{status}</p>

      <ClientDetail {...client} />
    </Card>
  );
};

export default ProjectDetail;
