const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    todoItem: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    dueDate: {
      type: Date
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
