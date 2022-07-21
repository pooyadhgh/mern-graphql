import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import apolloClient from '@graphql/apolloClient';
import Container from 'react-bootstrap/Container';
import Header from '@components/Header';
import Home from '@pages/Home';

const App: React.FC = () => {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Router>
          <Header />
          <Container className='my-5'>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </Container>
        </Router>
      </ApolloProvider>
    </>
  );
};

export default App;
