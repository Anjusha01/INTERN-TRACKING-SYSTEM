import React, { useEffect, useState } from 'react';
import AdminTopNav from './AdminTopNav';
import AdminSideNav from './AdminSideNav';
import './navbaradmin.css';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavbarAdmin = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [user,setUser]= useState('')

    const toggleSideNav = () => {
        setIsCollapsed(!isCollapsed);
    };
    let navigate = useNavigate();
    useEffect(() => {
        let fetchData = async () => {
            let token = localStorage.getItem('token');
            let username = localStorage.getItem('username');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
               let response= await axios.get(`http://localhost:5000/auth/auth/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data)
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
                <AdminTopNav toggleSideNav={toggleSideNav} logout={logout} />
            </div>
            <div className='d-flex'>
                <div>
                    <AdminSideNav isCollapsed={isCollapsed} />
                </div>
                <div className='flex-grow-1 content-wrapper'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default NavbarAdmin;
