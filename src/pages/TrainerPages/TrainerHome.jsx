import axios from 'axios'
import React, { useEffect, useState } from 'react'

const TrainerHome = () => {

  const [trainer,setTrainer]=useState('')
useEffect(()=>{
    let fetchData=async()=>{
        let username = localStorage.getItem('username')
        try{
            let response= await axios.get(`http://localhost:5000/trainer/viewProfile/${username}`)
            console.log(response)
            setTrainer(response.data)
        }
        catch(e){
            console(e.response)
        }
    }
    fetchData()
},[])
  return (
    <div>
      <h1>Welcome Trainer</h1>
      <li>name: {trainer.name}</li>
      <li>view profile</li>
      <li>View Assigned Interns</li>
      <li>View answers and add score</li>
      <li>Provide task to Interns</li>
    </div>
  )
}

export default TrainerHome