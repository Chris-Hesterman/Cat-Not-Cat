require('dotenv').config();
const path = require('path');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database-mongo/index.js');

const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  authenticator: new IamAuthenticator({
    apikey: process.env.VISUAL_RECOGNITION_APIKEY
  }),
  url: process.env.VISUAL_RECOGNITION_URL
});

app.use(express.static(path.join(__dirname, '../react-client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/stored', (req, res) => {
  db.getClassifiedImgURLs()
    .then((data) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/recognize', (req, res) => {
  console.log(req.body.url);
  classifyParams = {
    url: req.body.url
  };

  const catOrNot = (imageInfo) => {
    for (let item of imageInfo) {
      let descriptions = item.class.split(' ');

      if (descriptions.includes('cat') || descriptions.includes('feline')) {
        return true;
      }
    }
    return false;
  };

  visualRecognition
    .classify(classifyParams)
    .then((response) => {
      const classifiedImage = response.result.images[0].classifiers[0].classes;
      let descriptionTerms = [];
      console.log('ImageData: ', classifiedImage);
      for (let i = 0; i < 4; i++) {
        descriptionTerms.push(classifiedImage[i].class);
      }

      let document = {
        url: req.body.url,
        isCat: catOrNot(classifiedImage),
        description: descriptionTerms,
        date: new Date()
      };
      db.addImageURL(document);
      res.set('Access-Control-Allow-Origin', '*');
      res.send(document);
    })
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, function () {
  console.log('listening on port 3000');
});
