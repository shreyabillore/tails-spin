import React from 'react'
import MainLayout from '../Layouts/MainLayout'
import './PetType.css'
import cat from './Catgif.gif'
import dog from './dog.gif'
import smallpet from './smallpet.gif'
import bird from './bird.gif'
import StarIcon from '@material-ui/icons/Star'
import { useState,useEffect } from 'react';
import axios from 'axios'
import {  useNavigate, useParams } from 'react-router-dom';
import Spinner from './Spinner';



export default function PetType({filterTypedata}) {

    const [isLoading,setIsLoading] = useState(true)
    const userid = useParams();
    const petType = useParams();
    const [allProducts, setAllProducts] = useState([])
    const [petGif,setPetGif] = useState()
    const [getProductId, setGetProductId] = useState()


    const navigate = useNavigate()

    useEffect(async() => {

            const allProductsData = await axios.get(`/petstore/allproductdata`)
            console.log('allProductsData',allProductsData)
            setAllProducts(allProductsData.data)
            setIsLoading(!isLoading)
        },[]) 

    const handleAddProduct = async(e,idx) =>{
        e.preventDefault();
        console.log('index is ',idx)
        let cookiedata=  document.cookie
        .split('; ')
        .find(row => row.startsWith('userid='))
        .split('=')[1];

        const newPetTypeData = [...allProducts]
        const id = newPetTypeData[idx]._id
        console.log(id)
    //    let id =  setGetProductId(e.target.getAttribute('prodid'))
        const cartResponse = await axios.get(`/petstore/products?_id=${id}&cookiedata=${cookiedata}`)
        console.log('cartResponse is :', cartResponse)   
      
    }

        return (
            <div>
                <MainLayout>
                            <div className='productCards' >
                                { isLoading? <Spinner/> : allProducts?.map((allProduct, idx) => (<div key={idx+3} className='product'>
                                    <img src={allProduct.image_url} alt={allProduct.brand}></img>
                                    <h4>{allProduct.product_name}</h4>
                                    <h4>{allProduct.product_price}€</h4>
                                    <span>{String(allProduct.rating).split("").map((rating, idx) => <StarIcon key={idx+2} style={{ color: 'orange' }} />)} </span>
                                    <br />
                                    <button prodid={allProduct._id} onClick={(e) => handleAddProduct(e,idx)} ><b>ADD TO BAG</b></button>
                                    
                                </div>))
                                }
                            </div>
                </MainLayout>
            </div>
        )
    }
