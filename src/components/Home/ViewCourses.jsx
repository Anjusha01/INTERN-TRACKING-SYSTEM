import React, { useEffect, useState } from 'react';
import CardComp from './CardComp';
import axios from 'axios';

const ViewCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        let fetchData = async () => {
            let response = await axios.get('http://localhost:5000/course/viewCourseDetails');
            setCourses(response.data);
            console.log(response.data);
        }
        fetchData();
    }, []);

    const truncateText = (text, maxLength) => {
        maxLength = 50; // Adjust the maxLength as needed
        if (!text) return ''; // Return an empty string if text is undefined or null
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className='d-flex justify-content-center'>
            {courses.map((course, index) => (
                <CardComp
                    key={index}
                    cardTitle={course.courseName}
                    cardText={course.description}
                    cardImg={`http://localhost:5000/uploads/images/${course.imageFile}`}
                    imgClass={`rounded-0`}
                    truncateText={true} // Apply truncation and "Read More" link only in this component
                />
            ))}
        </div>
    );
}

export default ViewCourses;
