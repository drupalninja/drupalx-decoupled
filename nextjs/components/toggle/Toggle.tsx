import React, { useState } from 'react';
import './Toggle.scss';

interface ToggleProps {
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({
  defaultChecked = false,
  disabled = false,
  label,
  onChange,
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      {label && (
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          {label}
        </label>
      )}
    </div>
  );
};

export default Toggle;
