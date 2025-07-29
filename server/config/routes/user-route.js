import express from 'express';
// import { checkSchema } from 'express-validator';
import userController from '../../app/controllers/user-controller.js';
import authentication from '../../app/middlewares/authentication.js';


const userRoute = express.Router();

//api's for users 
userRoute.post('/register',userController.register);
userRoute.post('/verify',userController.verifyAccount);
userRoute.post('/login',userController.login);
userRoute.post('/forgot-password',userController.forgotPassword);
userRoute.post('/reset-password',userController.resetPassword);
userRoute.get('/account',authentication,userController.account);
userRoute.post('/profile-image',authentication,userController.updateProfileImage);
userRoute.post('/update-profile',authentication,userController.updateProfile);

export default userRoute;
