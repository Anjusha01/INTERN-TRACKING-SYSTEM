import mongoose from "mongoose";

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: String,
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
    isApproved:{
        type: Boolean,
        default:false
    }
})

const Intern = mongoose.model('intern',internSchema);
export default Intern;