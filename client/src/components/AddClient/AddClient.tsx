import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import Modal from '@components/Modal';
import Button from 'react-bootstrap/Button';

const AddClient: React.FC = () => {
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);
  const modalCloseHandler = (): void => {
    setShouldShowModal(false);
  };

  const buttonClickHandler = (): void => {
    setShouldShowModal(true);
  };

  return (
    <>
      <Button
        variant='primary'
        onClick={buttonClickHandler}
        className='text-white d-flex align-items-center p-2'
      >
        <FaUser className='mx-1' aria-hidden='true' />
        <span className='px-1'>Add Client</span>
      </Button>

      <Modal
        title='Add Client'
        shouldShowModal={shouldShowModal}
        onClose={modalCloseHandler}
      >
        children
      </Modal>
    </>
  );
};

export default AddClient;
