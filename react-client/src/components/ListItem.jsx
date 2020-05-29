import React from 'react';

const ListItem = (props) => (
  <li>
    {props.recent + 1} - {props.isCat ? 'IS CAT' : 'NOT CAT'}
  </li>
);

export default ListItem;
