import React from 'react';
import { Nav } from 'react-bootstrap';
import './AdminSideNav.css';
import { Link, NavLink } from 'react-router-dom';
import { PiStudentThin } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaFileCode } from "react-icons/fa";
import { TiHome } from "react-icons/ti";

const AdminSideNav = ({ isCollapsed }) => {
    return (
        <div className={`sidenav bgGray ${isCollapsed ? 'collapsed' : ''}`}>
            <Nav className="flex-column ps-3 py-4 fs-5">
            
                    <NavLink to='/admin' className='text-decoration-none text-white fw-bold m-2'>
                    <TiHome />
                        <span className='mx-2'>
                            Home
                        </span>
                    </NavLink>
            
                
                    <NavLink to='manageIntern' className='text-decoration-none text-white fw-bold m-2 '>
                        <PiStudentThin />
                        <span className='mx-2'>
                            Interns
                        </span>
                    </NavLink>
               
                
                    <NavLink to='manageTrainer' className='text-decoration-none text-white fw-bold m-2'>
                        <GiTeacher />
                        <span className='mx-2'>
                            Trainers
                        </span>
                    </NavLink>
               
                
                    <NavLink to='ManageCourse' className='text-decoration-none text-white fw-bold m-2'>
                    <FaFileCode />
                        <span className='mx-2'>
                            Courses
                        </span>
                    </NavLink>
                
            </Nav>
        </div>
    );
};

export default AdminSideNav;
