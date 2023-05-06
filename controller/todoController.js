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
      .populate("updatedBy", "firstName email");

    // if (allTodos.length < 1) {
    if (!allTodos.length) {
      return res.status(400).json({ message: "No Todos found for the user" });
    }

    return res.status(200).json({ allTodos });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    // We need the id for that todo
    const { todoId } = req.params;

    const todo = await Todo.findById(todoId)
      .populate("createdBy", "firstName email lastName")
      .populate("updatedBy", "firstName email");

    // Check if todo exists
    if (!todo) {
      return res.status(400).json({ message: "Todo does not exist" });
    }

    return res.status(200).json({ todo });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    // We need the id for that todo that we want to delete
    const { todoId } = req.params;

    const todo = await Todo.findByIdAndDelete(todoId);

    if (!todo) {
      return res.status(400).json({ message: "Todo does not exist" });
    }

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    // We need the id for that todo that we want to delete
    const { todoId } = req.params;
    let dateToBeStored;
    const { dueDate } = req.body;
    if (dueDate) {
      dateToBeStored = new Date(dueDate).toUTCString();
      req.body.dueDate = dateToBeStored;
    }

    const todoUpdated = await Todo.findByIdAndUpdate(todoId, {
      $set: { ...req.body, updatedBy: req.body.userId }
    });

    if (!todoUpdated) {
      return res.status(400).json({ message: "Todo does not exist" });
    }

    return res.status(200).json({ message: "Todo updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

exports.toggleTodo = async (req, res) => {
  try {
    // We need the id for that todo that we want to delete
    const { todoId } = req.params;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(400).json({ message: "Todo does not exist" });
    }

    const todoUpdated = await Todo.findByIdAndUpdate(todoId, {
      $set: { isCompleted: !todo.isCompleted }
    });

    return res.status(200).json({ message: "Todo updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};
