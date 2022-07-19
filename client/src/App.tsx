import React from 'react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@graphql/apolloClient';
import Header from '@components/Header';
import Clients from '@components/Clients';

const App: React.FC = () => {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Header />
        <Clients />
      </ApolloProvider>
    </>
  );
};

export default App;
