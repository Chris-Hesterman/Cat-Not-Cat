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
      urls: [],
      currentImage:
        'https://cdn.pixabay.com/photo/2017/11/14/13/06/kitty-2948404_960_720.jpg'
    };
    this.classify = this.classify.bind(this);
    this.getClassified = this.getClassified.bind(this);
  }

  classify(url) {
    let data = { url: url };
    $.ajax({
      url: 'http://127.0.0.1:3000/recognize',
      method: 'POST',
      dataType: 'json',
      data: data
    })
      .done((response) => {
        console.log('posted');
        console.log(response[0].classes);
      })
      .fail((err) => {
        console.log(err);
      })
      .always(() => {
        this.getClassified();
      });
  }

  getClassified() {
    fetch('http://127.0.0.1:3000/stored')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('fetched');
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // $.ajax({
    //   url: 'http://127.0.0.1:3000/stored',
    //   method: 'GET'
    // })
    //   .done((response) => {
    //     console.log(response);
    //     if (response)
    //       this.setState({
    //         currentImage:
    //           'https://cdn.pixabay.com/photo/2017/11/14/13/06/kitty-2948404_960_720.jpg'
    //       });
    //     // this.setState({ urls: response.body.urls });
    //   })
    //   .fail((err) => {
    //     console.log(err);
    //   });
  }

  componentDidMount() {
    this.getClassified();
  }

  render() {
    return (
      <div className="content">
        <div className="img_text">
          <h1>Is it a Cat?</h1>
          <Contestant image={this.state.currentImage} />
          <Form classify={this.classify} />
        </div>
        <div className="list">
          <List urls={this.state.urls} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
