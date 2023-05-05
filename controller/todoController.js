const Todo = require("../model/Todo");

exports.createTodo = async (req, res) => {
  try {
    // IF you want todos to be unique, you can check for existing

    // Date Format should be YYYY-MM-DD
    const { dueDate } = req.body;

    const dateToBeStored = new Date(dueDate).toUTCString();
    const todoCreated = await Todo.create({
      ...req.body,
      dueData: dateToBeStored,
      createdBy: req.body.userId,
      updatedBy: req.body.userId
    });

    if (!todoCreated) {
      return res.status(400).json({ message: "Todo creation failed" });
    }

    return res.status(200).json({ message: "Todo created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

exports.getTodos = async (req, res) => {
  try {
    // Check if todos are present or not for a user

    const allTodos = await Todo.find({ createdBy: req.body.userId })
    .populate("createdBy", "firstName email lastName")
    .populate("updatedBy", "firstName email")

    // if (allTodos.length < 1) {
    if (!allTodos.length) {
      return res.status(400).json({ message: "No Todos found for the user" });
    }

    return res.status(200).json({allTodos})
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};
