import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';
import Form from './components/Form.jsx';
import Contestant from './components/Contestant.jsx';
import ImageReadout from './components/ImageReadout.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentClassified: [],
      currentImageData: {
        url:
          'https://cdn.pixabay.com/photo/2017/11/14/13/06/kitty-2948404_960_720.jpg',
        isCat: true,
        description: ['cat', 'feline', 'carnivore', 'mammal'],
        date: '2020-05-27T23:39:51.649Z',
        _id: '5ecefa47f7ed8f2495ced171'
      }
    };
    this.classify = this.classify.bind(this);
    this.swapImage = this.swapImage.bind(this);
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
        this.getClassified();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  swapImage(index) {
    console.log(index);
    this.setState((prevState) => {
      return { currentImageData: prevState.recentClassified[index] };
    });
  }

  getClassified() {
    console.log(this.readoutRef.current);
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
    let contestantInfo = this.state.currentImageData;
    let description = contestantInfo.description.join(' - ');
    let isCat = contestantInfo.isCat ? 'IS CAT!' : 'NOT A CAT!!';
    // if (isCat) {
    //   readout.classList.remove('not_cat');
    //   readout.classList.add('is_cat');
    // } else {
    //   readout.classList.remove('is_cat');
    //   readout.classList.add('not_cat');
    // }

    return (
      <div className="content">
        <div className="img_text">
          <h1>Is it a Cat?</h1>
          <Contestant image={this.state.currentImageData.url} />
          <ImageReadout description={description + ' - ' + isCat} />
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
