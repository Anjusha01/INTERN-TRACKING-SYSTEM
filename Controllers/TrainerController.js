import Course from "../Models/Courses.js";
import Intern from "../Models/Interns.js";
import Task from "../Models/Task.js";
import Trainer from "../Models/Trainers.js";



export const viewProfile = async (req, res) => {
    let profileId = req.params.profileId
    try {
        let response = await Trainer.findOne({ _id: profileId })
        console.log(response);
        res.json(response)
    }
    catch (e) {
        res.status(500).json(e.message)
    }
}

export const viewTrainer = async (req, res) => {
    try {
        let response = await Trainer.find();
        let responseData = []
        for (let trainer of response) {
            let specialization = await Course.findById(trainer.specialization)
            console.log(specialization)
            responseData.push({
                trainers: trainer,
                specializations: specialization
            })
        }

        console.log(response);
        res.json(responseData)
    }
    catch (e) {
        res.status(500).json(e.message)
    }
}

export const viewTrainersNameList = async (req, res) => {
    try {
        const response = await Trainer.find({}, 'name _id');
        res.json(response);
    }
    catch (e) {
        res.status(500).json(e.message)
    }
}


export const viewAssignedInterns = async (req, res) => {
    let trainerId = req.params.id
    console.log(trainerId);
    try {
        let response = await Intern.find({ trainerId: trainerId })
        let responseData = []
        for (let intern of response) {
            let courses = await Course.findById(intern.course)
            console.log(courses, 'courses');
            responseData.push({
                interns: intern,
                courses: courses
            })

        }

        res.json(responseData)
    }
    catch (e) {
        res.status(500).json(e.message)
    }
}

export const assignTask = async (req, res) => {
    const { selectedInterns, formData } = req.body;
    console.log(req.body);

    try {
        const newTask = new Task({
            interns: selectedInterns.map(({ internId }) => ({
                internId,
                answer: '', // Default value for answer
                mark: '' // Default value for mark
            })),
            question: formData.question,
            notes: formData.notes,
            file: formData.file,
            link: formData.link,
            deadline: formData.deadline,
            trainerId: formData.trainerId,
            totalMark:formData.totalMark
        });

        const taskResponse = await newTask.save();
        console.log(taskResponse);
        res.status(200).json(taskResponse);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


export const viewTasks = async (req, res) => {
    const { id } = req.params
    try {
        let response = await Task.find({ trainerId: id })
        console.log(response);
        res.json(response)
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}
/////////////////view task by populating all the details//////////////////////////////////////////
export const viewTaskById=async(req,res)=>{
    const { taskId } = req.params;
    console.log(taskId);
    try {
        const task = await Task.findById(taskId).populate({
            path: 'interns.internId',
            model: 'intern',
            select: 'name course dateJoined email',
            populate: {
                path: 'course',
                model: 'course',
                select: 'courseName' // Specify the field to populate from the Course model
            }
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        console.log(task);

        res.json(task);
    } catch (error) {
        console.error('Error fetching task details:', error);
        res.status(500).json({ message: 'Server error' });
    }

}


export const updateTaskMark = async (req, res) => {
    const { internId, mark, taskId } = req.body;
    try {
        let task = await Task.findById(taskId);
        
        let internToUpdate = task.interns.find(intern => intern.internId.toString() === internId);
        internToUpdate.mark = mark;
        await task.save();
        res.status(200).json({ message: 'Task mark updated successfully', task });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const updateTask=async(req,res)=>{
    const {taskId}=req.params
    const updatedTask = req.body;

    try {
        const task = await Task.findByIdAndUpdate(taskId, updatedTask, { new: true });
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.json(task);
    } catch (error) {
        res.status(500).send('Error updating task: ' + error.message);
    }
    
}

export const deleteTask=async(req,res)=>{
    console.log(req.params);
    const {taskId}=req.params
    try{
        await Task.findByIdAndDelete(taskId)
        res.status(200).json({ message: 'Task deleted successfully'});
    }
    catch(e){
        res.status(500).send('Error deleting task: ' + error.message);
    }
}