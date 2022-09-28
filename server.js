const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = require('./app');
//server
const port = process.env.PORT || 8000;

//imports modules
const productRoutes = require('./routes/product.route');

mongoose.connect(process.env.LOCAL_URL).then(() => {
  console.log('Database connected successfully');
});

//schema design

//Routes
app.get('/', (req, res) => {
  res.send('Route is working!');
});

//routes

app.use('/api/v1/product', productRoutes);

app.listen(port, () => {
  console.log('app is running on port', port);
});
