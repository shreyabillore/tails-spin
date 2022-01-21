const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchemaModel = new Schema(
     {product_name: { type: String },
     product_desc:{type:String},
     product_price: { type: Number },
     image_url: { type: String },
     quantity: { type: Number },
     brand: { type: String },
     product_type: { type: String },
     username: { type: String }, 
     quantity:{type:Number,default:1},
     order_status:{type:Boolean,default:true},
     create_at: { type:Date,default:Date.now() } })

const orderSchema = mongoose.model('order', orderSchemaModel)


module.exports = orderSchema



