const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const userRoutes = require("./routes/userRoutes");

app.use(bodyParser.json());
app.use("/user", userRoutes);
// app.get('/home', (req, res) => {
//   res.send('<h1>NodeJS server running</h1>')
// })

// app.post('/getInfo/:name/:id', (req, res) => {
//   console.log(req.body);
//   return res.json(req.body);
// })

let userArr = [
  {
    id: Math.floor(Math.random() * 1000),
    name: "user 1"
  }
];

app.get("/getUsers", (req, res) => {
  return res.json({ userArr });
});

app.post("/createUser", (req, res) => {
  // Check if user with the name coming from req.body.username
  // is already there
  const userExists = userArr.find((elem) => elem.name === req.body.username);

  if (userExists) {
    return res.json({ message: "User already exists" });
  }

  const newUser = {
    id: Math.floor(Math.random() * 1000),
    name: req.body.username
  };

  userArr.push(newUser);

  return res.json({ message: "User added successfully" });
});

app.delete("/deleteUser/:id", (req, res) => {
  // splice( index, deleteCount = 1)
  const userIdFromParams = req.params.id;
  // const userIndex = userArr.findIndex((elem) => elem.id == userIdFromParams);
  // console.log(userIndex);
  // if (userIndex === -1) {
  //   res.json({ message: "User not found" });
  // }

  // userArr.splice(userIndex, 1);

  const filteredArr = userArr.filter((elem) => elem.id != userIdFromParams);

  userArr = filteredArr;
  res.json({ message: "User deleted successfully" });
});

app.put("/updateUser/:id", (req, res) => {
  const userIdFromParams = req.params.id;
  const userIndex = userArr.findIndex((elem) => elem.id == userIdFromParams);

  if (userIndex == -1) {
    res.json({ message: "User not found" });
  }

  userArr[userIndex] = {
    id: Number(userIdFromParams),
    name: req.body.username
  };

  return res.json({ message: "user updated" });
});

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
