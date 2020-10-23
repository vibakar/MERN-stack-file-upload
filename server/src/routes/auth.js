const Iron = require("@hapi/iron");
const { userExists, createUser } = require("../lib/users");
const { isLoggedIn } = require("../middleware/auth");
const User = require('../model/User');

const auth = (app) => {
  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ success: false, message: "Unauthorized" });
    } else {
      if (!userExists(email, password)) {
        res.json({ success: false, message: "No user found" });
      }
      const token = await Iron.seal(
        { email },
        process.env.IRON_KEY,
        Iron.defaults
      );
      res.setHeader("authorization", token);
      res.json({ success: true, message: "Logged in successfully!" });
    }
  });

  app.post("/api/register", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ success: false, message: "Unauthorized" });
    } else {
      const user = new User({email: email, password: password, role: 'user' });
      user.save()
      .then(() => Iron.seal({ email }, process.env.IRON_KEY, Iron.defaults))
      .then(token => {
        res.setHeader("authorization", token);
        res.json({ success: true, message: "Signed up successfully!" });
      }).catch(err => {
        res.json({ success: false, message: err.toString() });
      })
    }
  });

  app.post("/api/logout", isLoggedIn, (req, res) => {
    res.setHeader("authorization", "");
    res.send({ success: true, message: "Logged out successfully!" });
  });
};

module.exports = auth;
