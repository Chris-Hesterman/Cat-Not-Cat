import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Form from './components/Form.jsx';
import Contestant from './components/Contestant.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentClassified: [],
      currentImageData: {}
    };
    this.classify = this.classify.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getClassified = this.getClassified.bind(this);
  }

  classify(url) {
    let data = { url: url };

    fetch('http://127.0.0.1:3000/recognize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ currentImageData: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  swapImage(index) {
    this.setState((prevState) => {
      return { currentImageData: prevState[index] };
    });
  }

  getClassified() {
    fetch('http://127.0.0.1:3000/stored')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('fetched');
        this.setState({ recentClassified: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getClassified();
  }

  render() {
    return (
      <div className="content">
        <div className="img_text">
          <h1>Is it a Cat?</h1>
          <Contestant
            image={
              this.state.currentImageData.url ||
              'https://cdn.pixabay.com/photo/2017/11/14/13/06/kitty-2948404_960_720.jpg'
            }
          />
          <Form classify={this.classify} />
        </div>
        <div className="list">
          <List
            pastImages={this.state.recentClassified}
            swapImage={this.swapImage}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
