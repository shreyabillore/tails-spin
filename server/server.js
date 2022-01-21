const express = require('express')
require('dotenv').config()
const app = express()
const cors = require("cors");
app.use(cors())
const connectDB = require('./config/db');
connectDB()


/**
 * DEFINE ROUTES
 */
 app.use( require('./api/products'))
app.use('/users', require('./api/users'));
app.use('/users', require('./api/cart'))
app.use('/users', require('./api/order'))
app.use(require('./api/payment'))



// listen to some port

let port = process.env.PORT ||8000;
app.listen(port, () => console.log('server is up and running' + port))

