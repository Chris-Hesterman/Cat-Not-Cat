import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => {
  return (
    <div>
      <h4> Classified Images </h4>
      There are {props.pastImages.length} classified images.
      {props.pastImages.map((image, index) => (
        <ListItem recent={index} key={image._id} />
      ))}
    </div>
  );
};

export default List;
