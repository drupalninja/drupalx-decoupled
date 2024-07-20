import * as React from 'react';
import { useState } from 'react';
import './ColorToggle.scss';

const ColorToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleColorMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.setAttribute('data-bs-theme', newMode ? 'dark' : 'light');
    const switchIconElement = document.querySelector(
      '.darkmode-switch .material-symbols-outlined'
    );
    if (switchIconElement) {
      switchIconElement.textContent = newMode ? 'dark_mode' : 'light_mode';
    }
  };

  return (
    <div className="form-check form-switch darkmode-switch d-flex align-items-center">
      <input
        className="form-check-input"
        type="checkbox"
        id="darkModeSwitch"
        checked={isDarkMode}
        onChange={toggleColorMode}
      />
      <label className="form-check-label d-flex align-items-center ms-1" htmlFor="darkModeSwitch">
        Toggle theme
        <span className="material-symbols-outlined ms-1">{isDarkMode ? 'dark_mode' : 'light_mode'}</span>
      </label>
    </div>
  );
};

export default ColorToggle;
