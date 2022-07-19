import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import { Client, ClientsQuery } from '@types';
import { GET_CLIENTS } from '@graphql/queries';
import { DELETE_CLIENT } from '@graphql/mutations';
import ClientsTable from '@components/ClientsTable';
import Spinner from '@components/Spinner';
import Alert from '@components/Alert';

const Clients: React.FC = () => {
  const { loading, error, data } = useQuery<ClientsQuery>(GET_CLIENTS);

  const [deleteClient] = useMutation<{ deleteClient: Client }, { id: string }>(
    DELETE_CLIENT,
    {
      update(cache, { data }) {
        const cacheData = cache.readQuery<{ clients: Client[] }>({
          query: GET_CLIENTS,
        });

        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: cacheData?.clients.filter(
              (item) => item.id !== data?.deleteClient.id
            ),
          },
        });
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
      <Container className='mt-5'>
        <ClientsTable clients={data.clients} onRemoveClient={onRemoveHandler} />
      </Container>
    );
  }

  return null;
};

export default Clients;
