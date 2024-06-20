import React from 'react';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';
import logo from '../../assets/images/smartinternz.png';
import './TrainerTopNav.css'

const TrainerTopNav = ({ toggleSideNav }) => {
    return (
        <Navbar className="bgGray topnav" expand="lg">
            <Container fluid className='d-flex justify-content-center'>

                <Row className="w-100">
                    <Col xs={12} sm={6} className="d-flex justify-content-center justify-content-sm-start align-items-center">

                        <Navbar.Brand>
                            <img src={logo} alt="logo" width="100" />
                        </Navbar.Brand>

                    </Col>
                    <Col xs={12} sm={6} className="d-flex align-items-center">
                        <Button className="d-block d-sm-none me-2 text-white bgGray" onClick={toggleSideNav}>
                            ☰
                        </Button>
                        <Nav className='ms-auto text-white'>
                            <Nav.Item>Welcome</Nav.Item>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
};

export default TrainerTopNav;
