require('custom-env').env();
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const express = require('express');
const bodyParser = require('body-parser');
const items = require('../database-mongo');

const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  authenticator: new IamAuthenticator({
    apikey: process.env.VISUAL_RECOGNITION_APIKEY
  }),
  url: process.env.VISUAL_RECOGNITION_URL
});

const app = express();
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/stored', function (req, res) {
  items.selectAll(function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data).end();
    }
  });
});

app.post('/recognize', (req, res) => {
  // console.log(req.body.url);
  classifyParams = {
    url: req.body.url
  };
  visualRecognition
    .classify(classifyParams)
    .then((response) => {
      const classifiedImage = response.result.images[0].classifiers;
      // response.result.images[0].source_url
      console.log(classifiedImage);
      res.send(classifiedImage);
    })
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
