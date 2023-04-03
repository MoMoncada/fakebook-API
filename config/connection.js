const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fakeBookDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // bufferMaxEntries: 0
})


module.exports = mongoose.connection;
