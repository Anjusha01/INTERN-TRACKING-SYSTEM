import express from "express";
import { AddCourse, assignTrainer, deleteCourse, internDelete, trainerDelete, updateCourses, updateInternStatus, updateTrainerStatus } from '../Controllers/AdminController.js'
import upload from "../Middlewares/upload.js";

const router=express.Router();

router.post('/addCourse', upload.fields([{ name: 'syllabusFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]), AddCourse);
router.delete('/deleteCourse/:id',deleteCourse);
router.put('/updateCourse/:id',upload.fields([{ name: 'syllabusFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]),updateCourses);
router.patch('/updateTrainerStatus',updateTrainerStatus);
router.patch('/updateInternStatus',updateInternStatus)
router.delete('/deleteTrainer/:id',trainerDelete);
router.delete('/deleteIntern/:id',internDelete)
router.patch('/assignTrainer',assignTrainer)

export default router