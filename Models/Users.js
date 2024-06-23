import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    userType:{
        type: String,
        required: true
    },
    isApproved:{
        type: Boolean,
        default:false
    }
})

const User= mongoose.model('user',userSchema);
export default User;