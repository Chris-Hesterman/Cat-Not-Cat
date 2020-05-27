import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> Classified Images </h4>
    There are {props.urls.length} classified images.
    {props.urls.map((url) => (
      <ListItem url={url} />
    ))}
  </div>
);

export default List;
