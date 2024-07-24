import React from 'react';
import './Radio.scss';

interface RadioProps {
  name: string;
  id: string;
  label: string;
  checked?: boolean;
}

const Radio: React.FC<RadioProps> = ({ name, id, label, checked = false }) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name={name}
        id={id}
        defaultChecked={checked}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Radio;
