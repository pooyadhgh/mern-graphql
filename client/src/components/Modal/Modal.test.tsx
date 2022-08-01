import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Modal from './Modal';

const mockTitle = 'title';
const onCloseHandler = vitest.fn();

const renderModal = (shouldShowModal = true) =>
  render(
    <Modal
      title={mockTitle}
      onClose={onCloseHandler}
      shouldShowModal={shouldShowModal}
    >
      {<p>children</p>}
    </Modal>
  );

describe('Modal Component', () => {
  it('Should render modal with provided props', () => {
    renderModal();

    const dialog = screen.getByRole('dialog');
    const title = screen.queryByText('title');
    const children = screen.queryByText('children');

    expect(dialog).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(children).toBeInTheDocument();
  });

  it('Should call onClose prop when clicking on close button', () => {
    renderModal();

    const closeBtn = screen.getByText('Close');
    const title = screen.queryByText('title');

    fireEvent.click(closeBtn);

    waitFor(() => expect(title).not.toBeInTheDocument());
    waitFor(() => expect(onCloseHandler).toBeCalled());
  });

  it('Should not show component if shouldShowModal is false', () => {
    renderModal(false);

    const title = screen.queryByText('title');

    expect(title).not.toBeInTheDocument();
  });
});
