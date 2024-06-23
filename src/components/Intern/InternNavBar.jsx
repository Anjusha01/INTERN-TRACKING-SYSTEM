import React, { useEffect, useState } from 'react';
import './InternNavBar.css';
import { Outlet, useNavigate } from 'react-router-dom';
import InternTopNav from './InternTopNav';
import InternSideNav from './InternSideNav';
import axios from 'axios';

const InternNavbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [intern, setIntern] = useState('');

    const toggleSideNav = () => {
        setIsCollapsed(!isCollapsed);
    };

    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let token = localStorage.getItem('token');
            let username = localStorage.getItem('username');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                let response = await axios.get(
                    `http://localhost:5000/auth/auth/${username}`  //response gets data from usercollection
                    , {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response);
                setIntern(response.data);
            } catch (e) {
                console.log(e.response);
                navigate('/login');
            }
        };
        fetchData();
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username')
        navigate('/login');
    };

    return (
        <>
            <div className='row no-gutters'>
                <InternTopNav toggleSideNav={toggleSideNav} logout={logout}/>
            </div>
            <div className='d-flex'>
                <div className={`sidenav-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
                    <InternSideNav isCollapsed={isCollapsed} />
                </div>
                <div className='flex-grow-1 content-wrapper'>
                    {intern.name}
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default InternNavbar;
