const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/aug22B2DB");

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Error connecting to DB", err);
});

db.once("open", () => {
  console.log("successfully connected to DB");
});
