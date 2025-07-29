import jwt from 'jsonwebtoken';

function authentication(req,res,next){
    const token = req.headers['authorization'];
    try{
    if(!token){
        return res.status(401).json({error:"Token is required"});
    }
    const tokenData = jwt.verify(token,'Secret@123');
    req.userId = tokenData.userId;
    req.role = tokenData.role;
    next();
    }catch(error){
        return res.status(401).json({error:error.message});
    }
}
export default authentication;





