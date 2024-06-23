import Course from "../Models/Courses.js";


export const AddCourse = async (req, res) => {
    try {
        const { courseName, description } = req.body;
        const existingCourse = await Course.findOne({ courseName });

        if (existingCourse) {
            return res.status(400).json({ message: 'Course with this name already exists' });
        }

        const syllabusFile = req.files.syllabusFile ? req.files.syllabusFile[0].filename : null;
        const imageFile = req.files.imageFile ? req.files.imageFile[0].filename : null;

        const newCourse = new Course({ courseName, description, syllabusFile, imageFile });
        const response = await newCourse.save();
        console.log(response);

        res.status(201).json({ message: 'Course added successfully', data: response });
    } catch (error) {
        console.error('Error adding course:', error.message);
        res.status(500).json({ message: 'Failed to add course' });
    }
};




export const deleteCourse=async(req,res)=>{
    let id= req.params.id;
    try {
        const response = await Course.findByIdAndDelete(id);
        res.json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}



export const updateCourses = async (req, res) => {
    const id = req.params.id;
    try {
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Update course fields based on request body
        course.courseName = req.body.courseName;
        course.description = req.body.description;

        // Update syllabusFile and imageFile if provided in request
        if (req.files && req.files.syllabusFile) {
            course.syllabusFile = req.files.syllabusFile[0].filename;
        }
        if (req.files && req.files.imageFile) {
            course.imageFile = req.files.imageFile[0].filename;
        }

        // Save updated course
        const updatedCourse = await course.save();
        res.json({ message: 'Course updated successfully', data: updatedCourse });
    } catch (error) {
        console.error('Error updating course:', error.message);
        res.status(500).json({ message: 'Failed to update course' });
    }
};

export const Approval=()=>{
    
}


