import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Client } from '@types';
import { GET_CLIENTS } from '@graphql/queries';
import { DELETE_CLIENT } from '@graphql/mutations';
import ClientsTable from '@components/ClientsTable';
import Spinner from '@components/Spinner';
import Alert from '@components/Alert';

const Clients: React.FC = () => {
  const { loading, error, data } = useQuery<{ clients: Client[] }>(GET_CLIENTS);

  const [deleteClient] = useMutation<{ deleteClient: Client }, { id: string }>(
    DELETE_CLIENT,
    {
      update(cache, { data }) {
        const cacheData = cache.readQuery<{ clients: Client[] }>({
          query: GET_CLIENTS,
        });

        if (cacheData && data) {
          cache.writeQuery({
            query: GET_CLIENTS,
            data: {
              clients: cacheData.clients.filter(
                (item) => item.id !== data.deleteClient.id
              ),
            },
          });
        }
      },
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
