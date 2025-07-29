import crypto from 'crypto';
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import User from "../models/user-model.js";

const userController = {};

// user Registration controller
userController.register = async (req, res) => {
  const {name,email,password,userType,passcode} = req.body;
  
console.log(name)
  
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

// user account verification
userController.verifyAccount = async(req,res)=>{
  try {
      const {code,email}=req.body 
      const user = await User.findOne({ email, verificationToken: code });
      if (!user) {
          return res.status(400).json({success:false,message:"Inavlid or Expired Code"})      
      }
    
    user.isVerified = true;
    user.verificationToken=undefined;
    await user.save()
    
   return res.status(200).json({success:true,message:"Email Verifed Successfully"})
         
  } catch (error) {
      return res.status(500).json({success:false,message:"internal server error"})
  }
};

// user login controller
userController.login = async (req, res) => {
  const { password, email } = req.body;
  
  try {
    const user = await User.findOne({ email: email });
    // console.log(user)
    if (!user) {
      return res.status(404).json({ message: "invalid email or password" });
    }

    if(!user.isVerified){
      return res.status(403).json({message:"please verify your account!"});
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    
    if (!isMatch) {
        return res.status(404).json({ message: "invalid email or password" });
    }
    
    const tokenData = { userId: user._id, role: user.userType };
    
    const token = jsonwebtoken.sign(tokenData, 'Secret@123', {
        expiresIn: "7d",
    });
    console.log(token)

    await user.save();
    return res.json({ token: token });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};


userController.forgotPassword = async(req,res)=>{
  const {email} = req.body;
  try{
     const user = await User.findOne({email});
     if(!user){
      return res.status(404).json({error:"userr not found"});
     }

     // Generate a secure random token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetUrl = `localhost/${resetToken}`; 
    //   sendResetPasswordEmail({resetUrl,email:user.email,resetUrl});
    console.log(resetUrl);

     // Hash it before storing in DB for security
      const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

     // Set expiry time (e.g., 15 minutes from now)
      const tokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins

     // Save to user document (example)
      user.passwordResetToken = hashedToken;
      user.passwordResetExpires = tokenExpiry;

      await user.save();
      return res.json({success:true,message:`reset token has be sent your ${user.email}`});

  }catch(error){
    return res.status(500).json({success:false,message:"internal server error"})
  }
}


//reset password
userController.resetPassword = async(req,res)=>{
  const { token, newPassword,email } = req.body;
  try {
      // Hash token to match what was stored
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        // Find user with matching token and check expiry
        const user = await User.findOne({
            email,
           passwordResetToken: hashedToken,
           passwordResetExpires: { $gt: Date.now() }
         });

      if (!user) {
        return res.status(400).json({ error: "Invalid or expired token" });
      }

      // Update password and clear reset fields
       const salt = await bcryptjs.genSalt();
       const hashedPassword = await bcryptjs.hash(newPassword,salt);
       user.password = hashedPassword;
       user.passwordResetToken = undefined;
       user.passwordResetExpires = undefined;
       await user.save();
       return res.json({success:true,message:'password chenged succefully'})
  } catch (error) {
    return res.status(500).json({success:false,message:"internal server error"})
  }
}

//account controller
userController.account = async (req, res) => {
   try{
    const user = await User.findById(req.userId);
    return res.json(user);
   }catch(error){
    return res.status(500).json({ error: "Something went wrong" });
   }
};


//profile image update controller
userController.updateProfileImage = async(req,res)=>{
    const {imageUrl} = req.body;
    try{
        const user = await User.findByIdAndUpdate(req.userId,{profileImage:imageUrl},{new:true});
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
       return res.json(user);
    }catch(error){
        return res.status(500).json({ error: "Something went wrong" });
    }
};


//profile update controller
userController.updateProfile = async(req,res)=>{
    const {bio,name,phoneNumber} = req.body;
    try{
        
      const user = await User.findByIdAndUpdate(req.userId,{bio,name,phoneNumber},{new:true});
      if(!user){
         return res.status(404).json({message:"user not found"});
      }
            return res.json(user);
    }catch(error){
        return res.status(500).json({ error: "Something went wrong" });
    }
};


export default userController;