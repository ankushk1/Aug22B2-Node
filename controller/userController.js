const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    //Check if user already exists
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Before creating user, we need to encrypt password
    const encPass = bcrypt.hashSync(req.body.password, saltRounds);

    const newUser = await User.create({ ...req.body, password: encPass });
    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    // Check if user is signedup or not?
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Invalid user/ signup first" });
    }

    // Check if password matches from DB.
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const { _id, firstName, email } = user;
    const token = jwt.sign({ _id, firstName, email }, process.env.SECRET_KEY, {
      expiresIn: "2h"
    });

    return res.json({ token, message: "Signin Successfull" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
