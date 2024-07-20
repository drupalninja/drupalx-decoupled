'use client'

import { useState } from 'react';
import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphGalleryFragment } from '@/graphql/fragments/paragraph';
import { Button, Modal } from 'react-bootstrap';
import { TextSummaryFragment } from '@/graphql/fragments/misc';
import { getImage } from '../helpers/Utilities';
import './ParagraphGallery.scss';

interface ParagraphGalleryProps {
  paragraph: FragmentOf<typeof ParagraphGalleryFragment>
  modifier?: string
}

export default function ParagraphGallery({ paragraph, modifier }: ParagraphGalleryProps) {
  const { title, gallerySummary, mediaItem } = readFragment(ParagraphGalleryFragment, paragraph);
  const gallerySummaryFragment = readFragment(TextSummaryFragment, gallerySummary);

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className={modifier}>
      {title && (
        <div className="mb-4 text-md-center">
          <h2>{title}</h2>
        </div>
      )}
      {gallerySummaryFragment && (
        <div className="d-flex justify-content-center">
          <div className="text-md-center pb-3 col-md-8">
            <div dangerouslySetInnerHTML={{ __html: gallerySummaryFragment?.value ?? '' }} />
          </div>
        </div>
      )}
      <div className="row">
        {mediaItem.map((item: any, index: number) => (
          <div key={item.id} className="col-6 col-md-3 mb-3">
            <Button
              className='p-0'
              variant='link'
              onClick={handleShow}
              data-bs-toggle="modal"
              data-bs-target={`#${item.id}Modal`}
              data-cy="modal-button"
            >
              {getImage(item)}
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
                  <Modal.Title>{item?.image?.alt}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="gallery-body">
                  {getImage(item)}
                </Modal.Body>
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
}
