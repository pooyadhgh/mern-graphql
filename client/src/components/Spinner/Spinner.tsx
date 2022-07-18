import React from 'react';
import { default as BoostrapSpinner } from 'react-bootstrap/Spinner';

export const Spinner: React.FC = () => {
  return (
    <div className='d-flex justify-content-center m-5'>
      <BoostrapSpinner animation='border' role='status' variant='primary'>
        <span className='visually-hidden'>Loading...</span>
      </BoostrapSpinner>
    </div>
  );
};
