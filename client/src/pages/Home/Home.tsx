import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaList, FaUser } from 'react-icons/fa';
import AddClient from '@components/AddClient';
import AddProject from '@components/AddProject';
import Clients from '@components/Clients';
import Projects from '@components/Projects';

enum ModalType {
  AddProject = 'addProject',
  AddClient = 'addClient',
}

const Home: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<ModalType | null>(null);

  const modalCloseHandler = (): void => {
    setModalOpen(null);
  };

  return (
    <>
      <h1 className='my-5 h2'>Home Page</h1>

      <Container className='d-flex gap-3 mx-0 px-0'>
        <Button
          variant='secondary'
          onClick={() => setModalOpen(ModalType.AddProject)}
          className='text-white d-flex align-items-center p-2'
        >
          <FaList className='mx-1' aria-hidden='true' />
          <span className='px-1'>Add Project</span>
        </Button>

        <Button
          variant='secondary'
          onClick={() => setModalOpen(ModalType.AddClient)}
          className='text-white d-flex align-items-center p-2'
        >
          <FaUser className='mx-1' aria-hidden='true' />
          <span className='px-1'>Add Client</span>
        </Button>
      </Container>

      <AddClient
        onCloseModal={modalCloseHandler}
        modalOpen={modalOpen === ModalType.AddClient}
      />
      <AddProject
        onCloseModal={modalCloseHandler}
        modalOpen={modalOpen === ModalType.AddProject}
      />
      <Projects />
      <Clients />
    </>
  );
};

export default Home;
