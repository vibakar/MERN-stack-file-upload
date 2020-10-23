const mongoose = require("mongoose");
const config = require("../config");

const url = `mongodb+srv://${config.db.userName}:${config.db.password}@cluster0.743kn.mongodb.net/${config.db.dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((resp) => {
    console.log("Connected to mongo db");
  })
  .catch((err) => {
    console.log(err, "Error connecting to mongo db");
  });
