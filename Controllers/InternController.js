import Course from "../Models/Courses.js";
import Intern from "../Models/Interns.js"

// export const viewProfile= async(req,res) => {
//     let profileId= req.params.profileId
//     try{
//         let response= await Intern.findOne({_id:profileId})
//         console.log(response);
//         res.json(response)
//     }
//     catch(e){
//         res.status(500).json(e.message)
//     }
// }


export const viewProfile = async (req, res) => {
    let profileId = req.params.profileId;
    console.log(profileId);
    try {
        // Use populate to get the course name
        let response = await Intern.findOne({ _id: profileId }).populate('course', 'courseName');
        console.log(response);
        res.json(response);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}


export const viewInterns= async(req,res)=>{
    try{
        let response= await Intern.find();
        let responseData=[]
        for(let intern of response){
            let courses=await Course.findById(intern.course)
            console.log(courses,'courses');
            responseData.push({
                interns:intern,
                courses:courses
            })

        }
        console.log(response);
        res.json(responseData)
    }
    catch(e){
        res.status(500).json(e.message)
    }
}

export const viewTaskByIntern=async(req,res)=>{
    // const id=req.params.id
    console.log(req.params.id);
    try{
        
    }
    catch(e){

    }
}