import React from 'react';
import { Nav } from 'react-bootstrap';
import './TrainerSideNav.css';
import { Link, NavLink } from 'react-router-dom';
import { PiStudentThin } from "react-icons/pi";
import { TiHome } from "react-icons/ti";
// import { GiTeacher } from "react-icons/gi";
import { MdTask } from "react-icons/md";

const TrainerSideNav = ({ isCollapsed }) => {
    return (
        <div className={`sidenav bgGray ${isCollapsed ? 'collapsed' : ''}`}>
            <Nav className="flex-column ps-3 py-4 fs-5">
            
                    <NavLink to='/trainer' className='text-decoration-none text-white fw-bold m-2'>
                    <TiHome />
                        <span className='mx-2'>
                            Home
                        </span>
                    </NavLink>
                
               
                    <NavLink to='viewIntern' className='text-decoration-none text-white fw-bold m-2'>
                        <PiStudentThin />
                        <span className='mx-2'>
                            Interns
                        </span>
                    </NavLink>
                
              
                    <NavLink to='assignTask' className='text-decoration-none text-white fw-bold m-2'>
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

export default TrainerSideNav;
