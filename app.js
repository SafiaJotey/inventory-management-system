const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

//middlewires
app.use(express.json());
app.use(cors());

module.exports = app;
