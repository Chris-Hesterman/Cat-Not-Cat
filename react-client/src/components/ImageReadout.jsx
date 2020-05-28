import React from 'react';

const ImageReadout = (props) => {
  return (
    <div className="image_description">
      <p className="descWords">Keywords: {props.description}</p>
    </div>
  );
};

export default ImageReadout;
