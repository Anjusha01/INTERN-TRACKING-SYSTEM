import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Form, Button, Container } from 'react-bootstrap';
import profile from '../../assets/images/Ellipse4.png';
import logo from '../../assets/images/smartinternz.png';
import FileBase64 from 'react-file-base64';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './register.css';
import { ToastContainer, toast } from 'react-toastify';

const Register = ({ type, endpoint }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [passwordError, setPasswordError] = useState([]);
    const [courses, setCourses] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const fileInputRef = useRef(null); // Create a reference for the FileBase64 component

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/course/viewCourseName');
            setCourses(response.data);
            console.log(response.data);
        };
        fetchData();
    }, [refresh]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }

        if (name === 'password') {
            validatePassword(value);
        }

        if (name === 'confirmPassword') {
            if (value !== data.password) {
                setErrors({ ...errors, confirmPassword: 'Passwords do not match.' });
            } else {
                setErrors({ ...errors, confirmPassword: '' });
            }
        }
    };

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long.");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("Password must contain at least one lowercase letter.");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one uppercase letter.");
        }
        if (!/\d/.test(password)) {
            errors.push("Password must contain at least one number.");
        }
        if (!/[!@#$%^&*]/.test(password)) {
            errors.push("Password must contain at least one special character.");
        }
        setPasswordError(errors);
    };

    const handleRegister = async () => {
        const requiredFields = ['name', 'dateJoined', 'username', 'email', 'password', 'confirmPassword'];
        console.log(data);

        if (type === 'intern') {
            requiredFields.push('course');
        } else if (type === 'trainer') {
            requiredFields.push('specialization');
        }

        const newErrors = {};
        requiredFields.forEach(field => {
            if (!data[field]) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post(endpoint, data);
            console.log(response);
            toast.success("Registered Successfully");
            setRefresh(!refresh);
            setData({});
            setPasswordError([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Clear the file input field
            }
        } catch (err) {
            console.log(err.response.data.error);
            setErrors({ general: err.response.data.error });
        }
    };

    const handleFileDone = (base64String) => {
        setData({ ...data, photo: base64String.base64 });
    };

    return (
        <Container fluid className='d-flex align-items-center justify-content-center bgGray' style={{ minHeight: '100vh' }}>
            <ToastContainer />
            <Row className='bg-white rounded' style={{ minWidth: '70vw' }}>
                <Col className='d-flex flex-column align-items-center justify-content-center bgGray my-3 mx-2 rounded p-4'>
                    <img src={profile} alt="Profile" className='' />
                    <div className='text-white'>
                        <h3>{type.charAt(0).toUpperCase() + type.slice(1)} Register</h3>
                    </div>
                    <div className='w-75'>
                        <Button className=" mt-2 bg-white text-reset border-0 w-100">
                            <Link to='/login' className='text-decoration-none text-reset '>Login</Link>
                        </Button>
                    </div>
                </Col>
                <Col className='my-auto'>
                    <div className="py-3">
                        <Row className="justify-content-center">
                            <Col xs={6} className="text-center">
                                <img src={logo} alt="Logo" className="w-100 mb-3" />
                            </Col>
                        </Row>
                        <form className='' style={{ fontSize: '.8rem' }}>
                            <Form.Group controlId="name" className='mt-3 position-relative'>
                                <label htmlFor="name" className="input-label">Name <span className="text-danger">*</span></label>
                                <Form.Control
                                    className='placeholders'
                                    name='name'
                                    type="text"
                                    placeholder="Enter your name"
                                    value={data.name || ''}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.name && <div className="text-danger mt-2">{errors.name}</div>}
                            </Form.Group>

                            {type === 'intern' && (
                                <Form.Group controlId="course" className='mt-3 position-relative'>
                                    <label htmlFor="course" className="input-label">Course <span className="text-danger">*</span></label>
                                    <Form.Control
                                        name='course'
                                        as="select"
                                        placeholder="Enter your course"
                                        value={data.course || ''}
                                        onChange={handleChange}
                                        className='placeholders'
                                        required
                                    >
                                        <option value="">Select a course...</option>
                                        {courses.map((course) => (
                                            <option key={course._id} value={course.courseName}>{course.courseName}</option>
                                        ))}
                                    </Form.Control>
                                    {errors.course && <div className="text-danger mt-2">{errors.course}</div>}
                                </Form.Group>
                            )}

                            {type === 'trainer' && (
                                <Form.Group controlId="specialization" className='mt-3 position-relative'>
                                    <label htmlFor="specialization" className="input-label">Specialization <span className="text-danger">*</span></label>
                                    <Form.Control
                                        name='specialization'
                                        as="select"
                                        placeholder="Enter your specialization"
                                        value={data.specialization || ''}
                                        onChange={handleChange}
                                        className='placeholders'
                                        required
                                    >
                                        <option value="">Select a specialization...</option>
                                        {courses.map((course) => (
                                            <option key={course._id} value={course.courseName}>{course.courseName}</option>
                                        ))}
                                    </Form.Control>
                                    {errors.specialization && <div className="text-danger mt-2">{errors.specialization}</div>}
                                </Form.Group>
                            )}

                            <Row>
                                <Col>
                                    <Form.Group controlId="photo" className='mt-3'>
                                        <label htmlFor="photo" className="custom-file-upload">
                                            Choose Your Photo
                                        </label>
                                        <FileBase64
                                            ref={fileInputRef}
                                            id="photo"
                                            multiple={false}
                                            onDone={handleFileDone}
                                            className="form-control d-none"
                                            fileInputLabel="Choose Your Photo"
                                            fileInputProps={{ accept: 'image/*' }}
                                            name='photo'
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="dateJoined" className='mt-3 position-relative'>
                                        <label htmlFor="dateJoined" className="input-label">Date Joined <span className="text-danger">*</span></label>
                                        <Form.Control
                                            className='placeholders'
                                            name='dateJoined'
                                            type="date"
                                            value={data.dateJoined || ''}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.dateJoined && <div className="text-danger mt-2">{errors.dateJoined}</div>}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="username" className='mt-3 position-relative'>
                                <label htmlFor="username" className="input-label">Username <span className="text-danger">*</span></label>
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
                            <Form.Group controlId="email" className='mt-3 position-relative'>
                                <label htmlFor="email" className="input-label">Email <span className="text-danger">*</span></label>
                                <Form.Control
                                    name='email'
                                    type="email"
                                    placeholder="Enter your email"
                                    value={data.email || ''}
                                    onChange={handleChange}
                                    className='placeholders'
                                    required
                                />
                                {errors.email && <div className="text-danger mt-2">{errors.email}</div>}
                            </Form.Group>
                            <Form.Group controlId="password" className='mt-3 position-relative'>
                                <label htmlFor="password" className="input-label">Password <span className="text-danger">*</span></label>
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
                                {passwordError.length > 0 && (
                                    <div className="text-danger mt-2">
                                        <ul>
                                            {passwordError.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group controlId="confirmPassword" className='mt-3 position-relative'>
                                <label htmlFor="confirmPassword" className="input-label">Confirm Password <span className="text-danger">*</span></label>
                                <Form.Control
                                    name='confirmPassword'
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={data.confirmPassword || ''}
                                    onChange={handleChange}
                                    className='placeholders'
                                    required
                                />
                                {errors.confirmPassword && <div className="text-danger mt-2">{errors.confirmPassword}</div>}
                            </Form.Group>
                            <Button variant="primary" type="button" className="w-100 mt-2 text-decoration-none bgGray text-white" onClick={handleRegister}>
                                Register
                            </Button>
                            {errors.general && <div className="text-danger mt-2">{errors.general}</div>}
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
