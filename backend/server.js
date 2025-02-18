import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import cookieParser from 'cookie-parser';

import adminRouter from './routes/adminRoutes.js';
import authRouter from './routes/authRoutes.js';
import studentRouter from './routes/studentRoutes.js';
import doctorRouter from './routes/doctorRoutes.js';
import teacherRouter from './routes/teacherRoutes.js';

dotenv.config()

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))     
    .catch((err) => console.log(err)) 

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        // origin : "http://localhost:5173",
        methods : ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders : [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials : true
    })
);



app.use("/api/auth", authRouter); 
app.use("/api/admin", adminRouter);
app.use("/api/student", studentRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/teacher", teacherRouter);

app.get("/api/test", (req, res) => {
    res.status(200).json({ message: "API is working!" });
});

app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)
)
