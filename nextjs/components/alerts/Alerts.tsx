import React from 'react';
import './Alerts.scss';

interface AlertProps {
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ type, children }) => {
  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {children}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
};

export default Alert;
