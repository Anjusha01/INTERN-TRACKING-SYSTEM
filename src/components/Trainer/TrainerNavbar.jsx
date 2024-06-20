import React, { useState } from 'react';
import TrainerTopNav from './TrainerTopNav';
import TrainerSideNav from './TrainerSideNav';
import './TrainernavBar.css';
import { Outlet } from 'react-router-dom';

const TrainerNavbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleSideNav = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            <div className='row no-gutters'>
                <TrainerTopNav toggleSideNav={toggleSideNav} />
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
