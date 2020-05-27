import React from 'react';
import ListItem from './ListItem.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.swapImage(+e.target.textContent);
  }

  render() {
    let images = this.props.pastImages.map((image, index) => (
      <ListItem recent={index} key={image._id} onClick={this.handleClick} />
    ));
    return (
      <div>
        <h4> Classified Images </h4>
        There are {this.props.pastImages.length} classified images.
        <ul onClick={this.handleClick}>{images}</ul>
      </div>
    );
  }
}

export default List;
