import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    let url = this.state.imageURL;
    console.log(url);
    this.props.classify(url);
    this.setState({ imageURL: '' });
  }

  onChange(e) {
    this.setState({ imageURL: e.target.value });
  }

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleClick}>
          <input
            type="url"
            value={this.state.imageURL}
            onChange={this.onChange}
            placeholder="Enter Image URL"
            required
          ></input>
          <button>Send URL</button>
        </form>
      </div>
    );
  }
}

export default Form;
