import express from "express";
import { AddCourse, deleteCourse, updateCourses } from '../Controllers/AdminController.js'
import upload from "../Middlewares/upload.js";

const router=express.Router();

router.post('/addCourse', upload.fields([{ name: 'syllabusFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]), AddCourse);
router.delete('/deleteCourse/:id',deleteCourse);
router.put('/updateCourse/:id',upload.fields([{ name: 'syllabusFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]),updateCourses);

export default router