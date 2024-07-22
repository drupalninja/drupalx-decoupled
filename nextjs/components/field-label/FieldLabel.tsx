import React from 'react';
import './FieldLabel.scss';

export interface FieldLabelProps {
  label: string;
  isInvalid?: boolean;
  value?: string;
}

const FieldLabel: React.FC<FieldLabelProps> = ({ label, isInvalid, value }) => {
  return (
    <div className="form-floating">
      <input
        type="email"
        className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
        id="floatingInputInvalid"
        placeholder="name@example.com"
        value={value || ''}
      />
      <label htmlFor="floatingInputInvalid">{label}</label>
    </div>
  );
};

export default FieldLabel;
