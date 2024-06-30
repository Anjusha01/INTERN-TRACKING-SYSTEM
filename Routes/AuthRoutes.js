import express from "express";
import {trainerRegisterAuth,  adminRegisterAuth, authLogin, internRegisterAuth, tokenAuth } from "../Controllers/AuthController.js";
import verifyToken from "../Middlewares/TokenVerification.js";

const router=express.Router();
router.post('/trainer/register',trainerRegisterAuth)
router.post('/intern/register',internRegisterAuth)
router.post('/admin/register',adminRegisterAuth)
router.post('/login',authLogin)
router.get('/auth/:id',verifyToken,tokenAuth);


export default router