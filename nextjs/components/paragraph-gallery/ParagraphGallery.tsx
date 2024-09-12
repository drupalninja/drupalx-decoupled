'use client'

import { useState } from 'react';
import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphGalleryFragment } from '@/graphql/fragments/paragraph';
import { TextSummaryFragment } from '@/graphql/fragments/misc';
import { getImage } from '../helpers/Utilities';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface ParagraphGalleryProps {
  paragraph: FragmentOf<typeof ParagraphGalleryFragment>
  modifier?: string
}

export default function ParagraphGallery({ paragraph, modifier }: ParagraphGalleryProps) {
  const { title, gallerySummary, mediaItem } = readFragment(ParagraphGalleryFragment, paragraph);
  const gallerySummaryFragment = readFragment(TextSummaryFragment, gallerySummary);

  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div className={modifier ?? 'container my-6 my-lg-15'}>
      {title && (
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
      )}
      {gallerySummaryFragment && (
        <div className="flex justify-center">
          <div className="text-center pb-3 md:w-2/3">
            <div dangerouslySetInnerHTML={{ __html: gallerySummaryFragment?.value ?? '' }} />
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {mediaItem.map((item: any) => (
          <div key={item.id}>
            <Button
              variant="ghost"
              className="p-0 w-full h-full"
              onClick={() => setOpenModal(item.id)}
              data-cy="modal-button"
            >
              {getImage(item, 'w-full h-auto', 'I43SMALL')}
            </Button>
            <Dialog open={openModal === item.id} onOpenChange={() => setOpenModal(null)}>
              <DialogContent className="sm:max-w-[425px]" data-cy="modal">
                <DialogHeader>
                  <DialogTitle>{item?.image?.alt}</DialogTitle>
                </DialogHeader>
                <div className="gallery-body">
                  {getImage(item, 'w-full h-auto', ['I43SMALL', 'I43LARGE2X'])}
                </div>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setOpenModal(null)}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
