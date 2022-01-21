/**
 *Mongoose to connect to  DB
 */

// 1. import mongoose
const mongoose = require('mongoose');
require('dotenv').config();

// 2. connect to DB
const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGO_DB_URI ||'mongodb+srv://petstore:petstore@petstore.id90x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    
        console.log('MONGO DB Petstore connected....')
    } catch (err) {

        console.error(err.message)

        // If failure then exit server
        process.exit(1)
    }
}

// COMMONJS module system -> exports an object throygh the module.exports
module.exports = connectDB;