import React from 'react';
import { Project } from '@types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaUser, FaCheckSquare } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const ProjectCard: React.FC<Project> = ({
  client,
  name,
  description,
  id,
  status,
}) => {
  return (
    <Card className='my-1'>
      <Card.Body>
        <Card.Title as='h3' className='h5'>
          {name}
        </Card.Title>

        <Card.Text as='div' className='text-truncate mb-3'>
          <div className='d-flex align-items-center my-2'>
            <FaUser className='mx-1 text-muted' aria-hidden='true' />
            <span className='px-1 text-muted'>{client?.name}</span>
          </div>

          <div className='d-flex align-items-center my-2'>
            <FaCheckSquare className='mx-1 text-muted' aria-hidden='true' />
            <span className='px-1 text-muted'>{status}</span>
          </div>

          {description}
        </Card.Text>
        <LinkContainer to={`/project/${id}`}>
          <Button variant='outline-primary'>View More</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
