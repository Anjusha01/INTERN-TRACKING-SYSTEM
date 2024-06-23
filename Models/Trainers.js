import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialization: {
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

const Trainer = mongoose.model('trainer',trainerSchema);
export default Trainer;