const express = require('express');

const router = express.Router();

// MIDDLEWARES
const bodyParser = require('body-parser');

router.use(bodyParser.json()) // to parse json
router.use(bodyParser.urlencoded({extended:true}))

//Model import

const Order = require('../models/order')
const Cart = require('../models/cart');



// get the Product data from api at route MIDDLEWARE1 http://localhost:5000/petstore/products

const orderProductGet = async(req,res) => {
    

    let data = await Cart.find({})
    console.log('cart data is', data)
    
     //updating the orders collection to have history of all the data in call
            Order.collection.insertMany(data)
    // let orderData = await allOrder.save()
    //      console.log('added order value is',orderData)
    //    res.send(data)

}

// Insert all the cart data to orders collection once checkout is pressed
router.post('/product/orders/all', async (req, res) => {

    console.log('request quesrt ', req.query.cookiedata)
   let data  = await Cart.find({username:req.query.cookiedata})
   console.log('order history to be inserted', data)
    
    Order.insertMany(data)

    res.send(data)
})


// ROUTES
router.get('/product/orders', async (req, res) => {

    console.log('request quesrt ', req.query.cookiedata)
   let data  = await Order.find({username:req.query.cookiedata})
   console.log('order history is', data)
    res.send(data)
})


router.get('/products/history/orders',orderProductGet)  

module.exports=router;