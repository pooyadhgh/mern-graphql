import React from 'react';
import AddClient from '@pages/Home/components/AddClient';
import Clients from '@pages/Home/components/Clients';
import Projects from '@pages/Home/components/Projects';

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
