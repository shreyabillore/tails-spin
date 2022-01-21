import React,{useContext} from 'react'
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
import { ContextMain } from '../Context/ContextMain'




export default function PetType({filterTypedata}) {


    const [isLoading,setIsLoading] = useState(true)
    const userid = useParams();
    const petType = useParams();
    const [petTypeData, setPetTypeData] = useState()
    const [petGif,setPetGif] = useState()
    const [getProductId, setGetProductId] = useState()
    const {setProductCountData} = useContext(ContextMain)
    const navigate = useNavigate()

    useEffect(async() => {
        console.log('filterTypedata',filterTypedata)
        console.log('pet type param is', petType.petType)

        console.log('pettype', petType.petType)
        if (petType.petType || filterTypedata ) {
            const responsepettype = await axios.get(`/find/pettype/${filterTypedata ? filterTypedata : petType.petType }`)
            console.log(responsepettype)
            setPetTypeData(responsepettype.data)
            setIsLoading(!isLoading)
        }},[petType]) 

    const handleAddProduct = async(e,idx) =>{
        e.preventDefault();
        console.log('index is ',idx)
        let cookiedata=  document.cookie
        .split('; ')
        .find(row => row.startsWith('userid='))
        .split('=')[1];

        const newPetTypeData = [...petTypeData]
        const id = newPetTypeData[idx]._id
        console.log(id)
    //    let id =  setGetProductId(e.target.getAttribute('prodid'))
        const cartResponse = await axios.get(`/petstore/products?_id=${id}&cookiedata=${cookiedata}`)   
        const cartResponseAll = await axios.get(`/users/products/cart?cookiedata=${cookiedata}`)
        setProductCountData(cartResponseAll ? cartResponseAll.data.length : 0)
      
    }

    // to handle the filter data for pet type

    const handleFilter = (e) =>{
        
        let filterType = e.target.value;

        console.log('filter type is',filterType)
        if(filterType ==='dog' ){
        navigate('/typepet/dog')
        }
        else if(filterType ==='cat' ){
            navigate('/typepet/cat')
            }
        else  if(filterType ==='bird' ){
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

    }

    // sorting method 

    const handleSort = async(e) =>{
        let sortaction = e.target.getAttribute('sorton')
        console.log('sort action', sortaction)
        if(sortaction ==='highLow'){
            // /find/pettype/:petType/sort
            console.log('sort block')
            const responsepettype = await axios.get(`/find/pettype/${petType.petType}/${sortaction}`)
            setPetTypeData(responsepettype.data)
            console.log(responsepettype)
            }
        else  if(sortaction ==='lowHigh'){
            const responsepettype = await axios.get(`/find/pettype/${petType.petType}/${sortaction}`)
            console.log(responsepettype)
            setPetTypeData(responsepettype.data)
            console.log(responsepettype)
            }

    }


        return (
            <div>
                <MainLayout>
                    {petType === 'dog' ? <div className='tagLine'>
                        <img src={dog} style={{ width: '5%' }} alt='dog gif' />I am Ameooooowsingg!!
                    </div> :petType === 'cat' ? <div className='tagLine'>
                        <img src={cat} style={{ width: '5%' }} alt='dog gif' />I am Ameooooowsingg!!
                    </div>:petType === 'bird' ? <div className='tagLine'>
                        <img src={bird} style={{ width: '5%' }} alt='dog gif' />I am Ameooooowsingg!!
                    </div>: petType === 'small-pet' ? <div className='tagLine'>
                        <img src={smallpet} style={{ width: '5%' }} alt='dog gif' />I am Ameooooowsingg!!
                    </div> :console.log(petType)}
                    <div>

                        <div className='parentContainer'>
                            <div className='filterSortBar'>
                                <div className='filterBar'>
                                    <h2>Filter By</h2>
                                    <h3>Pet type</h3>
                                    <div>
                                        <input type="radio" id="cat" name="filter" value="cat"  onClick={(e) => handleFilter(e)} />
                                        <label  > Cat</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="dog" name="filter" value="dog"  onClick={(e) => handleFilter(e)}/>
                                        <label > Dog</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="smallpet" name="filter"  value="smallpet" onClick={(e) => handleFilter(e)} />
                                        <label > Small pet</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="fish" name="filter"  value="fish" onClick={(e) => handleFilter(e)} />
                                        <label > Bird</label>
                                    </div>
                                    <div className='brand'>
                                        <h3>Brand</h3>
                                        <div>
                                            <input type="radio" id="cat" name="brand" value="Sheba" onClick={(e) => handleFilterBrand(e)} />
                                            <label > Sheba</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="dog" name="brand" value="Taste of the Wild" onClick={(e) => handleFilterBrand(e)}/>
                                            <label  > Taste of the Wild</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="smallpet" name="brand" value="Timothy Hay" onClick={(e) => handleFilterBrand(e)} />
                                            <label  > Timothy Hay</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="fish" name="brand" value="Pedigree" onClick={(e) => handleFilterBrand(e)} />
                                            <label  > Pedigree</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="fish" name="brand" value="Zupreem" onClick={(e) => handleFilterBrand(e)} />
                                            <label > Zupreem</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="fish" name="brand" value="Royal Canin" onClick={(e) => handleFilterBrand(e)} />
                                            <label> Royal Canin</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='sortBar'>
                                    <h3>Sort by</h3>
                                    <button className='highLow' sorton='highLow' onClick={(e) => handleSort(e)}><b>Price:</b> High to low</button>
                                    <button className='lowHigh' sorton='lowHigh' onClick={(e) => handleSort(e)}><b>Price:</b> Low to high</button>
                                </div>
                            </div>
                            <div className='productCards' >
                                {isLoading? <Spinner/> : petTypeData?.map((petTypeData, idx) => (<div key={idx+3} className='product'>
                                    <img src={petTypeData.image_url} alt={petTypeData.brand}></img>
                                    <h4>{petTypeData.product_name}</h4>
                                    <h4>{petTypeData.product_price}€</h4>
                                    <span>{String(petTypeData.rating).split("").map((rating, idx) => <StarIcon key={idx+2} style={{ color: 'orange' }} />)} </span>
                                    <br />
                                    <button prodid={petTypeData._id} onClick={(e) => handleAddProduct(e,idx)} ><b>ADD TO BAG</b></button>
                                    
                                </div>))
                                }
                            </div>

                        </div>


                    </div>
                </MainLayout>
            </div>
        )
    }
