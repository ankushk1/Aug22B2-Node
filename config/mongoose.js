require('dotenv').config()
const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/aug22B2DB");
mongoose.connect(process.env.MONGODB_STRING);

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Error connecting to DB", err);
});

db.once("open", () => {
  console.log("successfully connected to DB");
});
