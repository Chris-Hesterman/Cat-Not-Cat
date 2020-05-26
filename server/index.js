require('custom-env').env();
const VisualRecognitionV3 = require('obm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const express = require('express');
const bodyParser = require('body-parser');
const items = require('../database-mongo');

const VisualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  authenticator: new IamAuthenticator({
    apikey: process.env.VISUAL_RECOGNITION_APIKEY
  }),
  url: process.env.VISUAL_RECOGNITION_URL
});
const app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/items', function (req, res) {
  items.selectAll(function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
