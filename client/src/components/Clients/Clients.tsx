import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CLIENTS, GET_PROJECTS } from '@graphql/queries';
import { DELETE_CLIENT } from '@graphql/mutations';
import ClientsTable from '@components/ClientsTable';
import Spinner from '@components/Spinner';
import Alert from '@components/Alert';
import { Client } from '@types';

const Clients: React.FC = () => {
  const { loading, error, data } = useQuery<{ clients: Client[] }>(GET_CLIENTS);

  const [deleteClient] = useMutation<{ deleteClient: Client }, { id: string }>(
    DELETE_CLIENT,
    {
      refetchQueries: [{ query: GET_PROJECTS }, { query: GET_CLIENTS }],
    }
  );

  const onRemoveHandler = (id: string): void => {
    deleteClient({ variables: { id } });
  };

  if (loading) return <Spinner />;

  if (error)
    return <Alert variant='danger'>Oops! Somethong went wrong...</Alert>;

  if (!loading && !error && data && data.clients) {
    return (
      <ClientsTable clients={data.clients} onRemoveClient={onRemoveHandler} />
    );
  }

  return null;
};

export default Clients;
