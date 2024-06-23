import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ViewCourseAdmin = () => {
  const [refresh, setRefresh] = useState(true);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let response = await axios.get('http://localhost:5000/course/viewCourseDetails');
        setCourses(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [!refresh]);


  let handleRefresh = () => {
    setRefresh(!refresh)
  }

  let handleDelete = async (id) => {
    try {
        let response=await axios.delete(`http://localhost:5000/admin/deleteCourse/${id}`);
        setRefresh(!refresh)

    }
    catch (e) {
      console.log(e.response);
    }
  }

  let handleUpdate = async (id) => {
      navigate(`/admin/updateCourse/${id}`)
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Course Details</h1>
        </Col>
      </Row>
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" />
        </Row>
      ) : error ? (
        <Row className="justify-content-center">
          <Alert variant="danger">{error}</Alert>
        </Row>
      ) : (
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Syllabus</th>
                  <th>Update/Delete</th>

                </tr>
              </thead>
              <tbody>
                {courses.map((item) => (
                  <tr key={item._id}>
                    <td>{item.courseName}</td>
                    <td>{item.description}</td>
                    <td>
                      {item.syllabusFile ? (
                        <a href={`http://localhost:5000/uploads/documents/${item.syllabusFile}`} target="_blank" rel="noopener noreferrer">
                          View Syllabus
                        </a>
                      ) : (
                        'No Syllabus File'
                      )}
                    </td>
                    <td>
                      <div className='d-flex'>
                        <Button className='text-white border-0 btn-success' onClick={() => handleUpdate(item._id)}>Update</Button>
                        <span className='fs-3'>&nbsp;</span>
                        <Button className='text-white border-0 btn-danger' onClick={() => handleDelete(item._id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
      <Row className="mt-4">
        <Col className="text-center">
          <Button className='bgGray text-white border-0' onClick={handleRefresh}>Refresh</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewCourseAdmin;
