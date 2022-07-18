import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/logo.png';

const Header: React.FC = () => {
  return (
    <>
      <Navbar bg='light' className='mb-2'>
        <Container>
          <Navbar.Brand href='/' className='text-primary'>
            <img
              alt='Home Page'
              src={logo}
              width='30'
              height='30'
              className='d-inline-block align-top mx-2'
              aria-hidden='true'
            />
            MERN - GraphQL
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
