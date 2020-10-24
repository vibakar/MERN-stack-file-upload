const Iron = require("@hapi/iron");
const { isLoggedIn } = require("../middleware/auth");
const User = require('../model/User');

const auth = (app) => {
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ success: false, message: "Unauthorized" });
    } else {
      User.findOne({email, password})
      .then(doc => {
        if(doc) return Iron.seal({ email }, process.env.IRON_KEY, Iron.defaults)
        else res.json({ success: false, message: "No user found" });
      })
      .then((token)=> {
        res.setHeader("authorization", token);
        res.json({ success: true, message: "Logged in successfully!" });
      })
      .catch(err => {
        res.json({ success: false, message: err.toString() });
      });
    }
  });

  app.post("/api/register", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ success: false, message: "Unauthorized" });
    } else {
      const role = 'user';
      const user = new User({email, password, role });
      user.save()
      .then(() => Iron.seal({ email, role }, process.env.IRON_KEY, Iron.defaults))
      .then(token => {
        res.setHeader("authorization", token);
        res.json({ success: true, message: "Signed up successfully!" });
      }).catch(err => {
        res.json({ success: false, message: err.toString() });
      });
    }
  });

  app.post("/api/logout", isLoggedIn, (req, res) => {
    res.setHeader("authorization", "");
    res.send({ success: true, message: "Logged out successfully!" });
  });
};

module.exports = auth;
