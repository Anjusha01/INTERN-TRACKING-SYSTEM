import React from 'react';
import { Nav } from 'react-bootstrap';
import './InternSideNav.css';
import { Link, NavLink } from 'react-router-dom';
import { MdTask } from "react-icons/md";
import { TiHome } from "react-icons/ti";
// import { FaFileCode } from "react-icons/fa";

const InternSideNav = ({ isCollapsed }) => {
    return (
        <div className={`sidenav bgGray ${isCollapsed ? 'collapsed' : ''}`}>
            <Nav className="flex-column ps-3 py-4 fs-5">
                
                    <NavLink to='/intern' className='text-decoration-none text-white fw-bold m-2'>
                    <TiHome />
                        <span className='mx-2'>
                            Home
                        </span>
                    </NavLink>
                
                
                    <NavLink to='task' className='text-decoration-none text-white fw-bold m-2'>
                    <MdTask />
                        <span className='mx-2'>
                            Task
                        </span>
                    </NavLink>
                
                {/* <Nav.Link>
                    <NavLink to='ManageCourse' className='text-decoration-none text-white fw-bold'>
                    <FaFileCode />
                        <span className='mx-2'>
                            Courses
                        </span>
                    </NavLink>
                </Nav.Link> */}
            </Nav>
        </div>
    );
};

export default InternSideNav;
