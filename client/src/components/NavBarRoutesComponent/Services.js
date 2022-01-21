import React from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '../Layouts/MainLayout'
import './Services.css'
import { useState } from 'react'
import axios from 'axios'


export default function Services() {


    const servicetype = useParams()
    console.log(servicetype.servicetype)

    const [status, setStatus] = useState("Submit");
    const [username,setUsername] = useState('')
    const [lastname,setLastname] = useState('')
    const [email,setEmail] = useState('')
    const [date,setDate] = useState('')
    


  const handleSubmit = async (e) => {
    console.log('hello')
    e.preventDefault();
    setStatus("Sending...");
    // const { username,lastname, email,date } = e.target.elements;
    // console.log('e.target.elements :', e.target.elements)
    let details = {
      username: username,
      lastname:lastname,
      email: email,
      date:date
    };
    let response = await axios.post('/petstore/services',details);
    console.log('response', response)
    setStatus("Submit");

    setUsername('')
    setLastname('')
    setEmail('')
    setDate('')
  
  };

    return (
      <div className='mainBody'>
        <MainLayout>
            <div className='formParentContainer'>
                <div className='contactInfo'>
                    <p>For more Information, kindly contact us on the below number!!!</p>
                    <p>+49 15400082000</p>
                    <p>You can also contact us via email</p>
                    <p>tails-spin@gmail.com</p>
                </div>
            <div className='serviceForm' >
                <h1>{servicetype.servicetype}</h1>
                  <form className='serviceFormParent' onSubmit={(e) => handleSubmit(e)} >
                    <label>Name </label>
                    <input className='serviceFormInput' value={username} type="text" name="name" onChange={e => setUsername(e.target.value)} />
                    <label>Last Name </label>
                    <input className='serviceFormInput' type="text" value={lastname} name="name" onChange={e => setLastname(e.target.value)} />
                    <label>Email address </label>
                    <input className='serviceFormInput' type="text" value={email} name="name" onChange={e => setEmail(e.target.value)}  />
                    <label>When shold we call you (mention date and time)?</label>
                    <input className='serviceFormInput' value={date}  type="datetime-local" id="contacttime" name="contacttime" onChange={e => setDate(e.target.value)}/>
                    <button className='serviceFormButton' type='submit' onSubmit={(e) => handleSubmit(e)} >{status}</button>
                    </form>
              </div>
                
            </div>
        </MainLayout>
        </div>
    )
}
