import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'; // Remove Link import
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/images/smartinternz.png';
import { Dropdown } from 'react-bootstrap';

const NavbarHome = () => {
    return (
        <>
            <Navbar expand="lg" className="bgGray">
                <Container fluid>
                    <NavLink to='/' className="nav-link"> {/* Use NavLink instead of Link */}
                        <Navbar.Brand>
                            <img src={logo} alt="logo" className='w-50' />
                        </Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Dropdown align='end'>
                                <Dropdown.Toggle id="" className='bg-transparent text-white border-0'>
                                    Register
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='rounded-0 mt-2 '>
                                    <Dropdown.Item as={NavLink} to="/trainer-register-login" className='text-center'>Trainer</Dropdown.Item>
                                    <Dropdown.Item as={NavLink} to="/intern-register-login" className=' text-center'>Intern</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
};

export default NavbarHome;
