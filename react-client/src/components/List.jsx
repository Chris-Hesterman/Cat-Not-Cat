import React from 'react';
import ListItem from './ListItem.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(+e.target.textContent[0]);
    this.props.swapImage(+e.target.textContent[0] - 1);
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
        <h4>Cats and Not Cats</h4>
        <h5>{this.props.pastImages.length} most recent images:</h5>
        <ul onClick={this.handleClick}>{images}</ul>
      </div>
    );
  }
}

export default List;
