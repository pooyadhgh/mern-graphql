import React from 'react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@graphql/apolloClient';
import Container from 'react-bootstrap/Container';
import Header from '@components/Header';
import Clients from '@components/Clients';
import AddClient from '@components/AddClient';

const App: React.FC = () => {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Header />
        <Container className='mt-5'>
          <AddClient />
          <Clients />
        </Container>
      </ApolloProvider>
    </>
  );
};

export default App;
