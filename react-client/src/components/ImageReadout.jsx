import React from 'react';

const ImageReadout = (props) => {
  return (
    <div className="image_description">
      <p className="descWords">
        <em>KEYWORDS:</em>
        <br></br>
        {props.description}
      </p>
    </div>
  );
};

export default ImageReadout;
