const express = require("express");
const { validateJwt } = require("../middleware/jwt");
const { createTodo, getTodos } = require("../controller/todoController");


const router = express.Router();


router.post("/createTodo", validateJwt, createTodo)
router.get("/getTodos", validateJwt, getTodos)


module.exports = router;
