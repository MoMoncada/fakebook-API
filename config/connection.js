const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fakeBookDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // bufferMaxEntries: 0
})

//TODO: test this function with MongoDB
// async function connect() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');

//     const db = client.db('fakebookDB');
//     return db;
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1);
//   }
// // }
// module.exports = { connect };

module.exports = mongoose.connection;
