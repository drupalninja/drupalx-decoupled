import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';

interface ModalTypes {
  buttonText: string
  modalName: string
  title?: string
  body?: string
  closeButtonName: string
  saveButton: {
    name: string
    redirects: string
  }
}

const ModalComponent = ({
  buttonText = 'Launch demo modal',
  modalName = 'example',
  title,
  body,
  closeButtonName,
  saveButton
}: ModalTypes) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        data-bs-toggle="modal"
        data-bs-target={`#${modalName}Modal`}
        data-cy="modal-button"
      >
        {buttonText}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="fade"
        id={`${modalName}Modal`}
        tabindex="-1"
        aria-labelledby={`${modalName}ModalLabel`}
        aria-hidden="true"
        data-cy="modal"
      >
        <div data-cy="modal-content" className="modal-content p-2">
          <Modal.Header
            data-cy="modal-header"
            className="pb-0 border-0"
            closeButton
          >
            <Modal.Title
              data-cy="modal-title"
              className="modal-title fs-4"
              id="exampleModalLabel"
            >
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body data-cy="modal-body" className="pb-0 fs-6">
            <p>{body}</p>
          </Modal.Body>
          <Modal.Footer data-cy="modal-footer" className="border-0">
            <a
              type="button"
              className="btn btn-outline-primary me-2"
              href="#"
              data-bs-dismiss="modal"
              onClick={handleClose}
              data-cy="modal-close-btn"
            >
              {closeButtonName}
            </a>
            <a
              type="button"
              className="btn btn-primary"
              href={saveButton.redirects}
              data-cy="modal-save-btn"
            >
              {saveButton.name}
            </a>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  )
}

export default ModalComponent
