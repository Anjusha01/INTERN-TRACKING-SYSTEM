import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({
    courseName:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    syllabusFile:{
        type:String
    },
    imageFile:{
        type: String,
        required:true
    }
})

const Course = mongoose.model('course',courseSchema)
export default Course;