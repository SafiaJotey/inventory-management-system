const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = require('./app');

mongoose.connect(process.env.DATABAE_URL).then(() => {
  console.log('Database connected successfully');
});

//schema design

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    unique: [true, 'Name must be unique'],
    minLength: [3, 'Name must be 3 charecters'],
    maxLength: [20, 'Name is too large'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, "price can't be negative"],
  },
  unit: {
    type: String,
    required: [true, 'Please provide an unit'],
    enum: {
      values: ['kg', 'ltr', 'pcs'],
      message: 'Unit cant be {VALUE}, must be kg/ltr/pcs',
    },
  },
  quantity: {
    type: String,
    required: [true, 'Please provide quantity'],
    validate: {
      validator: (value) => {
        const isInteger = Number.isInteger(value);
        if (isInteger) {
          return true;
        } else {
          return false;
        }
      },
    },
    message: 'Quantity must be an integer ',
  },
  status: {
    type: String,
    enum: {
      values: ['out-of-stock', 'in-stock', 'discontinued'],
      message:
        "Values can't be {VALUE} , it must be out-of-stock/in-stock/discontinued",
    },
  },
  //refer other model
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Suppliers',
  },
  categories: [
    {
      name: String,
      required: true,
    },
    (_id: mongoose.Schema.Types.ObjectId),
  ],

  timestamps: true,
});
//server
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('app is running on port', port);
});
