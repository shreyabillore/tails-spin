import React from 'react'
import './CardsLayout.css'
import StarIcon from '@material-ui/icons/Star'
import { useState,useEffect,useContext } from 'react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { ContextMain } from '../Context/ContextMain';



export default function Cardslayout({pet_type}) {

    const { productToBuy, setProductToBuy} = useContext(ContextMain);

    // state to hold the product object from the server

    const brandname = useParams()
    const [product, setProduct] = useState();
    const [id, setId] = useState();
    const navigate = useNavigate();

  
    //calling datat from server using axios

    // useEffect(async() =>{

    //     console.log('brandname param is',brandname.brandname)
    //     // setBrandData(brandname.brandname)
     
    //     console.log('brandname',brandname.brandname)
    //     if(brandname.brandname)
    //     { const responsebrand = await axios.get(`/find/${brandname.brandname}`)
    //         console.log(responsebrand)
    //       setProduct(responsebrand.data)}

    // //     if(pet_type==='dog'){
    // //          const response = await axios.get('/petstore/products/dog')
    // //         console.log(response)
    // //       setProduct(response.data)}
        
    // //       else if(pet_type==='cat'){
    // //         const response = await axios.get('/petstore/products/cat')
    // //         console.log(response)
    // //       setProduct(response.data)
    // //       }
    // //       else if(pet_type==='small pet'){
    // //         const response = await axios.get('/petstore/products/small-pet')
    // //         console.log(response)
    // //       setProduct(response.data)
    // //       }
    // //       else if(pet_type==='bird'){
    // //         const response = await axios.get('/petstore/products/bird')
    // //         console.log(response)
    // //       setProduct(response.data)
    // //       }
    // //     console.log('response of state product:', product)
    // // },[brandname,pet_type]) 


    const handleProductAdd = (e) =>{
        e.preventDefault();
        // geting the attribute from button click
     
        console.log('id', e.target.getAttribute('prodid'))
        let prod_id = e.target.getAttribute('prodid')
        setId( e.target.getAttribute('prodid'))

        
        // post the recevied object i.e prodid to /users/product/cart on server

        console.log('handle add cart data here')
        
        // console.log('id is in cardlayout',id)
        // const cartResponse = await axios.get(`/petstore/products?_id=${id}`)
        // console.log('cartResponse is :', cartResponse)

        // const id = e.target.getAttribute('prodid');    
        // console.log('prod id:',productToBuy)
        // const id = productToBuy;
        navigate(`/pet/${pet_type}/${prod_id}/cart`) 
       

    }



    return (
        <div>
          
                <div className='parentContainer'>
                    <div className='filterSortBar'>
                        <div className='filterBar'>
                            <h2>Filter By</h2>
                            <h3>Pet type</h3>
                            <div>
                            <input type="checkbox" id="cat" name="cat" value="cat" />
                            <label > Cat</label>
                            </div>
                            <div>
                            <input type="checkbox" id="dog" name="dog" value="dog" />
                            <label > Dog</label>
                            </div>
                            <div>
                            <input type="checkbox" id="smallpet" name="smallpet" value="smallpet" />
                            <label > Small pet</label>
                            </div>
                            <div>
                            <input type="checkbox" id="fish" name="fish" value="fish" />
                            <label > Bird</label>
                            </div>
                            <div className='brand'>
                            <h3>Brand</h3>
                            <div>
                            <input type="checkbox" id="cat" name="cat" value="cat" />
                            <label > Royal Canin</label>
                            </div>
                            <div>
                            <input type="checkbox" id="dog" name="dog" value="dog" />
                            <label > Zara</label>
                            </div>
                            <div>
                            <input type="checkbox" id="smallpet" name="smallpet" value="smallpet" />
                            <label > Pedigree</label>
                            </div>
                            <div>
                            <input type="checkbox" id="fish" name="fish" value="fish" />
                            <label > Camelling</label>
                            </div>
                            </div>
                        </div>
                        <div className='sortBar'>
                            <h3>Sort by</h3>
                            <button className='highLow'><b>Price:</b> High to low</button>
                            <button className='lowHigh'><b>Price:</b> Low to high</button> 
                        </div>
                    </div>
                    <div className='productCards' >
                        { !brandname.brandname  ? product?.map((product,idx) =>(<div key={idx} className='product'>
                            <img src={product.image_url} alt={product.brand}></img>
                            <h4>{product.product_name}</h4>
                            <h4>{product.product_price}€</h4>
                            <h4>{product.rating}</h4>
                            <span>{String(product.rating).split("").map((rating,idx) => <StarIcon key={idx} style={{color:'orange'}} /> )} </span>
                            <br />
                            <button prodid={product._id} onClick={(e) => handleProductAdd(e)}><b>ADD TO BAG</b></button>
                        </div>)) : product?.map((product,idx) =>(<div key={idx} className='product'>
                            <img src={product.image_url} alt={product.brand}></img>
                            <h4>{product.product_name}</h4>
                            <h4>{product.product_price}€</h4>
                            <h4>{product.rating}</h4>
                            <span>{String(product.rating).split("").map((rating,idx) => <StarIcon key={idx} style={{color:'orange'}} /> )} </span>
                            <br />
                            <button prodid={product._id}  onClick={(e) => handleProductAdd(e)}><b>ADD TO BAG brand</b></button>
                        </div>))
                        }
                    </div>

                </div>

         
        </div>
    )
}   

