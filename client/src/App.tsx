import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Header from './components/Header';
import Clients from './components/Clients';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <Clients />
      </ApolloProvider>
    </>
  );
};

export default App;
