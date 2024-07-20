import React, { useState, useRef, useEffect } from 'react';
import { OverlayTrigger, Popover as BSPopover, Button } from 'react-bootstrap';
import './Popover.scss';

interface PopoverProps {
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'click' | 'hover' | 'focus' | Array<'click' | 'hover' | 'focus'>;
  buttonVariant?: string;
  buttonText?: string;
  buttonAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const Popover: React.FC<PopoverProps> = ({
  title,
  content,
  placement = 'bottom',
  trigger = 'click',
  buttonVariant = 'danger',
  buttonText = 'Click to toggle popover',
  buttonAttributes,
}) => {
  const [show, setShow] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    if (show) {
      // Log the position of the target element
      if (targetRef.current) {
        const rect = (targetRef.current as HTMLElement).getBoundingClientRect();
      }
    }
  }, [show]);

  const popover = (
    <BSPopover id="popover-basic" style={{ zIndex: 9999 }}>
      <BSPopover.Header as="h3">{title}</BSPopover.Header>
      <BSPopover.Body>{content}</BSPopover.Body>
    </BSPopover>
  );

  return (
    <OverlayTrigger
      trigger={trigger}
      placement={placement}
      overlay={popover}
      show={show}
      onToggle={(nextShow) => {
        setShow(nextShow);
      }}
    >
      <Button
        ref={targetRef}
        variant={buttonVariant}
        {...buttonAttributes}
        onClick={(e) => {
          buttonAttributes?.onClick?.(e);
          setShow(!show);
        }}
      >
        {buttonText}
      </Button>
    </OverlayTrigger>
  );
};

export default Popover;
