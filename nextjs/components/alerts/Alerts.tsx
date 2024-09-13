import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { X } from "lucide-react"

interface AlertProps {
  type: 'default' | 'destructive';
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
}

const Alerts: React.FC<AlertProps> = ({ type, title, children, onDismiss }) => {
  return (
    <Alert variant={type}>
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </Alert>
  );
};

export default Alerts;
