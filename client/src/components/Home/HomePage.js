import React, {useContext} from 'react'
import ResponsiveCarousel from '../ResponsiveCarousel'
import MainLayout from '../Layouts/MainLayout'
import { useParams } from 'react-router-dom'
import {ContextMain} from '../Context/ContextMain';


export default function HomePage() {
const {productCount,loginId,setLogin,setProductCount} = useContext(ContextMain)
const userid = useParams();

console.log('userid is',userid)

    return (
        <>
        <div className='carousel'>
            <MainLayout >
                <ResponsiveCarousel/>
            </MainLayout>   
        </div>
        </>
    )
}
