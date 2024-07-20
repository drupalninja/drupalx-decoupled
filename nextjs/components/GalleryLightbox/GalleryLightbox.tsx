import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import './GalleryLightbox.scss';

interface GalleryLightboxProps {
  sectionTitle?: string;
  introText?: string;
  galleryItems: {
    id: string;
    media: React.ReactNode;
    mediaThumb: React.ReactNode;
    mediaDescription: string;
  }[];
  modifier?: string;
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  sectionTitle,
  introText,
  galleryItems,
  modifier = 'p-2',
}) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className={modifier}>
      {sectionTitle && (
        <div className="mb-4 text-md-center">
          <h2>{sectionTitle}</h2>
        </div>
      )}
      {introText && (
        <div className="d-flex justify-content-center">
          <div className="text-md-center pb-3 col-md-8">
            <div dangerouslySetInnerHTML={{ __html: introText }} />
          </div>
        </div>
      )}
      <div className="row">
        {galleryItems.map((item) => (
          <div key={item.id} className="col-6 col-md-3 mb-3">
            <Button
              className='p-0'
              variant='link'
              onClick={handleShow}
              data-bs-toggle="modal"
              data-bs-target={`#${item.id}Modal`}
              data-cy="modal-button"
            >
              {item.mediaThumb}
            </Button>
            <Modal
              show={show}
              onHide={handleClose}
              size="lg"
              className="fade"
              id={`${item.id}Modal`}
              aria-labelledby={`${item.id}ModalLabel`}
              aria-hidden="true"
              data-cy="modal"
            >
              <div data-cy="modal-content" className="modal-content">
                <Modal.Header closeButton>
                  <Modal.Title>{item.mediaDescription}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="gallery-body">{item.media}</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </div>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryLightbox;
