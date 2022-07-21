import { Project } from '@types';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaUser, FaCheckSquare } from 'react-icons/fa';

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
        <Card.Title>{name}</Card.Title>

        <Card.Text>
          <div className='d-flex align-items-center my-2'>
            <FaUser className='mx-1' aria-hidden='true' color='#999999' />
            <span className='px-1'>{client?.name}</span>
          </div>

          <div className='d-flex align-items-center my-2'>
            <FaCheckSquare
              className='mx-1'
              aria-hidden='true'
              color='#999999'
            />
            <span className='px-1'>{status}</span>
          </div>

          {description}
        </Card.Text>
        <Button variant='outline-primary' href={`/project/${id}`}>
          View More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
