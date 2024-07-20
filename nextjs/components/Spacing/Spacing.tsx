import React from 'react';
import './Spacing.scss';

export const Spacing = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-1 align-self-end">
          <div className="pb-1 m-2 bg-primary shadow opacity-25"></div>
          <div className="text-center text-dark">1</div>
        </div>
        <div className="col-md-1 align-self-end">
          <div className="pb-2 m-2 bg-primary shadow opacity-25"></div>
          <div className="text-center text-dark">2</div>
        </div>
        <div className="col-md-1 align-self-end">
          <div className="pb-3 m-2 bg-primary shadow opacity-50"></div>
          <div className="text-center text-dark">3</div>
        </div>
        <div className="col-md-1 align-self-end">
          <div className="pb-4 m-2 bg-primary shadow opacity-75"></div>
          <div className="text-center text-dark">4</div>
        </div>
        <div className="col-md-1 align-self-end">
          <div className="pb-5 m-2 bg-primary shadow"></div>
          <div className="text-center text-dark">5</div>
        </div>
      </div>
    </div>
  );
};
