import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';
import { Client } from '@types';

const ClientDetail: React.FC<Client> = ({ name, email, phone }) => {
  return (
    <>
      <h2 className='mt-5 mb-3 h3'>Client Information</h2>

      <ListGroup as='ul' className='mb-5'>
        <ListGroup.Item as='li'>
          <FaIdBadge className='mx-1 text-muted' />
          <span className='px-1'>{name}</span>
        </ListGroup.Item>

        <ListGroup.Item as='li'>
          <FaEnvelope className='mx-1 text-muted' />
          <span className='px-1'>{email}</span>
        </ListGroup.Item>

        <ListGroup.Item as='li'>
          <FaPhone className='mx-1 text-muted' />
          <span className='px-1'>{phone}</span>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default ClientDetail;
