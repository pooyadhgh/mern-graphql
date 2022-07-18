import React from 'react';
import { default as BootstrapAlert } from 'react-bootstrap/Alert';

type Props = {
  children: React.ReactNode;
  variant: string;
};

const Alert: React.FC<Props> = ({ children, variant }) => {
  return (
    <BootstrapAlert
      variant={variant}
      role='alert'
      className='d-block w-75 m-auto'
    >
      {children}
    </BootstrapAlert>
  );
};

export default Alert;
