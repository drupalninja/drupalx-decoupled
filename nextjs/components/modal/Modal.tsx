import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalTypes {
  buttonText: string;
  modalName: string;
  title?: string;
  body?: string;
  closeButtonName: string;
  saveButton: {
    name: string;
    redirects: string;
  };
}

const ModalComponent = ({
  buttonText = 'Launch demo modal',
  modalName = 'example',
  title,
  body,
  closeButtonName,
  saveButton
}: ModalTypes) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          data-cy="modal-button"
        >
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        data-cy="modal"
      >
        <DialogHeader>
          <DialogTitle data-cy="modal-title">{title}</DialogTitle>
          <DialogDescription data-cy="modal-body">
            {body}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            data-cy="modal-close-btn"
          >
            {closeButtonName}
          </Button>
          <Button
            type="button"
            onClick={() => window.location.href = saveButton.redirects}
            data-cy="modal-save-btn"
          >
            {saveButton.name}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalComponent;
