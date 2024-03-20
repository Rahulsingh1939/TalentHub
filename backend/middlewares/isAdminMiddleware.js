const User = require("../models/user");

const isAdminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user.isAdmin) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

module.exports = isAdminMiddleware;
