import React from 'react';
import { useQuery } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import { ClientsQuery } from '@types';
import { GET_CLIENTS } from '@graphql/queries';
import ClientsTable from '@components/ClientsTable';
import Spinner from '@components/Spinner';
import Alert from '@components/Alert';

const Clients: React.FC = () => {
  const { loading, error, data } = useQuery<ClientsQuery>(GET_CLIENTS);

  if (loading) return <Spinner />;

  if (error)
    return <Alert variant='danger'>Oops! Somethong went wrong...</Alert>;

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
