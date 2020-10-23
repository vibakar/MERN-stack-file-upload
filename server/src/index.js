require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const auth = require("./routes/auth");

const app = express();

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,authorization');
  res.header('Access-Control-Expose-Headers', 'Authorization');
  next();
}

app.use(bodyParser.json({ limit: "10mb" }));
app.use(allowCrossDomain);

auth(app);

app.listen(8080, () => {
  console.log("Server up and running at localhost:8080");
});
