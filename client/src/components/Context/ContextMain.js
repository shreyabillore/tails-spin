import React, {useState,createContext,useEffect,useRef} from 'react'
import axios from 'axios';


export const ContextMain = createContext();

export default function ContextMainProvider({children}){

  // let cookiedata= document.cookie? document.cookie.split('; ').find(row => row.startsWith('userid=')).split('=')[1] : '';

    const [productCountData, setProductCountData] = useState()
    const [loginid, setLoginId] = useState()
    const[search,setSearch] = useState()
    const [userStatus, setUserStatus] = useState('Logout');
    const[cartGlobalResponse, setCartGlobalResponse] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    // let cookiedata= document.cookie
    // .split('; ')
    // .find(row => row.startsWith('userid='))
    // .split('=')[1];
    // let newCartResponse;
    // let cartResponseData 
  
    // useEffect(async() => {
    //     cartResponseData = await axios.get(`/users/products/cart?cookiedata=${cookiedata}`);
    //    setCartGlobalResponse(cartResponseData.data)
    //   setProductCountData(cartResponseData.data.length)      
    // },[cartGlobalResponse.length])

    // console.log('count is',productCountData)

       return (
        <ContextMain.Provider value={{productCountData,loginid,setLoginId,setUserStatus,userStatus,setProductCountData,isLoading,setIsLoading,search,setSearch}} >
          {children} 
        </ContextMain.Provider>
     )

}