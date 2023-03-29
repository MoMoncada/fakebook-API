const express = require('express');
const luxon = require('luxon');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = 3001;
const app = express();

//TODO: uncomment the following when needed
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(routes);

db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`FakeBook server running on port ${PORT}!`);
    });
  });


// TODO: test this one too
  // db.connect().then((dbInstance) => {
  //   app.listen(PORT, () => {
  //     console.log(`FakeBook server running on port ${PORT}!`);
  //   });
  // }).catch((error) => {
  //   console.error('Error connecting to database:', error);
  //   process.exit(1);
  // });