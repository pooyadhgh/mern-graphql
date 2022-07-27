import React, { Suspense } from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import apolloClient from '@graphql/apolloClient';
import Container from 'react-bootstrap/Container';
import Header from '@components/Header';
import Spinner from '@components/Spinner';
import Home from '@pages/Home/Lazy';
import NotFound from '@pages/NotFound/Lazy';
import Project from '@pages/Project/Lazy';

const App: React.FC = () => {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Router>
          <Header />
          <Suspense fallback={<Spinner />}>
            <Container className='my-5'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/project/:id' element={<Project />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Container>
          </Suspense>
        </Router>
      </ApolloProvider>
    </>
  );
};

export default App;
