import React from 'react';
import AddClient from '@components/AddClient';
import Clients from '@components/Clients';
import Projects from '@components/Projects';

const Home: React.FC = () => {
  return (
    <>
      <AddClient />
      <Projects />
      <Clients />
    </>
  );
};

export default Home;
