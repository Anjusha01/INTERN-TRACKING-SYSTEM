import mongoose from "mongoose";

const internSchema = new mongoose.Schema({
    internId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'intern', // Assuming there is an Intern model
        required: true
    },
    answer: {
        type: String,
        default: '' // Providing a default value
    },
    mark: {
        type: Number,
        default: 0 // Providing a default value
    }
}, { _id: false }); // Prevent creation of _id for subdocuments

const taskSchema = new mongoose.Schema({
    interns: [internSchema],
    question: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    file: {
        type: String
    },
    link: {
        type: String
    },
    deadline: {
        type: String,
        required: true
    },
    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trainer'
    },
    totalMark:
    {
        type: Number,
        required:true
    }

});

const Task = mongoose.model('Task', taskSchema);
export default Task;
