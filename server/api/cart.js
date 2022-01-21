const express = require('express');

const router = express.Router();

// MIDDLEWARES
const bodyParser = require('body-parser');

router.use(bodyParser.json()) // to parse json
router.use(bodyParser.urlencoded({extended:true}))

//Model import

const Cart = require('../models/cart')


// get the Product data from api at route MIDDLEWARE1 http://localhost:5000/petstore/products

const cartProductPost = async(req,res) => {
    console.log('Product data get block:')

    try{
        console.log('find route: req.query', req.query)
        const data = await Cart.find({_id:req.query._id})
        console.log('Product data is', data)
        res.send(data)
    }
    catch(error){
        console.log('Error is :',error.message)
    }

}

// ROUTES
router.get('/products/cart/', async (req, res) => {

    try{
        
        console.log('find cart products')
        const data = await Cart.find({username:req.query.cookiedata})
        res.send(data)
 }

    catch(error){
        console.log('Error is :',error.message)
    }
    
    // res.send(cart)
})

router.delete('/cart/remove/item/:itemId', async (req, res) => {

    console.log('update route: query', req.params.itemId)

    const deletedItem = await Cart.findByIdAndDelete(req.params.itemId)
    console.log('Deleted item is', deletedItem)

    if (deletedItem) res.send('Hello from delete route');
    else res.send('item Not found')
    

} )	

router.delete('/cart/items/removeall', async (req, res) => {

    console.log('delete block for cart items once checkedout')

    console.log('cookie is in cart delete',req.query.cookiedata)
    const deletedItem = await Cart.deleteMany({username:req.query.cookiedata})
    console.log('Deleted item is', deletedItem)

    if (deletedItem) res.send(' all items removed from cart');
    else res.send('item Not found')
    

} )	

router.get('/cart/sum/',  async(req, res) => {

    try{
        
        console.log('find cart products')
        const data = await  Cart.aggregate([ { $match: {username:req.query.cookiedata} }, { $group:
            { _id : null, sum : { $sum: "$product_price" } }
          }])
        
          res.send(data)
 }

    catch(error){
        console.log('Error is :',error.message)
    }
    
    // res.send(cart)
})






module.exports=router;