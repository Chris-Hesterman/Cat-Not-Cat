import React from 'react';

const Contestant = (props) => {
  // props.setColor();
  return (
    <div className="image-container">
      <img src={props.image} id="main-image" height="40%" width="40%" />
    </div>
  );
};

export default Contestant;
