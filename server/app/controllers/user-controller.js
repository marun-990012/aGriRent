import crypto from 'crypto';
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import User from "../models/user-model.js";


const userController = {};


// user Registration controller
userController.register = async (req, res) => {
 
  const {name,email,password,userType,passcode} = req.body;
  
  try {
    const user = new User({name,email,password,userType});
    if (userType == "user" || userType == "admin") {
      user.isActive = true;
    } else {
      user.isActive = false;
      user.requested=true;
    }
    
    if (user.userType === "admin" && passcode != 'AdminPass') {
      return res.status(401).json({ message: "Passcode required for admin or enter correct passcode" });
    }

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    user.password = hashedPassword;
    const verificationToken= Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationToken=verificationToken;
    console.log(verificationToken);
    await user.save();
    
    return res.status(201).json(user);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Something went wrong" });
  }
};


export default userController;