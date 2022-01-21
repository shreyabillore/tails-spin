const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchemaModel = new Schema(
     {product_name: { type: String },
     product_desc:{type:String},
     product_price: { type: Number },
     image_url: { type: String },
     rating: { type: Number },
     pet_type: { type: String },
     brand: { type: String },
     product_type: { type: String } })

const ProductSchema = mongoose.model('Product', ProductSchemaModel)


module.exports = ProductSchema



