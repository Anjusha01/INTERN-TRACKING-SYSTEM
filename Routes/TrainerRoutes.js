import express from "express";
import { viewProfile } from "../Controllers/TrainerController.js";

const router=express.Router();

router.get('/viewProfile/:username',viewProfile)

export default router;