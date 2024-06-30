import express from "express";
import { assignTask, updateTaskMark, viewAssignedInterns, viewProfile, viewTasks, viewTrainer, viewTrainersNameList } from "../Controllers/TrainerController.js";
import verifyToken from "../Middlewares/TokenVerification.js";


const router=express.Router();

router.get('/viewProfile/:profileId',verifyToken,viewProfile)
router.get('/viewTrainers',viewTrainer)
router.get('/viewTrainersNameList',viewTrainersNameList)
router.get('/viewAssignedInterns/:id',viewAssignedInterns)
router.post('/assignTask',assignTask);
router.get('/viewTasks/:id',viewTasks)
router.post('/updateMark',updateTaskMark)

export default router;