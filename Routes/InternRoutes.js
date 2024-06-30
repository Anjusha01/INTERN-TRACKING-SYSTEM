import express from "express";
import { viewInterns, viewProfile, viewTaskByIntern } from "../Controllers/InternController.js";
import verifyToken from "../Middlewares/TokenVerification.js";

const router=express.Router();
router.get('/viewProfile/:profileId',viewProfile);
router.get('/viewInterns',viewInterns)
router.get('/viewTask/:id',viewTaskByIntern)


export default router;