const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

//middlewires
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Route is working!');
});
module.exports = app;
