import React from 'react'
import MainLayout from '../Layouts/MainLayout'
import  './LoginForm.css'
import { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function SignUp() {

    const [username, setUsername] = useState('');
    const [pass, setPass] = useState();
    const [rePass, setRePass] = useState();
    
    const navigate = useNavigate()
    const [passwordType, setPasswordType] = useState('password')

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('handle submit here')
    
        if (!username || !pass) {
          alert('Both fields are mandatory')
          return
        }
    
          const data = {
            username,
            pass
          }
      
          try {
    
            const response = await axios.post('/users/register', data)
            console.log('response is', response)
            navigate('/user/login')
            
          
          } catch (err) {
            console.log('error', err.message)
          }
      
      }
  
  // hand show password     
    const handleTogglePass = () =>{
      passwordType === 'password'  ?setPasswordType('text') : setPasswordType('password');
    }

    return (
        
        <MainLayout>
        <div className='loginParentContainer' >
      <div className='formMain'> 
          <form className='loginForm' onSubmit={(e) => handleSubmit(e)}>
          <h1>SignUp Form</h1>
            <label>Email address </label>
            <input type="text" name="name"  value={username} onChange={e => setUsername(e.target.value)} placeholder='enter email address'/>
            <label>Password </label>
            <input  name="name"  type={passwordType}   value={pass} onChange={e => setPass(e.target.value)} placeholder='enter password'/>
            <label>Re-Password </label>
            <input name="name"  type={passwordType}   value={rePass} onChange={e => setRePass(e.target.value)} placeholder='enter password'/>
            <div className='password'>
            <input type="checkbox" name="togglepass"  onClick={handleTogglePass} />
            <label for="togglepass">Show password</label>
            </div>
            <button type='submit' className='buttonSubmit' value='Login' onClick={handleSubmit}>  Submit </button>
            </form>
      </div>
      </div>
      </MainLayout>

    )
}
