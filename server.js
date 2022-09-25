const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = require('./app');

mongoose.connect(process.env.DATABAE_URL).then(() => {
  console.log('Database connected successfully');
});

//server
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('app is running on port', port);
});
