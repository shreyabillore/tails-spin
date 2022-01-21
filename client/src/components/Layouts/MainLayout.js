import React, { useState,useEffect, useContext } from 'react'
import './MainLayout.css'
import SearchIcon from '@material-ui/icons/Search'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { Avatar, IconButton } from '@material-ui/core';
import Logo from './Logo2.jpg'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import {Link} from 'react-router-dom'
import axios from 'axios';
import {ContextMain} from '../Context/ContextMain';
import { useNavigate } from 'react-router-dom';

/*This component represents the navbar and footer layout for the overall site */

export default function MainLayout(props) {

    //state to capture all the products
const {productCountData,loginId,setLogin,setProductCountData,search,setSearch} = useContext(ContextMain)
const navigate = useNavigate()
const [allBrands, setAllBrands] = useState()
const [allPetType,setAllPetType] = useState()
const [isLoggedIn, setIsLoggedIn] = useState('Login')
const [itemDeatils, setItemDetails] = useState([])

//params to get the value of the clicked Link

let cookiedata =  document.cookie ? document.cookie.split('; ').find(row => row.startsWith('userid=')).split('=')[1] :'';
console.log('cookiedata',cookiedata)
// function to get all the products

useEffect(async() => {

    if(cookiedata && cookiedata !== 'j%3Anull') setIsLoggedIn('Logout')    

    const brandResponse = await axios.get('/petstore/products/brands')
    const petTypeResponse =await axios.get('/petstore/products/pet-type')
    const cartResponse = await axios.get(`/users/products/cart?cookiedata=${cookiedata}`)
    
            console.log(petTypeResponse.data)
            console.log(brandResponse.data)
            setAllBrands(brandResponse.data)
            setAllPetType(petTypeResponse.data)
            setItemDetails(cartResponse.data)
            const cartItemCount = [...itemDeatils]
            console.log('cartItemCount.length',cartItemCount.length)
            setProductCountData(cartResponse ? cartResponse.data.length : 0)

}, [])



// handle logout button
const handleClick = async () => {
    console.log("Logout button here")

    const response = await axios.get('/users/logout')

    console.log('logout: reponse is', response)

    if (response?.data.success) navigate('/')
  }
  

// Array for service type 

const services = ['Relocate a pet','Mobile Grooming','Aquarium Maintenance']

    return (
        <>
            <div className='header'>
                <div className='header__left'>
                    <img src={Logo} alt='' />
                        <Link to='/'><h1>Tails-Spin</h1></Link>
                </div>
                <div className='header__center'>
                    <div className='header__input'>
                        <SearchIcon />
                        <input placeholder='Search products' value={search} type='text' onChange={(e) => {setSearch(e.target.value) ; navigate('/petstore/search')}} />
                    </div>
                </div>

                <div className='header__right'>
                    <div className='header__info'>
                        <Link to='/user/login' val='login' style={{textDecoration:'none',color:'black'}}><Avatar /><span >{cookiedata.substring(0,13)}</span><button className='loginBtn' onClick={handleClick}>{isLoggedIn}</button></Link>
                    </div>
                    <IconButton>
                       <Link to='/cart' style={{color:'black',textDecoration:'none'}}><AddShoppingCartIcon/><span>{itemDeatils? productCountData :0}</span></Link>
                    </IconButton>
                    <Link to='/orders'>Orders</Link>
                    <Link to='/user/signup' val='signup'>SignUp</Link>
                </div>
            </div>
            <div className='navBar'>
                <div className='navBarList'>
                    <div className="dropdown">
                        <button className="dropbtn">Shop By Brand
                        <ArrowDropDownIcon />
                        </button>
                        <div className="dropdown-content" >
                            {
                                allBrands?.map( (brandname,idx) => (<Link key={idx}  to={`/brand/${brandname}`} >{brandname}</Link>))
                            }
                            
                            {/* <Link to="/brand/brandname">Hollister</Link>
                            <Link to="/brand/brandname">Pediggrie</Link>
                            <Link to="/brand/brandname">Pawsome</Link> */} 
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Shop By Pet
                        <ArrowDropDownIcon />
                        </button>
                        <div className="dropdown-content" >
                        {
                                allPetType?.map( (petType,idx) => (<Link key={idx}  to={`/typepet/${petType}`} >{petType}</Link>))
                            }
                            
                            {/* <Link to="/pet/dog" >Dog</Link>
                            <Link to="/pet/cat">Cat</Link>
                            <Link to="/pet/small-pet">Small Pet</Link>
                            <Link to="/pet/bird">Bird</Link> */}
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Services
                        <ArrowDropDownIcon />
                        </button>
                        <div className="dropdown-content">
                           { services.map((service,idx) =>(  
                            <Link key={idx} to={`/services/${service}`}>{service}</Link>
                            ))}
                        </div>
                    </div>
                    <Link to='/allproducts'>All Products</Link>
                    <Link to='/news'>News</Link>
                    <Link to='/our-stores'>Our Stores</Link>
                </div>
            </div>
            
            {props.children}    

            <div className='footer'>
                <div className='footerSection1'>
                    <ul>Customer Service</ul>
                    <li>Track Order </li>
                    <li> Returns and Exchanges</li>
                    <li> Shipping Info</li>
                    <li> Find Stores</li>
                    <li> Contact Us</li>
                    <li> FAQ’s</li>
                </div>
                <div className='footerSection2'>
                    <ul>Services</ul>
                    <li><Link style={{textDecoration:'none',color:'black'}} to='/services/In-Store Grooming'>In-Store Grooming</Link></li>
                    <li><Link style={{textDecoration:'none',color:'black'}} to='/services/Mobile Grooming'> Mobile Grooming</Link></li>
                    <li><Link style={{textDecoration:'none',color:'black'}} to='/services/Relocate pet'> Relocate Pet</Link></li>
                    <li><Link style={{textDecoration:'none',color:'black'}} to='/services/Aquarium Maintenance'> Aquarium Maintenance</Link></li>
                </div>
                <div className='footerSection3'>
                    <ul>Corporatee</ul>
                    <li>Careers </li>
                    <li> About Us</li>
                    <li> Affiliate Program</li>
                    <li> Blogs</li>
                </div>

            </div>  
            {/* <div className='endofFooter' >
                <h5>Terms and Conditions</h5>
                <h5>Privacy Policy</h5>
                <h5>Copyrights since 2022</h5>
            </div> */}
        </>
    )
}
