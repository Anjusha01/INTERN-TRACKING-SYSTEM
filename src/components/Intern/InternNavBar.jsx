import React, { useState } from 'react';
import './InternNavBar.css';
import { Outlet } from 'react-router-dom';
import InternTopNav from './InternTopNav';
import InternSideNav from './InternSideNav';

const InternNavbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleSideNav = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            <div className='row no-gutters'>
                <InternTopNav toggleSideNav={toggleSideNav} />
            </div>
            <div className='d-flex'>
                <div className={`sidenav-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
                    <InternSideNav isCollapsed={isCollapsed} />
                </div>
                <div className='flex-grow-1 content-wrapper'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default InternNavbar;
