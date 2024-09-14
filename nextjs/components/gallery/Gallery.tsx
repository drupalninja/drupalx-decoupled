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
import { getImage } from '../helpers/Utilities';

interface GalleryProps {
  mediaItems: any[]
}

export default function Gallery({ mediaItems }: GalleryProps) {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {mediaItems.map((item: any, index: number) => (
        <div key={`${item.id}-${index}`} className="aspect-w-16 aspect-h-9">
          <Button
            variant="ghost"
            className="p-0 w-full h-full"
            onClick={() => setOpenModal(item.id)}
            data-cy="modal-button"
          >
            {getImage(item, 'w-full h-full object-cover', 'I43LARGE')}
          </Button>
          <Dialog open={openModal === item.id} onOpenChange={() => setOpenModal(null)}>
            <DialogContent
              className="sm:max-w-[50vw] sm:max-h-[90vh]"
              data-cy="modal"
              aria-describedby={`description-${item.id}`}
            >
              <DialogHeader>
                <DialogTitle>{item?.image?.alt}</DialogTitle>
              </DialogHeader>
              <div
                id={`description-${item.id}`}
                className="gallery-body max-h-[70vh] overflow-auto"
              >
                {getImage(item, 'w-full h-auto', ['I43LARGE', 'I43LARGE2X'])}
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
  );
}
