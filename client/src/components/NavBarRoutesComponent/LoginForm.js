import React from 'react'
import MainLayout from '../Layouts/MainLayout'
import  './LoginForm.css'
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { ContextMain } from '../Context/ContextMain';
import { useContext } from 'react';





export default function LoginForm() {
 
  const navigate = useNavigate();
  const {loginId,setLoginId,setUserStatus,userStatus} = useContext(ContextMain)
    const [login, setLogin] = useState('');
    const [passLogin, setPassLogin] = useState('');
    const [passwordType, setPasswordType] = useState('password')
    // const [userStatus, setUserStatus] = useState('Logout');

    let response 
    const handleLogin = async e => {
     
      e.preventDefault();
      console.log('handle login here')
  
      if (!login || !passLogin) {
        alert('Both fields are mandatory')
        return
      }
  
        const data = {
          username: login,
          pass: passLogin
        }
    
        try {
            console.log('try bock here')
           response = await axios.post('/users/login', data)
           console.log('response is', response.data)
          setLoginId(response.data._id)
          console.log('login id',data._id)
          if (response?.data.success) navigate(`/user/${response.data._id}`) 
        
        } catch (err) {
          console.log('error', err.message)
        }
  
        
    }

    //Show password by changing type to text

    const handleTogglePass = () =>{
      passwordType === 'password'  ?setPasswordType('text') : setPasswordType('password');
    }


  
    return (
        <MainLayout userStatus={userStatus}>
        <div className='loginParentContainer' >
        <div className='formMain' onSubmit={handleLogin} >
          <form className='loginForm'>
          <h1>Login Form</h1>
            <label>Email address </label>
            <input type="text" name="name"  value={login} onChange={e => setLogin(e.target.value)} placeholder='enter email address'/>
            <label>Password </label>
            <input type={passwordType} name="name" value={passLogin} onChange={e => setPassLogin(e.target.value)} placeholder='enter password'/>
            <div className='password'>
            <input type="checkbox" name="togglepass"  onClick={handleTogglePass} />
            <label for="togglepass">Show password</label>
            </div>
            <button className='buttonSubmit' type='submit' value='Login' onClick={handleLogin}> Submit </button>
            </form>
      </div>
    
      </div>
      </MainLayout>

    )
}
