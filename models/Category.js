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
    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: 'Please provide valid image urls',
        },
      },
    ],
  },
  { timestamps: true }
);
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
