import React,{useContext,useEffect, useState} from 'react'
import {CaptainDataContext} from '../context/captainContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({children}) => {
    const token=localStorage.getItem('token')
    
    const navigate=useNavigate()
    const { setCaptain } = React.useContext(CaptainDataContext)
    const [isLoading,setIsLoading ] =useState(true)

    useEffect(() => {
      if(!token){
        navigate('/captain-login')
    } else {
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(response=>{
            if(response.status===200){
                setCaptain(response.data) 
                setIsLoading(false)
            }
        }).catch(err=>{
            localStorage.removeItem('token')
            navigate('/captain-login')
        });
    }
    }, [token,navigate,setCaptain])
    

    if(isLoading){
        return(
             <div>Loading....</div>
        )
    }
    

    return <>
    {children}
    </>;
};


export default CaptainProtectWrapper