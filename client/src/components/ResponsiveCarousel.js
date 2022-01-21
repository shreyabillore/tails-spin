import React from "react";
import './Home/HomePage.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';


export default function ResponsiveCarousel() {
    return (
        <div>
            <div className="carousel-container" >
                <Carousel  infiniteLoop autoPlay showThumbs={false} >
                    <div className="imageCaraousel">
                     <img src="https://images.unsplash.com/photo-1583336663277-620dc1996580?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9ncyUyMGluJTIwY2xvdGhlc3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="slide one" style={{ height: '50rem' }} />

                    </div>
                    <div className="imageCaraousel">
                    <img src="https://www.k9ofmine.com/wp-content/uploads/2020/05/dog-photo-props-850x520.jpg" alt="slide two" style={{ height: '50rem' }} /> 

                    </div>
                    <div className="imageCaraousel">
                     <img src="https://images.unsplash.com/photo-1585837575652-267c041d77d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1790&q=80" alt="slide three" style={{ height: '50rem' }} /> 

                    </div>
                    <div className="imageCaraousel">
                    <img src="https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80" alt="slide four" style={{ height: '50rem' }} />
                    </div>
                </Carousel>
                <h1>Popular Categories</h1>
                <div className='popularCategory'>
                <div className='tile1'>
                    <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-dog-toys-1587002073.jpg?crop=0.668xw:1.00xh;0.162xw,0&resize=640:*" alt="Dog Products"/>
                        <div className="text-block">
                        <Link style={{textDecoration:'none',color:'white'}} to='/pet/dog'><h4>Dog Products</h4></Link>
                        </div>
                    </div>
                    
                    <div className='tile2'>
                    <img src='https://blog.petloverscentre.com/wp-content/uploads/2020/07/Hypoallergenic-food-for-cats-with-allergies-scaled.jpg'  alt="Cat Products" /> 
                    <div className="text-block">
                    <Link style={{textDecoration:'none',color:'white'}} to='/pet/cat'><h4>Cat Products</h4></Link>
                        </div></div>
                    <div className='tile3'> 
                    <img src='https://i.insider.com/60d0af793093db00197023c5?width=1136&format=jpeg' alt="Small pet products Products" />
                    <div className="text-block">
                    <Link style={{textDecoration:'none',color:'white'}} to='/pet/small-pets'><h4>Small Pets Products</h4></Link>
                        </div></div>
                    <div className='tile4'>
                        <img src='https://cdn.wallpapersafari.com/11/6/tnky07.jpg'  alt="Bird Products" />
                    <div className="text-block">
                    <Link style={{textDecoration:'none',color:'white'}} to='/pet/birds'><h4>Bird Products</h4></Link>
                        </div></div>
                </div>
            </div>
        </div>
    );
}
