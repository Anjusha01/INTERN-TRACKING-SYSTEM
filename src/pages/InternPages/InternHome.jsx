import axios from 'axios'
import React, { useEffect, useState } from 'react'
import InternProfile from './InternProfile'

const InternHome = () => {
    const [intern,setIntern]=useState('')
useEffect(()=>{
    let fetchData=async()=>{
        let username = localStorage.getItem('username')
        try{
            let response= await axios.get(`http://localhost:5000/intern/viewProfile/${username}`)
            // console.log(response)
            setIntern(response.data)
        }
        catch(e){
            console(e.response)
        }
    }
    fetchData()
},[])

    return (
        <div>
            <h1>
                InternHome
            </h1>
            <li>name: {intern.name}</li>
            <li>view task</li>
            <li>submit task</li>
            <li>view profile</li>
            <li>edit profile</li>
            <li>view scores</li>
            <div>
                <InternProfile/>
            </div>
        </div>
    )
}

export default InternHome