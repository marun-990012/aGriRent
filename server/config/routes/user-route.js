import express from 'express';
// import { checkSchema } from 'express-validator';
import userController from '../../app/controllers/user-controller.js';


const userRoute = express.Router();

//api's for users 
userRoute.post('/register',userController.register);

export default userRoute;
