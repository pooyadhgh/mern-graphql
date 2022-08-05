import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from '@components/Modal';
import { UPDATE_PROJECT } from '@graphql/mutations';
import { GET_PROJECT } from '@graphql/queries';
import { Project, Status } from '@types';
import { mapProjectStatus } from '@utils';

type Props = {
  shouldShowModal: boolean;
  onCloseModal: () => void;
  project: Project;
};

const EditProject: React.FC<Props> = ({
  shouldShowModal,
  onCloseModal,
  project,
}) => {
  const [name, setName] = useState<string>(project.name);
  const [description, setDescription] = useState<string>(project.description);
  const [status, setStatus] = useState<Status>(
    mapProjectStatus(project.status)
  );

  const [updateProject] = useMutation<
    { updateProject: Project },
    { name: string; description: string; id: string; status: Status }
  >(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name,
      description,
      status,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const formSubmitHandler = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    updateProject();
    onCloseModal();
  };

  const isNameValid = name.length > 2;
  const isDescriptionValid = description.length > 4;
  const isButtonDisabled = !isNameValid || !isDescriptionValid;

  return (
    <>
      <Modal
        shouldShowModal={shouldShowModal}
        title='Update Project'
        onClose={onCloseModal}
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
              onChange={(event) => setStatus(event.target.value as Status)}
              aria-required={true}
              defaultValue={status}
              required
            >
              <option value={Status.New}>New</option>
              <option value={Status.InProgress}>In Progress</option>
              <option value={Status.Completed}>Completed</option>
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
                Please enter a valid description contains more than 5
                characters.
              </Form.Text>
            )}
          </Form.Group>

          <Button
            variant='primary'
            type='submit'
            className='text-white mt-5 mb-3 d-block mx-auto'
            onClick={formSubmitHandler}
            disabled={isButtonDisabled}
            aria-disabled={isButtonDisabled}
          >
            Update Project
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default EditProject;
