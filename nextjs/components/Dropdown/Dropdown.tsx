import React from 'react';
import './Dropdown.scss';

interface DropdownProps {
  options: { value: string; label: string }[];
  selectedValue?: string;
  onChange?: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, selectedValue, onChange }) => {
  return (
    <select className="form-select" aria-label="Default select example">
      <option selected={!selectedValue}>Open this select menu</option>
      {options.map((option) => (
        <option key={option.value} value={option.value} selected={option.value === selectedValue}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
