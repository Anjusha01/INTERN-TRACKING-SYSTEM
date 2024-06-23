import Trainer from "../Models/Trainers.js";


export const viewProfile= async(req,res) => {
    let username= req.params.username
    try{
        let response= await Trainer.findOne({username:username})
        console.log(response);
        res.json(response)
    }
    catch(e){
        res.status(500).json(e.message)
    }
}