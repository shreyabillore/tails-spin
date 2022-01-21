import React, { useState,useEffect,useContext } from 'react'
import axios from 'axios'
import MainLayout from '../Layouts/MainLayout'
import StarIcon from '@material-ui/icons/Star'
import {ContextMain} from '../Context/ContextMain'

export default function Search() {

    const {productCountData,loginId,setLogin,setProductCountData,search,setSearch} = useContext(ContextMain)
    const[searchData,setSearchData] = useState()

    useEffect(async () => {
        
        console.log(search)
        const response = await axios.get(`/petstore/search?term=${search}`)
        setSearchData(response.data)

    }, [search])

    return (
        
            <MainLayout>

            <div className='orders'>
                {searchData?.map((totalOrder, idx) => (
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
