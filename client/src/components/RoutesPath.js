import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from './Home/HomePage'
import PetType from './NavBarRoutesComponent/PetType'
import Services from './NavBarRoutesComponent/Services'
import Orders from './NavBarRoutesComponent/Orders'
import Cart from './NavBarRoutesComponent/Cart'
import LoginForm from './NavBarRoutesComponent/LoginForm'
import Stores from './NavBarRoutesComponent/Stores'
import Brands from './NavBarRoutesComponent/Brands'
import SignUp from './NavBarRoutesComponent/SignUp'
import Auth from '../hoc/AuthClient'
import Checkout from './NavBarRoutesComponent/Checkout'
import News from './NavBarRoutesComponent/News'
import AllProducts from './NavBarRoutesComponent/AllProducts'
import Search  from './NavBarRoutesComponent/Search'


function RoutesPath() {

    
    return (
        <div>
                <Routes>
                    <Route path='/user/:userid' element={ <HomePage />} exact />
                    <Route path='/brand/:brandname' element={<Brands/>}/>
                    <Route path='/typepet/:petType' element={<PetType/>}/>
                    <Route path='/services/:servicetype' exact element={<Services/>}/>
                    <Route path='/orders' element={<Orders/>} />
                    {/* <Route path='/pet/:pet_type/:id/cart' element={ <Cart/> } />  */}
                    <Route path='/cart' element={ Auth() ? <Cart/> : <HomePage/> } exact/> 
                    <Route path='/user/login' element={<LoginForm/>} exact />
                    <Route path='/user/signup' element={<SignUp/>} exact/>
                    <Route path='/our-stores' element={<Stores/>} />   
                    <Route path='/petstore/checkout' element={<Checkout/>} />
                    <Route path='/pet/dog/'  element={<PetType filterTypedata='dog' />} />
                    <Route path='/pet/cat/' element={<PetType filterTypedata='cat'/>} />
                    <Route path='/pet/small-pets/'  element={<PetType filterTypedata='small-pet' />} />
                    <Route path='/pet/birds/' element={<PetType filterTypedata='bird' />} />
                   <Route path='/news' element={<News/>}/>
                   <Route path='/' element={ <HomePage />} exact />
                   <Route path='/allproducts' element={ <AllProducts/>} exact />
                   <Route path='/petstore/search' element={<Search/>} exact />
                </Routes>       
        </div>
    )
}

export default RoutesPath
