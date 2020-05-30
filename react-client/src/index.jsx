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
    this.setCatRef = this.setCatRef.bind(this);
    this.setNotCatRef = this.setNotCatRef.bind(this);
    this.colorTitle = this.colorTitle.bind(this);
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
    }, this.colorTitle);
  }

  getClassified() {
    fetch('http://127.0.0.1:3000/stored')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('fetched');
        this.setState({ recentClassified: data }, this.colorTitle);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setCatRef(element) {
    this.titleElementCat = element;
  }

  setNotCatRef(element) {
    this.titleElementNotCat = element;
  }

  colorTitle() {
    console.log('green');
    if (this.state.currentImageData.isCat) {
      this.titleElementNotCat.style.display = 'none';
      this.titleElementCat.style.display = 'block';
      this.titleElementCat.classList.add('is_cat');
    }
    if (!this.state.currentImageData.isCat) {
      this.titleElementCat.style.display = 'none';
      this.titleElementNotCat.style.display = 'block';
      this.titleElementNotCat.classList.add('not_cat');
      this.titleElementCat.classList.remove('is_cat');
    }
  }

  componentDidMount() {
    this.getClassified();
  }

  render() {
    let contestantInfo = this.state.currentImageData;
    let description = contestantInfo.description.join(' - ');
    let isCat = contestantInfo.isCat ? 'IS CAT!' : 'NOT CAT!';

    return (
      <div className="content">
        <div className="img_text">
          <h1>
            <span ref={this.setCatRef}>CAT!</span>
            <span ref={this.setNotCatRef}>NOT CAT!</span>
          </h1>

          <Contestant
            image={this.state.currentImageData.url}
            judge={this.colorTitle}
          />
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
