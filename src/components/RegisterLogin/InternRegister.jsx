import React from 'react';
import Register from './Register';


const InternRegister = () => {
    return (
        <Register
            type="intern" 
            endpoint="http://localhost:5000/auth/intern/register" 
        />

    );
};

export default InternRegister;
