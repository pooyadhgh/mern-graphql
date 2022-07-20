import React from 'react';
import Button from 'react-bootstrap/Button';
import { default as BootstrapModal } from 'react-bootstrap/Modal';

type Props = {
  title: string;
  onClose: () => void;
  shouldShowModal: boolean;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({
  title,
  onClose,
  shouldShowModal,
  children,
}) => {
  return (
    <>
      <BootstrapModal
        show={shouldShowModal}
        onHide={onClose}
        backdrop='static'
        centered
      >
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>{title}</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>{children}</BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button variant='light' onClick={onClose}>
            Close
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};

export default Modal;
