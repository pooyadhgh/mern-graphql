import React from 'react';
import AddClient from '@components/AddClient';
import AddProject from '@components/AddProject';
import Clients from '@components/Clients';
import Projects from '@components/Projects';

const Home: React.FC = () => {
  return (
    <>
      <h1 className='my-5 h2'>Home Page</h1>

      <div className='d-flex gap-3'>
        <AddClient />
        <AddProject />
      </div>

      <Projects />
      <Clients />
    </>
  );
};

export default Home;
