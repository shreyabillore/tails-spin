const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();

// MIDDLEWARES
const bodyParser = require('body-parser');

router.use(bodyParser.json()) // to parse json
router.use(bodyParser.urlencoded({extended:true}))

//Model import

const Product = require('../models/Product')
const Cart = require('../models/cart')
const Service = require('../models/services')
const Order = require('../models/order')



// get the Product data from api at route MIDDLEWARE1 http://localhost:5000/petstore/products

const productFetch = async(req,res) => {
    console.log('Product data get block:')

    try{
        console.log('find route: req.query', req.query)
        let data = await Product.find({_id:req.query._id},{_id:0})
        console.log('cart data is', data[0])

        //updating the cart collection 
        let cartNew = new Cart({product_name: data[0].product_name,
           product_desc: data[0].product_desc,
        product_price: data[0].product_price,
        image_url: data[0].image_url,        
        rating: data[0].rating,
        brand: data[0].brand,
        product_type: data[0].product_type,
        username:req.query.cookiedata})
        let cartData = await cartNew.save()
        console.log('added cart value is',cartData)

        // Updating the order table to capture history

          //updating the order collection 
        // let orderNew = new Order({product_name: data[0].product_name,
        // product_desc: data[0].product_desc,
        //  product_price: data[0].product_price,
        //  image_url: data[0].image_url,        
        //  rating: data[0].rating,
        //  brand: data[0].brand,
        //  product_type: data[0].product_type,
        //  username:req.query.cookiedata})
        //  let orderData = await orderNew.save()
        //  console.log('added cart value is',orderData)
        
         res.send(data)
    }   
    catch(error){
        console.log('Error is :',error.message) 
    }

}

// filter dog data

const dogDataFetch = async(req,res) => {
    console.log('Product data get block:')

    try{
        const data = await Product.find({pet_type:'dog'})
    
        console.log('Product data is', data)
        res.send(data)
    }
    catch(error){
        console.log('Error is :',error.message)
    }

}


const catDataFetch = async(req,res) => {
    console.log('Product data get block:')

    try{
        const data = await Product.find({pet_type:'cat'})
    
        console.log('Product data is', data)
        res.send(data)
    }
    catch(error){
        console.log('Error is :',error.message)
    }

}


const birdDataFetch = async(req,res) => {
    console.log('Product data get block:')

    try{
        const data = await Product.find({pet_type:'bird'})
    
        console.log('Product data is', data)
        res.send(data)
    }
    catch(error){
        console.log('Error is :',error.message)
    }

}


const smallpetDataFetch = async(req,res) => {
    console.log('Product data get block:')

    try{
        const data = await Product.find({pet_type:'small pet'})
    
        console.log('Product data is', data)
        res.send(data)
    }
    catch(error){
        console.log('Error is :',error.message)
    }

}

// get distinct values of brands

const brandFetch = async(req,res) => {
    console.log('Product data get block:')

    try{
        const data = await Product.distinct("brand")
    
        console.log('Product data is', data)
        res.send(data)
    }
    catch(error){
        console.log('Error is :',error.message)
    }

}

//

router.get('/find/:brandname', async (req, res) => {

    console.log('find route: req.params', req.params)

    const searchRegex = new RegExp(req.params.brandname)

    console.log('Find route: regex=', searchRegex)

    const sort = {}

    // req.query.sort = true
    // if (req.query.sort) sort.username = -1

    const data = await Product.find({brand: searchRegex})
    console.log('brand data is',data)
    // const data = await Customers.find({name: 'Elizabeth Ray'})

    res.send(data)
} )

// all the unique value of pet-type

const petTypeFetch = async(req,res) => {
    console.log('Pet Type data get block:')

    try{
        const data = await Product.distinct("pet_type")
    
        console.log('Product data is', data)
        res.send(data)
    }
    catch(error){
        console.log('Error is :',error.message)
    }

}

//to find the data for a specific pet type

router.get('/find/pettype/:petType', async (req, res) => {

    console.log('find route: req.params', req.params)

    const searchRegex = new RegExp(req.params.petType)

    console.log('Find route: regex=', searchRegex)

    const data = await Product.find({pet_type: searchRegex})
    console.log('petType data is',data)
    res.send(data)
} )


router.get('/find/pettype/:petType/:sortaction', async (req, res) => {


   if(req.params.sortaction ==='lowHigh')
   { const data = await Product
    .find({pet_type:req.params.petType})
    .sort({product_price: -1})
    res.send(data)
}
    else if(req.params.sortaction ==='highLow'){
         const data = await Product
        .find({pet_type:req.params.petType})
        .sort({product_price: 1})
        res.send(data)
    }


    // const data = await Customers.find({name: 'Elizabeth Ray'})
  
} )

const allProductFetch =  async(req,res) => {
    console.log('All pet store products')

    try{
        const data = await Product.find({}).sort({rating:-1}).limit(5)
    
        console.log('Product data is', data)
        res.send(data)
    }
    catch(error){
        console.log('Error is :',error.message)
    }

}


// auto reply for service form 


const smtpTransport = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port:587,
    auth: {
      user: 'shreyabillore.matrimony@gmail.com',
      pass: 'Tg875MSUc3OFjKfV'
    }
  });
  
  const sendAutoResponse =  async(req,res) => {

  try{  console.log('Find Complex route: query is', req.body)

    const servicedata = new Service(req.body); //create model. That's AN INSTANCE OF THE USER OBJECT
    
        console.log('register route: User is', servicedata)
    
        const newServiceData = await servicedata.save();
    console.log('newServiceData is:', newServiceData)

    let sendResult = await smtpTransport.sendMail({
        from:'Shreya <shreyabillore.matrimony@gmail.com',
        to: req.body.email,
        subject: 'Request submitted sucessfully',
        text:'Thank you ',
        html:`<body><p>Hello ${req.body.username}<p> Thank you for your query!! we will get back to you on ${req.body.date}<p/></p><br/><p>Kind Regards <br/>Tails-Spin Team</p></body>`
    })
        console.log(sendResult)
         res.send("hello from Copmlex find")}

         catch(error){
            console.log('Error is :',error.message)
        }
  }

  const allProductDataFetch = async(req,res) =>{
    try{ 

  const data = await Product.find({})
        console.log('helllow  from product data block')
        res.send(data)

    }
    catch(error){
            console.log('Error is :',error.message)
        }

  }


  // search a product

  try {

    router.get('/petstore/search', async (req, res) => {
        console.log('Find route: query is', req.query.term)
    
        const searchRegex = new RegExp(req.query.term);
    
        const data = await Product.find({product_name: searchRegex})
        // const data = await Customers.find({name: {$regex: /term/}}).limit(2)
    
        console.log('find route: data are:', data)
        res.send(data)
    
        // res.send('Hello from find route')
    })
}
catch (err) {
    console.log('error order', err.message)
}


router.get('/petstore/products', productFetch)
router.get('/petstore/products/dog', dogDataFetch)
router.get('/petstore/products/cat', catDataFetch)
router.get('/petstore/products/bird', birdDataFetch)
router.get('/petstore/products/small-pet', smallpetDataFetch)
router.get('/petstore/products/brands', brandFetch)
router.get('/petstore/products/pet-type', petTypeFetch)
router.get('/petstore/allproducts', allProductFetch)
router.post('/petstore/services', sendAutoResponse)
router.get('/petstore/allproductdata', allProductDataFetch)


module.exports = router
