import React from 'react';
import './Cart.css'
import MainLayout from '../Layouts/MainLayout';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star'
import { ContextMain } from '../Context/ContextMain'
import { useContext } from 'react';
import Spinner from './Spinner';

export default function Cart(props) {

    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate()
    const { id } = useParams()
    const [cartData, setCartData] = useState(false)
    const [productToBuyinCart, setProductToBuyinCart] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [totalAmout, setTotalAmount] = useState()
    const [disableBtn, setDisableBtn] = useState(false)
    const ref = useRef();
    const {productCountData,loginId,setLogin,setProductCountData} = useContext(ContextMain)

    let cookiedata = document.cookie
        .split('; ')
        .find(row => row.startsWith('userid='))
        .split('=')[1];

        
    useEffect(async () => {

         let cartResponse = await axios.get(`/users/products/cart?cookiedata=${cookiedata}`)
        const allProductsResponse = await axios.get('/petstore/allproducts')
        console.log('cartResponse.data', cartResponse.data)
        console.log('allProductsResponse', allProductsResponse)
        setAllProducts(allProductsResponse.data)
        setProductToBuyinCart(cartResponse.data)
        setIsLoading(!isLoading)
        console.log('len', productToBuyinCart.length)
        
        let totalCartAmount = await cartResponse.data.reduce(function (prev, cur) {
            return prev + cur.product_price;
        }, 0);
        setTotalAmount(totalCartAmount)
    
    }, [])

  
    console.log('productToBuy in cart', id)

    console.log('allProducts', allProducts)



    // checkout functionality to copy the data of cart table to orders table to maintain history

    const handleCheckOut = async () => {

        navigate('/petstore/checkout')

    }

    // delete item from Client as well as server

    const handleDelete = async (e) => {

        let itemId = e.target.getAttribute('value')
        console.log('itemId :', itemId)
        const response = await axios.delete(`/users/cart/remove/item/${itemId}`)
        console.log('response is', response)
        const cartResponse = await axios.get(`/users/products/cart?cookiedata=${cookiedata}`)
        setProductToBuyinCart(cartResponse.data)
        let totalCartAmount = await cartResponse.data.reduce(function (prev, cur) {
            return prev + cur.product_price;
        }, 0);
        setTotalAmount(totalCartAmount)
        setProductCountData(cartResponse ? cartResponse.data.length : 0)
    }


    // add products to cart

    const handleAddProduct = async(e,idx) =>{
        e.preventDefault();
        console.log(e.target.getAttribute('prodName'))
        console.log(ref.current)


        const filteredData = productToBuyinCart.filter((val) => {
            return val.product_name.indexOf(val) === e.target.getAttribute('prodName');
          });

        if(filteredData)
        {
           ref.current.disabled=true
        }
        console.log('idx is',idx)
        // console.log('reference',ref.current)
        // ref.current.setAttribute('disabled',true)
        
        let cookiedata=  document.cookie
        .split('; ')
        .find(row => row.startsWith('userid='))
        .split('=')[1];
    //    let id =  setGetProductId(e.target.getAttribute('prodid'))
        const cartResponse = await axios.get(`/petstore/products?_id=${e.target.getAttribute('prodid')}&cookiedata=${cookiedata}`)
        console.log('cartResponse is :', cartResponse)   
        const cartResponseUpdated = await axios.get(`/users/products/cart?cookiedata=${cookiedata}`)
        setProductToBuyinCart(cartResponseUpdated.data)
        setProductCountData(cartResponseUpdated ? cartResponseUpdated.data.length : 0)
        let totalCartAmount = await cartResponse.data.reduce(function (prev, cur) {
            return prev + cur.product_price;
        }, 0);
        setTotalAmount(totalCartAmount)
        
    }

    //handle increase

    const handleQuantityIncrease = (idx) => {

        console.log('hi i am index', idx)

        const newItems = [...productToBuyinCart];
    
        newItems[idx].quantity++;
    
        setProductToBuyinCart(newItems);
        calculateTotal()

        
    };


    //handle decrese

    const handleQuantityDecrease = (idx) => {
        console.log('hi i am index', idx)
        const newItems = [...productToBuyinCart];
    
        newItems[idx].quantity--;
    
        setProductToBuyinCart(newItems);
        calculateTotal()
        
    };


    //Total sum of item 

    const calculateTotal = () => {
        const totalItemCount = productToBuyinCart.reduce((total, item) => {
            return total + item.product_price*item.quantity;
        }, 0);
    
        setTotalAmount(totalItemCount);
      
        console.log(totalAmout)
    };

    return (
        <div>
            <MainLayout>
                {productCountData? <div>
                    <div className='cart'>
                        {isLoading ? <Spinner/> : productToBuyinCart.map((productdata, idx) => (
                            <>
                                <div className='productImage' >
                                    <img src={productdata.image_url} alt={productdata.product_name} />
                                </div>
                                <div className='productDetails' id={idx}>
                                    <h1>{productdata.product_name}</h1>
                                    <h1>{productdata.product_price}€</h1>
                                    <div className='quantitiy'>
                                    <button className='quantityBtn' onClick={()=> handleQuantityDecrease(idx)} >-</button>
                                    <span>{productdata.quantity}</span>
                                    <button  className='quantityBtn' onClick={()=> handleQuantityIncrease(idx)} >+</button>
                                    </div>
                                    <button  value={productdata._id} onClick={(e) => handleDelete(e)}>Delete</button>
                                </div> 
                            </>))}
                    </div>
                    <h3>Total Sum :{totalAmout? totalAmout : 0}Euro</h3>
                    <button className='proceedToBuy' onClick={handleCheckOut}>Checkout</button>
                </div> : <div className='noDisplay' style={{ padding: '10% 0%', display: 'flex' }}><img src="https://www.pngkey.com/png/full/838-8385145_order-now-icon-png.png" /></div>}
                <hr />
                <h1 className='ratedItem'>Top rated Items</h1>
                <div className='topRatedItems'>
                    {allProducts?.map((allProduct, idx) => (
                        <div className='product' key={idx + 5}>
                            <img src={allProduct.image_url} alt='pediggrie' />
                            <h4>{allProduct.product_name}</h4>
                            <h4>{allProduct.product_price}€</h4>
                            <span>{String(allProduct.rating).split("").map((rating, idx) => <StarIcon key={idx + 2} style={{ color: 'orange' }} />)} </span>
                            <br />
                            <button ref={ref} prodName={allProduct.product_name}  prodid={allProduct._id} onClick={(e) =>  handleAddProduct(e,idx)}>ADD TO BAG</button>
                        </div>))}
                </div>

            </MainLayout>
        </div>
    )
}
