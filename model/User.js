const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    role: {
      type: String,
      default: "user"
    }
  },
  {
    timestamps: true
  }
);


const User = mongoose.model("User", userSchema)
module.exports = User

