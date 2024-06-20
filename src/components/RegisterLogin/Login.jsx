import React, { useState } from 'react';
import { Col, Row, Form, Button, Container } from 'react-bootstrap';
import profile from '../../assets/images/Ellipse4.png';
import logo from '../../assets/images/smartinternz.png'; // Import the logo
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const navigate= useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleLogin = async () => {
        if (!data.username || !data.password) {
            setErrors({
                username: data.username ? '' : 'Username is required.',
                password: data.password ? '' : 'Password is required.'
            });
            return;
        }

        try {
            let response = await axios.post('http://localhost:5000/auth/login', data);
            console.log(response);
            if(response.data === 'admin'){
                navigate('/admin')
            }
            else if(response.data === 'trainer'){
                navigate('/trainer')
            }
            else if(response.data === 'intern'){
                navigate('/intern')
            }
        } catch (err) {
            setErrors({ general: 'An error occurred during login.' });
        }
    };

    return (
        <Container fluid className='vh-100 d-flex align-items-center justify-content-center bgGray'>
            <Row className='bg-white rounded' style={{ minWidth: '70vw' }}>
                <Col className='d-flex flex-column align-items-center justify-content-center bgGray my-3 mx-2 rounded p-4'>
                    <img src={profile} alt="Profile" className='' />
                    <div className='text-white'>
                        <h3>Login</h3>
                    </div>
                </Col>
                <Col className='my-auto'>
                    <div className="py-3">
                        <Row className="justify-content-center">
                            <Col xs={6} className="text-center">
                                <img src={logo} alt="Logo" className="w-100 mb-3" /> {/* Add the logo here */}
                            </Col>
                        </Row>
                        <form className='' style={{ fontSize: '.8rem' }}>
                            <Form.Group controlId="formUsername" className='mt-3 position-relative'>
                                <span className="input-label">Username <span className="text-danger">*</span></span>
                                <Form.Control
                                    name='username'
                                    type="text"
                                    placeholder="Enter your username"
                                    value={data.username || ''}
                                    onChange={handleChange}
                                    className='placeholders'
                                    required
                                />
                                {errors.username && <div className="text-danger mt-2">{errors.username}</div>}
                            </Form.Group>
                            <Form.Group controlId="formPassword" className='mt-3 position-relative'>
                                <span className="input-label">Password <span className="text-danger">*</span></span>
                                <Form.Control
                                    name='password'
                                    type="password"
                                    placeholder="Enter your password"
                                    value={data.password || ''}
                                    onChange={handleChange}
                                    className='placeholders'
                                    required
                                />
                                {errors.password && <div className="text-danger mt-2">{errors.password}</div>}
                            </Form.Group>
                            <Button variant="primary" type="button" className="w-100 mt-2 text-decoration-none bgGray text-white" onClick={handleLogin}>
                                Login
                            </Button>
                            {errors.general && <div className="text-danger mt-2">{errors.general}</div>}
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
