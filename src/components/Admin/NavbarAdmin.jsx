import React, { useState } from 'react';
import AdminTopNav from './AdminTopNav';
import AdminSideNav from './AdminSideNav';
import './navbaradmin.css';
import { Outlet } from 'react-router-dom';

const NavbarAdmin = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleSideNav = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            <div className='row no-gutters'>
                <AdminTopNav toggleSideNav={toggleSideNav} />
            </div>
            <div className='d-flex'>
                <div >
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
