// Controllers/CourseController.js

import Course from '../Models/Courses.js';

export const displayCourseName = async (req, res) => {
    try {
        const courses = await Course.find({}, '_id courseName');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const displayCourseDetails = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const viewCourseDetailById=async(req,res)=>{
    let {id}=req.params;
    try{
        const courses= await Course.findById(id)
        res.json(courses);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}