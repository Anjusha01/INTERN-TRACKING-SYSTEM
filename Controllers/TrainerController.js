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