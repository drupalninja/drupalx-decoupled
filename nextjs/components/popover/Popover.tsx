import React, { useState, useRef } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface PopoverProps {
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'click' | 'hover';
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  buttonText?: string;
  buttonAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const CustomPopover: React.FC<PopoverProps> = ({
  title,
  content,
  placement = 'bottom',
  trigger = 'click',
  buttonVariant = 'destructive',
  buttonText = 'Click to toggle popover',
  buttonAttributes,
}) => {
  const [open, setOpen] = useState(false);
  const targetRef = useRef<HTMLButtonElement>(null);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      console.log('Button position:', rect);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          ref={targetRef}
          variant={buttonVariant}
          {...buttonAttributes}
          onClick={(e) => {
            buttonAttributes?.onClick?.(e);
            if (trigger === 'click') {
              setOpen(!open);
            }
          }}
          onMouseEnter={() => {
            if (trigger === 'hover') {
              setOpen(true);
            }
          }}
          onMouseLeave={() => {
            if (trigger === 'hover') {
              setOpen(false);
            }
          }}
        >
          {buttonText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" side={placement}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{title}</h4>
            <p className="text-sm text-muted-foreground">{content}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopover;
