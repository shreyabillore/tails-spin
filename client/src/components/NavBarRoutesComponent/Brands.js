import React, { useState,useContext,useEffect } from 'react'
import MainLayout from '../Layouts/MainLayout'
import './PetType.css'
import StarIcon from '@material-ui/icons/Star'
import axios from 'axios'
import {  useNavigate, useParams } from 'react-router-dom';
import Spinner from './Spinner'
import { ContextMain } from '../Context/ContextMain'


export default function Brands() {

    const {setProductCountData} = useContext(ContextMain)
    const [isLoading,setIsLoading] = useState(true)
    const brandname = useParams();
    const [brandTypeData, setBrandTypeData] = useState()
    const [getProductId, setGetProductId] = useState()

    const navigate = useNavigate()

    console.log('cookie is',document.cookie)
    useEffect(async () => {

        console.log('brand  param is', brandname.brandname)

        console.log('brandname', brandname.brandname)
        if (brandname.brandname) {
            const responsebrand = await axios.get(`/find/${brandname.brandname}`)
            console.log(responsebrand.data)
            setBrandTypeData(responsebrand.data)
        }},[brandname]) 


        //add product to cart
    const handleAddProduct = async(e,idx) =>{
        e.preventDefault();

        console.log('index is ',idx)
        let cookiedata=  document.cookie
        .split('; ')
        .find(row => row.startsWith('userid='))
        .split('=')[1];

        const newPetTypeData = [...brandTypeData]
        const id = newPetTypeData[idx]._id
        console.log(id)
    //    let id =  setGetProductId(e.target.getAttribute('prodid'))
        const cartResponse = await axios.get(`/petstore/products?_id=${id}&cookiedata=${cookiedata}`)
        console.log('cartResponse is :', cartResponse)   
        const cartResponseUpdated = await axios.get(`/users/products/cart?cookiedata=${cookiedata}`)
        setProductCountData(cartResponseUpdated ? cartResponseUpdated.data.length : 0)

    }

    // to handle the filter data for pet type

    const handleFilter = (e) =>{
        
        let filterType = e.target.value;

        console.log('filter type is',filterType)
        if(filterType ==='dog'){
        navigate('/typepet/dog')
        }
        else if(filterType ==='cat'){
            navigate('/typepet/cat')
            }
        else  if(filterType ==='bird'){
            navigate('/typepet/bird')
            }

        else  if(filterType ==='small-pet'){
            navigate('/typepet/small-pet')
            }

    }

    const handleFilterBrand = (e) =>{
        
        let filterType = e.target.value;

        console.log('filter type is',filterType)
        if(filterType ==='Royal Canin'){
        navigate('/brand/Royal Canin')
        }
        else if(filterType ==='Taste of the Wild'){
            navigate('/brand/Taste of the Wild')
            }
        else  if(filterType ==='Pedigree'){
            navigate('/brand/Pedigree')
            }

        else  if(filterType ==='Sheba'){
            navigate('/brand/Sheba')
            }
        else  if(filterType ==='Timothy Hay'){
                navigate('/brand/Timothy Hay')
                }
        else  if(filterType ==='Zupreem'){
                    navigate('/brand/Zupreem')
                    }
     else  if(filterType ==='Trixie'){
                        navigate('/brand/Trixie')
                        }

    }

   

    return (
        <div>
                <MainLayout>
                    <div>

                        <div className='parentContainer'>
                            <div className='filterSortBar'>
                                <div className='filterBar'>
                                    <h2>Filter By</h2>
                                    <h3>Pet type</h3>
                                    <div>
                                        <input type="radio" id="cat" name="filter" value="cat"  onClick={(e) => handleFilter(e)} />
                                        <label for='cat' > Cat</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="dog" name="filter" value="dog"  onClick={(e) => handleFilter(e)}/>
                                        <label for='dog'> Dog</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="smallpet" name="filter"  value="smallpet" onClick={(e) => handleFilter(e)} />
                                        <label for='smallpet'> Small pet</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="fish" name="filter"  value="fish" onClick={(e) => handleFilter(e)} />
                                        <label for='bird'> Bird</label>
                                    </div>
                                    <div className='brand'>
                                        <h3>Brand</h3>
                                        <div>
                                            <input type="radio" id="cat" name="brand" value="Sheba" onClick={(e) => handleFilterBrand(e)} />
                                            <label for='Sheba'> Sheba</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="dog" name="brand" value="Taste of the Wild" onClick={(e) => handleFilterBrand(e)}/>
                                            <label for='Taste of the Wild' > Taste of the Wild</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="smallpet" name="brand" value="Timothy Hay" onClick={(e) => handleFilterBrand(e)} />
                                            <label for='Timothy Hay' > Timothy Hay</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="fish" name="brand" value="Pedigree" onClick={(e) => handleFilterBrand(e)} />
                                            <label for='Pedigree' > Pedigree</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="fish" name="brand" value="Zupreem" onClick={(e) => handleFilterBrand(e)} />
                                            <label for='Zupreem' > Zupreem</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="fish" name="brand" value="Royal Canin" onClick={(e) => handleFilterBrand(e)} />
                                            <label for='Royal Canin' > Royal Canin</label>
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
                                { brandTypeData?.map((brandTypeData, idx) => (<div key={idx+4} className='product'>
                                    <img src={brandTypeData.image_url} alt={brandTypeData.brand}></img>
                                    <h4>{brandTypeData.product_name}</h4>
                                    <h4>{brandTypeData.product_price}€</h4>
                                    <h4>{brandTypeData.rating}</h4>
                                    <span>{String(brandTypeData.rating).split("").map((rating,idx) => <StarIcon key={idx+1} style={{ color: 'orange' }} />)} </span>
                                    <br />
                                    <button prodid={brandTypeData._id} onClick={(e) => handleAddProduct(e,idx)} ><b>ADD TO BAG</b></button>
                                </div>))
                                }
                            </div>

                        </div>


                    </div>
                </MainLayout>
            </div>
    )
}
