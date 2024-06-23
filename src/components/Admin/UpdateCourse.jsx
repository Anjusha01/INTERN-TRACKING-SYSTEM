import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const UpdateCourse = () => {
    const { id } = useParams(); 
    const [data, setData] = useState({
        courseName: '',
        description: '',
        syllabusFile: null,
        imageFile: null,
    });
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        // Fetch course details based on id
        if (id) {
            const fetchCourseDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/course/viewCourseByName/${id}`);
                    setData({
                        courseName: response.data.courseName,
                        description: response.data.description,
                        syllabusFile: response.data.syllabusFile || null,
                        imageFile: response.data.imageFile || null,
                    });

                    // Set image preview
                    if (response.data.imageFile) {
                        setImagePreview(`http://localhost:5000/uploads/images/${response.data.imageFile}`);
                    }

                    // If syllabus file URL is available, you can set it similarly
                } catch (error) {
                    console.error('Error fetching course details:', error);
                }
            };
            fetchCourseDetails();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleFile = (e) => {
        const { name, files } = e.target;
        const selectedFile = files[0];

        setData({ ...data, [name]: selectedFile });

        if (name === 'imageFile') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            if (selectedFile) {
                reader.readAsDataURL(selectedFile);
            }
        }

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};
        if (!data.courseName) newErrors.courseName = 'Course Name is required';
        if (!data.description) newErrors.description = 'Description is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formData = new FormData();
        formData.append('courseName', data.courseName);
        formData.append('description', data.description);
        formData.append('syllabusFile', data.syllabusFile);
        formData.append('imageFile', data.imageFile);

        try {
            let response = await axios.put(`http://localhost:5000/admin/updateCourse/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);

            toast.success('Course updated successfully!');
        } catch (e) {
            console.error('Error updating course:', e);
            toast.error('Failed to update course.');
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={9}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formCourseName" as={Row} className='m-2'>
                            <Form.Label column md="3">Course Name: <span className="text-danger">*</span></Form.Label>
                            <Col md="9">
                                <Form.Control
                                    name="courseName"
                                    type="text"
                                    placeholder="Enter course name"
                                    value={data.courseName}
                                    onChange={handleChange}
                                    isInvalid={!!errors.courseName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.courseName}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formDescription" as={Row} className='m-2'>
                            <Form.Label column md="3">Description:<span className="text-danger">*</span></Form.Label>
                            <Col md="9">
                                <Form.Control
                                    name="description"
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter course description"
                                    value={data.description}
                                    onChange={handleChange}
                                    isInvalid={!!errors.description}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formSyllabusFile" as={Row} className='m-2'>
                            <Form.Label column md="3">Syllabus File:</Form.Label>
                            <Col md="9">
                                {data.syllabusFile && (
                                    <div>
                                        <p>Current Syllabus File: {data.syllabusFile.name}</p>
                                        {/* Optionally display a link to view/download the existing file */}
                                        <a href={`http://localhost:5000/uploads/syllabus/${data.syllabusFile.name}`} target="_blank" rel="noopener noreferrer">View Existing Syllabus</a>
                                    </div>
                                )}
                                <Form.Control
                                    type="file"
                                    name="syllabusFile"
                                    onChange={handleFile}
                                    accept=".pdf,.doc,.docx"
                                />
                                <Form.Text className="text-muted">
                                    Upload a PDF or Word document (DOC/DOCX).
                                </Form.Text>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formImageFile" as={Row} className='m-2'>
                            <Form.Label column md="3">Image:<span className="text-danger">*</span></Form.Label>
                            <Col md="9">
                                {imagePreview && (
                                    <div className="mt-2">
                                        <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                        <p>Current Image:</p>
                                        <img src={imagePreview} alt="Current" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                    </div>
                                )}
                                <Form.Control
                                    type="file"
                                    name="imageFile"
                                    onChange={handleFile}
                                    accept="image/*"
                                    isInvalid={!!errors.imageFile}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.imageFile}
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    Upload an image file (JPG, PNG, etc.).
                                </Form.Text>
                            </Col>
                        </Form.Group>

                        <div className="text-center">
                            <Button type='submit' className='bgGray border-0 my-3'>
                                Update Course
                            </Button>
                        </div>
                    </Form>
                    <ToastContainer />
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateCourse;
