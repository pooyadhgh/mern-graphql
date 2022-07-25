import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '@graphql/mutations';
import { GET_CLIENTS } from '@graphql/queries';
import Modal from '@components/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Client } from '@types';

type Props = {
  onCloseModal: () => void;
  modalOpen: boolean;
};

const AddClient: React.FC<Props> = ({ modalOpen, onCloseModal }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [addClient] = useMutation<
    { addClient: Client },
    { name: string; email: string; phone: string }
  >(ADD_CLIENT, {
    variables: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim().toLowerCase(),
    },
    update(cache, { data }) {
      const cacheData = cache.readQuery<{ clients: Client[] }>({
        query: GET_CLIENTS,
      });

      if (cacheData && data) {
        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: [...cacheData.clients, data.addClient],
          },
        });
      }
    },
  });

  const modalCloseHandler = (): void => {
    setName('');
    setEmail('');
    setPhone('');
    onCloseModal();
  };

  const formSubmitHandler = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    addClient();
    modalCloseHandler();
  };

  const isNameValid = name.length > 2;
  const isPhoneValid = phone.length > 4;
  const isEmailValid = !!email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const isButtonDisabled = !isEmailValid || !isNameValid || !isEmailValid;

  return (
    <Modal
      title='Add Client'
      shouldShowModal={modalOpen}
      onClose={modalCloseHandler}
    >
      <Form>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            isValid={isNameValid}
            isInvalid={!!name && !isNameValid}
            aria-invalid={!!name && !isNameValid}
            aria-required={true}
            required
          />
          {!!name && !isNameValid && (
            <Form.Text className='text-danger' role='status' aria-live='polite'>
              Please enter a valid name contains more than 3 characters.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Email address'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            isValid={isEmailValid}
            isInvalid={!!email && !isEmailValid}
            aria-invalid={!!email && !isEmailValid}
            aria-required={true}
            required
          />
          {!!email && !isEmailValid && (
            <Form.Text className='text-danger' role='status' aria-live='polite'>
              Please enter a valid email address.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className='mb-3' controlId='phone'>
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type='text'
            placeholder='Phone number'
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            isValid={isPhoneValid}
            isInvalid={!!phone && !isPhoneValid}
            aria-invalid={!!phone && !isPhoneValid}
            aria-required={true}
            required
          />
          {!!phone && !isPhoneValid && (
            <Form.Text className='text-danger' role='status' aria-live='polite'>
              Please enter a valid phone number contains more than 5 characters.
            </Form.Text>
          )}
        </Form.Group>

        <Button
          variant='primary'
          type='submit'
          className='text-white my-3 d-block mx-auto'
          onClick={formSubmitHandler}
          disabled={isButtonDisabled}
          aria-disabled={isButtonDisabled}
        >
          Add New Client
        </Button>
      </Form>
    </Modal>
  );
};

export default AddClient;
