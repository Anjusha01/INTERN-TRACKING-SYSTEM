import React from 'react'
import homeImg from '../../assets/images/home.jpg';
import { Link } from 'react-router-dom';
const Intro = () => {
  return (
    <div
            className='d-flex flex-column justify-content-center align-items-center'
            style={{
                backgroundImage: `linear-gradient(rgba(45, 90, 109, 0.5), rgba(45, 90, 109, 0.5)), url(${homeImg})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '500px'
            }}
        >
            <div className='loginBtn'>
                <Link to='login' className='w-100'>
                <button className='bgGray loginBtn text-white border-0 btn w-100 rounded-0 shadow shadow-lg fw-bold'>Login</button>
                </Link>
            </div>
        </div>
  )
}

export default Intro