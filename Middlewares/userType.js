import User from "../Models/Users.js"

export const isAdmin= async(req,res,next)=>{
    try{
        const user= await User.findById(req.user.id)
        if(user.userType !== 'admin'){
            return res.status(403).json("Access denied");
        }
        next();
    }
    catch(e){
        res.status(500).json({ message: "Server Error", error: e.message });
    }
}