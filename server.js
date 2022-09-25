const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = require('./app');
//server
const port = process.env.PORT || 8000;

mongoose.connect(process.env.LOCAL_URL).then(() => {
  console.log('Database connected successfully');
});

//schema design

const productSchema = mongoose.Schema(
  {
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
      type: Number,
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
        name: {
          type: String,
          required: [true, 'Please provide a category name'],
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
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
productSchema.method.logger = function () {
  console.log(`Data saved for${this.name}`);
};

//Model creation
const Product = mongoose.model('Product', productSchema);

//Routes
app.get('/', (req, res) => {
  res.send('Route is working!');
});
//post to DB
app.post('/api/v1/product', async (req, res, next) => {
  try {
    //create
    // const result = await Product.create(req.body);
    //create => do something => save
    const product = new Product(req.body);
    const result = await product.save();
    result.logger();
    res.status(200).send({
      success: true,
      message: 'data inserted successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "data didn't insert",
      error: error.message,
    });
  }
});
app.listen(port, () => {
  console.log('app is running on port', port);
});
