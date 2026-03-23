const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todosController");
const authMiddleware = require("../middlewares/authMiddleware");

const express = require("express");

const router = express.Router();

router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getAllTodos);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

module.exports = router;
