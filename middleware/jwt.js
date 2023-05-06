const jwt = require("jsonwebtoken");

exports.validateJwt = async (req, res, next) => {
  try {
    // We need to check if token is passed in request or not
    const token = req.headers["access-token"];

    if (!token) {
      return res.status(400).json({ message: "JWT token is required" });
    }

    // We need to verify the token
    jwt.verify(token, process.env.SECRET_KEY , function (err, decoded) {
      if (err) {
        return res.status(400).json({ err: err.message });
      }

      req.body.userId = decoded._id
      next();
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
