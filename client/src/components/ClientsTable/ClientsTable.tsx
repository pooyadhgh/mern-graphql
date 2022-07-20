import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaTrash } from 'react-icons/fa';
import { Client } from '@types';

type Props = {
  clients: Client[];
  onRemoveClient: (id: string) => void;
};

const ClientsTable: React.FC<Props> = ({ clients, onRemoveClient }) => {
  return (
    <Table striped className='mt-5'>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {clients.map(({ id, name, phone, email }, index) => (
          <tr key={id}>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
              <Button
                variant='danger'
                size='sm'
                aria-label='Delete Client'
                onClick={() => onRemoveClient(id)}
              >
                <FaTrash aria-hidden={true} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ClientsTable;
