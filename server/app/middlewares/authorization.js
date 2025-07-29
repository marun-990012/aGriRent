import User from "../models/user-model.js";
function authorization(permittedRoute) {
  return async (req, res, next) => {
    try {
      // We fetch the user from the database to ensure the user still exists.
      // This prevents access using a valid token after the user has been deleted.
      const user = await User.findById(req.userId);
      
      if (permittedRoute.includes(req.role) && user) {
        next();
      } else {
        return res.status(403).json({ error: "unAuthorized access" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong from authorization middleware" });
    }
  };
}

export default authorization;



