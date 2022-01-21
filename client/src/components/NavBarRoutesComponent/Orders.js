import React from 'react'
import MainLayout from '../Layouts/MainLayout'
import './Orders.css'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { ContextMain } from '../Context/ContextMain'
import StarIcon from '@material-ui/icons/Star'



export default function Orders() {
    const [totalOrder, setTotalOrder] = useState()

    let cookiedata = document.cookie
        .split('; ')
        .find(row => row.startsWith('userid='))
        .split('=')[1];

    console.log(cookiedata)


    useEffect(async () => {

        try {
            const OrderResponse = await axios.get(`/users/product/orders?cookiedata=${cookiedata}`)
            console.log('order data is :', OrderResponse.data)
            setTotalOrder(OrderResponse.data)
        }
        catch (err) {
            console.log('error order', err.message)
        }

    }, [])

    return (
        <MainLayout>

            <div className='orders'>
                {totalOrder?.map((totalOrder, idx) => (
                    <div className='product' key={idx + 5}>
                        <img src={totalOrder.image_url} alt='pediggrie' />
                        <h4>{totalOrder.product_name}</h4>
                        <h4>{totalOrder.product_price}€</h4>
                        <span>{String(totalOrder.rating).split("").map((rating, idx) => <StarIcon key={idx + 2} style={{ color: 'orange' }} />)} </span>
                        <br />
                    </div>))}
            </div>
        </MainLayout>
    )
}
