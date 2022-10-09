const mongoose = require('mongoose');
const validator = require('validator');
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide a category name'],
      unique: true,
      lowercase: true,
    },
    description: String,
    imageUrl: {
      type: String,
      validate: [validator.isURL, 'please provide a valid url'],
    },
  },
  { timestamps: true }
);
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
