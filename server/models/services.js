const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const servicesSchemaModel = new Schema(
     {username: { type: String },
     lastname:{type:String},
     email: { type: String },
     Date: { type: String },
  })

const ServiceSchema = mongoose.model('Service', servicesSchemaModel)


module.exports = ServiceSchema



