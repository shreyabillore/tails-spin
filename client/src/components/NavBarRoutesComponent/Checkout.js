import React from 'react'
import MainLayout from '../Layouts/MainLayout'
import axios from 'axios'
import { useEffect } from 'react'
import { PayPalButton } from "react-paypal-button-v2";
import './Checkout.css'

export default function Checkout() {

    let cookiedata=  document.cookie
    .split('; ')
    .find(row => row.startsWith('userid='))
    .split('=')[1];
    
    console.log(cookiedata)

    useEffect(async() => {

      //First fetch data and save to order collection    
      const cartResponse = await axios.post(`/users/product/orders/all?cookiedata=${cookiedata}`)

      //after saving to order delete cart 
        
    const response = await axios.delete(`/users/cart/items/removeall?cookiedata=${cookiedata}`)
         
    console.log('itesm deleted from cart',response.data)
    }, [])


    return (
        <div>
            <MainLayout>
            <div className='payPalParent' >
            <PayPalButton 
        amount="0.01"
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);

          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderID: data.orderID
            })
          });
        }}
      />
      </div>
            </MainLayout>
        </div>
    )
}
