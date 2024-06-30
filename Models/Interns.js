import mongoose from "mongoose";

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    dateJoined: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    trainerId:{
        type: mongoose.Types.ObjectId,
        ref:'trainer'
    }
});

const Intern = mongoose.model('intern', internSchema);
export default Intern;
