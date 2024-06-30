import Course from "../Models/Courses.js";
import Intern from "../Models/Interns.js";
import Trainer from "../Models/Trainers.js"
import User from "../Models/Users.js"


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


export const updateTrainerStatus = async (req, res) => {
  const { id, isApproved } = req.body;
  console.log(req.body);
  console.log(id);

  try {
    let updatedTrainerStatus = await Trainer.updateOne({ _id: id }, { $set: { isApproved } });
    
    let trainer = await Trainer.findOne({ _id: id });
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    const { username } = trainer;
    

    // Update User collection based on username
    let updatedUserStatus = await User.updateOne({ username: username }, { $set: { isApproved } });

    if (updatedTrainerStatus.modifiedCount === 0 || updatedUserStatus.modifiedCount === 0) {
      return res.status(404).json({ message: 'Trainer not found or no change in status' });
    }
    console.log(updatedTrainerStatus, updatedUserStatus);

    res.status(200).json({ message: 'Trainer status updated successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateInternStatus = async (req, res) => {
    const { id, isApproved } = req.body;
    console.log(req.body);
  
    try {
      let updatedInternStatus = await Intern.updateOne({ _id: id }, { $set: { isApproved } });
      
      let intern = await Intern.findOne({ _id: id });
      if (!intern) {
        return res.status(404).json({ message: 'Trainer not found' });
      }
      const {_id } = intern;
      
  
      // Update User collection based on username
      let updatedUserStatus = await User.updateOne({ profileId: _id }, { $set: { isApproved } });
      
  
      if (updatedInternStatus.modifiedCount === 0 || updatedUserStatus.modifiedCount === 0) {
        return res.status(404).json({ message: 'Trainer not found or no change in status' });
      }
      console.log(updatedInternStatus, updatedUserStatus);
  
      res.status(200).json({ message: 'Intern status updated successfully' });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
  

  export const trainerDelete = async (req, res) => {
    const id = req.params.id;
    try {
      const deletedTrainer = await Trainer.findByIdAndDelete(id);
      const deletedUser = await User.findOneAndDelete({ profileId: id });
      res.status(200).json({ message: 'Trainer and user deleted successfully' });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

export const internDelete = async (req, res) => {
  const id = req.params.id;
  
  try {
    // Delete the intern
    const deletedIntern = await Intern.findByIdAndDelete(id);

    if (!deletedIntern) {
      return res.status(404).json({ message: 'Intern not found' });
    }

    // Delete the corresponding user
    const deletedUser = await User.findOneAndDelete({ profileId: id });

    if (!deletedUser) {
      // Since user deletion is not critical in this context, handle it gracefully
      console.log(`User with profileId ${id} not found.`);
    }

    res.status(200).json({ message: 'Intern and corresponding user deleted successfully' });
  } catch (e) {
    console.error(`Error deleting intern with id ${id}:`, e);
    res.status(500).json({ message: e.message });
  }
};


export const assignTrainer = async (req, res) => {
  console.log(req.body);
  const updates=req.body
  console.log(updates);

  try {
    for (const update of updates) {
      await Intern.findByIdAndUpdate(update._id, { trainerId: update.trainerId });
    }

    res.status(200).json({ message: 'Trainers assigned successfully' });
   
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
