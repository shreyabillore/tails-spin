import React, { useEffect, useState } from 'react'
import axios from "axios";
import MainLayout from '../Layouts/MainLayout';
import './News.css'
import PetsIcon from '@material-ui/icons/Pets'
import Spinner from './Spinner'

export default function BlogPost() {

    const [animalNews, setAnimalNews] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    //     const options = {
    //   method: 'GET',
    //   url: 'https://brianiswu-cat-facts-v1.p.rapidapi.com/facts',
    //   headers: {
    //     'x-rapidapi-host': 'brianiswu-cat-facts-v1.p.rapidapi.com',
    //     'x-rapidapi-key': 'a7ce4b8a2bmsh49d18fa103131fbp15451fjsn4dd9e1593531'
    //   }
    // };

    // axios.request(options).then(function (response) {
    //     console.log('blog post is ',response.data);
    // }).catch(function (error) {
    //     console.error(error);
    // });

    useEffect(async() => {
        const response = await axios.get('https://hn.algolia.com/api/v1/search_by_date?query="animal"&tags=(story)&numericFilters=created_at_i>0&hitsPerPage=10');
        console.log(response.data.hits[0].title)
        setAnimalNews(response.data.hits)
        setIsLoading(!isLoading)
    }, [])

console.log(animalNews)
    return (
        <div>
            <MainLayout >
                <div className='animalNewsParent'>
                    {isLoading? <Spinner/> : animalNews.map(( ele,idx) => (
                        
                        <div className='animalCard'>
                            <div className='animalNewsChild'> <PetsIcon style={{marginRight:'1rem', color:'brown'}}/>{ele.title}</div>
                            <div className='animalNewsChild'><a href={ele.url}> {ele.url}</a></div>
                        </div>
                    ))}
                </div>
            </MainLayout>
        </div>
    )

}