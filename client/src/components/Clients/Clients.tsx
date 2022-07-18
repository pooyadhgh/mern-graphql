import React from 'react';
import { useQuery } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import ClientsTable from '../ClientsTable';
import { ClientsQuery } from '@types';
import { GET_CLIENTS } from '@graphql/queries';

const Clients: React.FC = () => {
  const { loading, error, data } = useQuery<ClientsQuery>(GET_CLIENTS);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>somethong went wrong ...</p>;

  if (!loading && !error && data && data.clients) {
    return (
      <Container className='mt-5'>
        <ClientsTable clients={data.clients} />
      </Container>
    );
  }

  return null;
};

export default Clients;
