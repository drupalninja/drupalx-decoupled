'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface GalleryProps {
  mediaItems: React.ReactNode[]
  title?: string
  summary?: string
}

export default function Gallery({ mediaItems, title, summary }: GalleryProps) {
  const [openModal, setOpenModal] = useState<number | null>(null);

  return (
    <>
      {title && (
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
      )}
      {summary && (
        <div className="flex justify-center mb-4">
          <div className="text-center pb-3 md:w-2/3">
            <div dangerouslySetInnerHTML={{ __html: summary }} />
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mediaItems.map((item, index) => (
          <div key={index} className="aspect-w-16 aspect-h-9">
            <Button
              variant="ghost"
              className="p-0 w-full h-full"
              onClick={() => setOpenModal(index)}
              data-cy="modal-button"
            >
              {item}
            </Button>
            <Dialog open={openModal === index} onOpenChange={() => setOpenModal(null)}>
              <DialogContent
                className="sm:max-w-[50vw] sm:max-h-[90vh]"
                data-cy="modal"
                aria-describedby={`description-${index}`}
              >
                <DialogHeader>
                  <DialogTitle>{`Image ${index + 1}`}</DialogTitle>
                </DialogHeader>
                <div
                  id={`description-${index}`}
                  className="gallery-body max-h-[70vh] overflow-auto"
                >
                  {item}
                </div>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setOpenModal(null)} className='gallery-close'>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </>
  );
}
