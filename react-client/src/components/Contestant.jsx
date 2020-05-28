import React from 'react';

const Contestant = (props) => {
  return (
    <div className="image-container">
      <img src={props.image} />
    </div>
  );
};

export default Contestant;
