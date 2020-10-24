const Iron = require("@hapi/iron");
const User = require('../model/User');

const isLoggedIn = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.send({ success: false, message: "Missing authorization token" });
  } else {
    const token = authorization.split(" ")[1];
    if (!token) {
      res.send({ success: false, message: "Invalid authorization token" });
    }
    try {
      const { email, role } = await Iron.unseal(
        token,
        process.env.IRON_KEY,
        Iron.defaults
      );
      const validUser = userExists(email);
      if (validUser) {
        req.email = email;
        req.role = role;
        next();
      } else {
        res.send({ success: false, message: "Invalid authorization token" });
      }
    } catch (error) {
      console.error(error.message);
      res.send({ success: false, message: "Invalid authorization token" });
    }
  }
};

const userExists = async (email) => {
  return await User.findOne({email});
}

module.exports = {
  isLoggedIn,
};
