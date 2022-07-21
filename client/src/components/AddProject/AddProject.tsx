import React, { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '@graphql/mutations';
import { GET_CLIENTS, GET_PROJECTS } from '@graphql/queries';
import Modal from '@components/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Client, Project } from '@types';

enum StatusType {
  New = 'new',
  InProgress = 'progress',
  Completed = 'completed',
}

const AddProject: React.FC = () => {
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<StatusType>(StatusType.New);
  const [clientId, setClientId] = useState<string>('');

  const { data: clientsData } = useQuery<{ clients: Client[] }>(GET_CLIENTS);

  const [addProject] = useMutation<
    { addProject: Project },
    { name: string; description: string; clientId: string; status: StatusType }
  >(ADD_PROJECT, {
    variables: {
      name: name.trim(),
      description: description.trim(),
      clientId: clientId.trim(),
      status,
    },
    update(cache, { data }) {
      const cacheData = cache.readQuery<{ projects: Project[] }>({
        query: GET_PROJECTS,
      });

      if (cacheData && data) {
        cache.writeQuery({
          query: GET_PROJECTS,
          data: {
            projects: [...cacheData.projects, data.addProject],
          },
        });
      }
    },
  });

  const modalCloseHandler = (): void => {
    setShouldShowModal(false);
    setName('');
    setDescription('');
    setClientId('');
    setStatus(StatusType.New);
  };

  const buttonClickHandler = (): void => {
    setShouldShowModal(true);
  };

  const formSubmitHandler = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    addProject();
    modalCloseHandler();
  };

  const isNameValid = name.length > 2;
  const isDescriptionValid = description.length > 4;
  const isClientIdValid = clientId !== '';
  const isButtonDisabled =
    !isNameValid || !isDescriptionValid || !isClientIdValid;

  return (
    <>
      <Button
        variant='secondary'
        onClick={buttonClickHandler}
        className='text-white d-flex align-items-center p-2'
      >
        <FaList className='mx-1' aria-hidden='true' />
        <span className='px-1'>Add Project</span>
      </Button>

      <Modal
        title='Add Project'
        shouldShowModal={shouldShowModal}
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
              <Form.Text
                className='text-danger'
                role='status'
                aria-live='polite'
              >
                Please enter a valid name contains more than 3 characters.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className='mb-3' controlId='status'>
            <Form.Label>Status</Form.Label>
            <Form.Select
              onChange={(event) => setStatus(event.target.value as StatusType)}
              aria-required={true}
              required
            >
              <option value={StatusType.New}>New</option>
              <option value={StatusType.InProgress}>In Progress</option>
              <option value={StatusType.Completed}>Completed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3' controlId='clientId'>
            <Form.Label>Client</Form.Label>
            <Form.Select
              onChange={(event) => setClientId(event.target.value)}
              aria-required={true}
              required
            >
              <option value=''>Select a client</option>
              {clientsData?.clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3' controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              type='text'
              placeholder='Description'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              isValid={isDescriptionValid}
              isInvalid={!!description && !isDescriptionValid}
              aria-invalid={!!description && !isDescriptionValid}
              aria-required={true}
              required
            />
            {!!description && !isDescriptionValid && (
              <Form.Text
                className='text-danger'
                role='status'
                aria-live='polite'
              >
                Please enter a valid name contains more than 5 characters.
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
            Add New Project
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default AddProject;
