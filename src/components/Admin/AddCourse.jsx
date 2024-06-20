import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const AddCourse = () => {
    const [data, setData] = useState({
        courseName: '', // Initialized
        description: '', // Initialized
        syllabusFile: null, // Initialized
        imageFile: null, // Initialized
    });
    const [errors, setErrors] = useState({}); // Initialized
    const [imagePreview, setImagePreview] = useState('');


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

        // Update state with selected file
        setData({ ...data, [name]: selectedFile });

        // Generate a preview URL for images
        if (name === 'imageFile') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            if (selectedFile) {
                reader.readAsDataURL(selectedFile);
            }
        }

        // Clear previous error for this input field
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form fields
        let newErrors = {};
        if (!data.courseName) newErrors.courseName = 'Course Name is required';
        if (!data.description) newErrors.description = 'Description is required';
        if (!data.imageFile) newErrors.imageFile = 'Image File is required';

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
            let response = await axios.post('http://localhost:5000/admin/addCourse', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);

            // Clear the form fields after successful submission
            setData({
                courseName: '', // Reset
                description: '', // Reset
                syllabusFile: null, // Reset
                imageFile: null, // Reset
            });
            setImagePreview('');
            setErrors({});
            toast.success('Course added successfully!');
        } catch (e) {
            console.log(e.message);
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
                                    isInvalid={!!errors.description} // Added validation feedback
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formSyllabusFile" as={Row} className='m-2'>
                            <Form.Label column md="3">Syllabus File:</Form.Label>
                            <Col md="9">
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
                                <Form.Control
                                    type="file"
                                    name="imageFile"
                                    onChange={handleFile}
                                    accept="image/*"
                                    isInvalid={!!errors.imageFile} // Added validation feedback
                                />
                                {imagePreview && (
                                    <div className="mt-2">
                                        <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                    </div>
                                )}
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
                                Add Course
                            </Button>
                        </div>
                    </Form>
                    <ToastContainer />
                </Col>
            </Row>
        </Container>
    );
};

export default AddCourse;
