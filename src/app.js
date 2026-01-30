const express = require('express');
const cors = require('cors'); 
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler'); 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/product', productRoutes);


app.use(errorHandler);

module.exports = app;