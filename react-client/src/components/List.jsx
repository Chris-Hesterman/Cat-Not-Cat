import React from 'react';
import ListItem from './ListItem.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(+e.target.textContent[0]);
    this.props.swapImage(+e.target.textContent[0]);
  }

  render() {
    let images = this.props.pastImages.map((image, index) => (
      <ListItem
        recent={index}
        isCat={image.isCat}
        key={image._id}
        onClick={this.handleClick}
      />
    ));
    return (
      <div>
        <h4> Classified Images </h4>
        Here are the {this.props.pastImages.length} most recently classified
        images.
        <ul onClick={this.handleClick}>{images}</ul>
      </div>
    );
  }
}

export default List;
