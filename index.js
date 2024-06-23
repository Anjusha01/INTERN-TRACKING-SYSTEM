import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import TrainerRoutes from './Routes/TrainerRoutes.js';
import AdminRoutes from './Routes/AdminRoutes.js'
import CourseRoutes from "./Routes/CourseRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import AuthRoutes from "./Routes/AuthRoutes.js";
import InternRoutes from "./Routes/InternRoutes.js"
// import verifyToken from "./Middlewares/TokenVerification.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ITS')
.then(() => {
    console.log("Database connection established!");
})
.catch(err => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit process on database connection error
});

// Middleware
app.use(express.json({ limit: '160mb' }));
app.use(cors());

// Routes

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/trainer',TrainerRoutes);
app.use('/intern',InternRoutes)
app.use('/admin',AdminRoutes)
app.use('/course',CourseRoutes)
app.use('/auth',AuthRoutes)


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
