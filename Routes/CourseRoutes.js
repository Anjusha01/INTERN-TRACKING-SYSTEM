import express from 'express'
import { displayCourseDetails, displayCourseName, viewCourseDetailById } from '../Controllers/CourseController.js';

const router=express.Router();

router.get('/viewCourseName',displayCourseName)
router.get('/viewCourseDetails',displayCourseDetails)
router.get('/viewCourseByName/:id',viewCourseDetailById)
export default router;