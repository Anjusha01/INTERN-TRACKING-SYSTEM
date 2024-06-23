import React, { useEffect, useState } from 'react';
import TrainerTopNav from './TrainerTopNav';
import TrainerSideNav from './TrainerSideNav';
import './TrainernavBar.css';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TrainerNavbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [trainer,setTrainer]=useState('')

    const toggleSideNav = () => {
        setIsCollapsed(!isCollapsed);
    };

    let navigate = useNavigate();

    useEffect(() => {
        let fetchData = async () => {
            let token = localStorage.getItem('token');
            let username = localStorage.getItem('username')
            if (!token) {
                navigate('/login');
                return;
            }
            try {
               const response= await axios.get(`http://localhost:5000/auth/auth/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTrainer(response.data)
            } catch (e) {
                console.log(e.response);
                navigate('/login');
            }
        };
        fetchData();
    }, [navigate]);
    
    const logout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <>
            <div className='row no-gutters'>
                <TrainerTopNav toggleSideNav={toggleSideNav} logout={logout} profilename={trainer.name} />
            </div>
            <div className='d-flex'>
                <div className={`sidenav-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
                    <TrainerSideNav isCollapsed={isCollapsed} />
                </div>
                <div className='flex-grow-1 content-wrapper'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default TrainerNavbar;
