import React from 'react';
import Register from './Register';


const TrainerRegister = () => {
    return (
        <Register
            type="trainer" 
            endpoint="http://localhost:5000/auth/trainer/register"
        />

    );
};

export default TrainerRegister;