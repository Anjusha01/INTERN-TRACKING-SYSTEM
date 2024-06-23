import express from "express";
import { viewProfile } from "../Controllers/InternController.js";
import verifyToken from "../Middlewares/TokenVerification.js";

const router=express.Router();
router.get('/viewProfile/:username',viewProfile);

export default router;