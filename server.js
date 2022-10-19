const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');
//server
const port = process.env.PORT || 8000;

//imports modules
const productRoutes = require('./routes/v1/product.route');
const brandRoutes = require('./routes/v1/brand.route');
const categoryRoutes = require('./routes/v1/category.route');
const storeRoutes = require('./routes/v1/store.route');

mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log('Database connection is successful');
});

//schema design

//Routes
app.get('/', (req, res) => {
  res.send('Route is working!');
});

//routes

app.use('/api/v1/product', productRoutes);
app.use('/api/v1/brand', brandRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/store', storeRoutes);

app.listen(port, () => {
  console.log('app is running on port', port);
});
