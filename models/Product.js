const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const { validator } = require('validator');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,

      minLength: [3, 'Name must be 3 charecters'],
      maxLength: [20, 'Name is too large'],
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },

    unit: {
      type: String,
      required: [true, 'Please provide an unit'],
      enum: {
        values: ['kg', 'ltr', 'pcs', 'bag'],
        message: 'Unit cant be {VALUE}, must be kg/ltr/pcs/bag',
      },
    },

    //refer other model
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Suppliers',
    },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: [true, 'Please provide a category name'],
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
    imageUrtl: {
      type: String,
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
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: 'Brand',
        required: true,
      },
    },
    category: {
      type: String,
      required: [true, 'please provide a category'],
    },
  },

  { timestamps: true }
);

//middlewares of mongoose
productSchema.pre('save', function (next) {
  if (this.quantity === 0) {
    this.status = 'out-of-stock';
  }
  next();
});
productSchema.post('save', function (doc, next) {
  console.log('After Saving data');
  next();
});

//instance creation
productSchema.methods.logger = function () {
  console.log(`Data saved for${this.name}`);
};

//Model creation
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
