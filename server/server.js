import express from "express";
const app = express();
const port = 3060;

//******* importing third party modules or packages
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

// importing config files
// import connectDb from './config/db.js';
import connectDb from "./config/db-connection/db.js";

// importing routes
import userRoute from "./config/routes/user-route.js";

//application level middleware 
app.use(express.json()); // Parse incoming JSON bodies
app.use(cors());  //to avoide cors error

//api for users 
app.use('/api/auth',userRoute);


app.listen(port,()=>{
    connectDb();
    console.log('server is runni on port', port);
})