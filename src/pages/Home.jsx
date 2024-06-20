import React from 'react';
import './home.css';
import ViewTrainers from '../components/Home/ViewTrainers';
import ViewCourses from '../components/Home/ViewCourses';
import Intro from '../components/Home/Intro';

const Home = () => {
    return (
        <>

            <Intro />
            <div className="d-flex flex-column align-items-center bgGray py-4">

                <div className="mb-5">
                    <h5 className="heading">Our Courses</h5>
                    <ViewCourses />
                </div>
                <div className="mb-5">
                    <h5 className="heading">Our Trainers</h5>
                    <ViewTrainers />
                </div>
            </div>
        </>
    );
};

export default Home;
