import React from 'react';
import './SearchBox.scss';

export const SearchBox: React.FC = () => {
  return (
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  );
};
