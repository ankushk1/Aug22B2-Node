const User = require("../model/User");

exports.signup = async (req, res) => {
  try {
    //Check if user already exists
    const user = await User.findOne({ email: req.body.email });
    console.log("-----> ", user);

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create(req.body);
    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
