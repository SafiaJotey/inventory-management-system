const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.types;
const validator = require('validator');
const StockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: 'Product',
    },
    name: {
      type: String,
      required: [true, 'Please provide a name for this product'],
      trim: true,
      lowercase: true,
      minLength: [3, 'Name must be at least 3 characters'],
      maxLenght: [100, 'Name is too large'],
    },
    description: {
      type: String,
      required: [true, 'please add a description'],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ['kg', 'litre', 'pcs', 'bag'],
        message: "unit value can't be {VALUE}, must be kg/ltr/pcs/bag",
      },
    },
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
    price: {
      type: Number,
      required: [true, 'product price needed'],
      min: [0, 'Product price cannot be negative'],
    },
    quantity: {
      type: Number,
      required: [true, 'product quantity needed'],
      min: [0, 'Product quantity cannot be negative'],
    },
    category: {
      type: String,
      required: true,
    },
    brands: {
      name: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      required: true,

      enum: {
        values: ['in-stock', 'out-of-stock', 'discontinued'],
        message: '{VALUE} must be in-stock/out-of-stock/discontinued',
      },
    },
    store: {
      name: {
        type: String,
        trim: true,
        required: [true, 'please provide a store name'],
        lowercase: true,
        enum: {
          values: ['Dhaka', 'chattogram', 'Rajshahi'],
          message: '{VALUE} is not valid name',
        },
      },
      id: {
        type: ObjectId,
        required: true,
        ref: 'Store',
      },
    },
    suppliedBy: {
      name: {
        type: String,
        trim: true,
        required: [true, 'please provide a store name'],
      },
      id: {
        type: ObjectId,

        ref: 'Supplier',
      },
    },
  },
  { timestamps: true }
);
