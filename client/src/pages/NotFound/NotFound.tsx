import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const NotFound: React.FC = () => {
  return (
    <Container className='d-flex my-2 flex-column justify-content-center align-items-center'>
      <FaExclamationTriangle className='text-danger my-2' size='5em' />
      <h1 className='my-5'>404 Page Not Found</h1>
      <LinkContainer to='/'>
        <Button className='text-white'>Go Back Home</Button>
      </LinkContainer>
    </Container>
  );
};

export default NotFound;
