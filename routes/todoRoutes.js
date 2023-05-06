const express = require("express");
const { validateJwt } = require("../middleware/jwt");
const {
  createTodo,
  getTodos,
  getTodoById,
  deleteTodo,
  updateTodo,
  toggleTodo
} = require("../controller/todoController");

const router = express.Router();

router.post("/createTodo", validateJwt, createTodo);
router.get("/getTodos", validateJwt, getTodos);
router.get("/getTodoById/:todoId", validateJwt, getTodoById);
router.delete("/deleteTodo/:todoId", validateJwt, deleteTodo);
router.put("/updateTodo/:todoId", validateJwt, updateTodo);
router.put("/toggleTodo/:todoId", validateJwt, toggleTodo);

module.exports = router;
