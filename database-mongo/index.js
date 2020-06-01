var mongoose = require('mongoose');
var connection = mongoose.connect(process.env.MONGO_URI + '/cats', {
  useNewUrlParser: true
});

connection
  .then((db) => {
    console.log('mongoose connected successfully');

    let imageSchema = mongoose.Schema({
      url: String,
      isCat: Boolean,
      description: Array,
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
    };

    let getClassifiedImgURLs = () => {
      return Images.find().sort({ date: -1 }).limit(10);
    };

    module.exports.getClassifiedImgURLs = getClassifiedImgURLs;
    module.exports.addImageURL = addImageURL;
  })
  .catch((err) => {
    throw err;
  });
