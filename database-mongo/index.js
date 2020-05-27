var mongoose = require('mongoose');
var promise = mongoose.connect('mongodb://localhost/cats', {
  useMongoClient: true
});

promise
  .then((db) => {
    console.log('mongoose connected successfully');

    let imageSchema = mongoose.Schema({
      url: String,
      isCat: Boolean,
      date: {
        type: Date,
        default: Date.now
      }
    });

    let Images = mongoose.model('Image', imageSchema);

    let addImageURL = (document) => {
      Images.collection.save(document, (err, docs) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(docs, ' saved to db');
      });
    }
    let getClassifiedImgURLs = () => {
      return Images.find().sort(date: -1)limit(25)
    };
    module.exports.getClassifiedImgURLs = getClassifiedImgURLs;
    module.exports.addImgURL = addImageURL;
  })
  .catch((err) => {
    throw err;
  });
