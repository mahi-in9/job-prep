const Todos = require("../models/todos.model");

async function getAllTodos(req, res) {
  try {
    const todos = await Todos.find({ user: req.user.id });

    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
}

async function createTodo(req, res) {
  try {
    const { title, status } = req.body;

    if (!title || !status) {
      return res.status(400).json({
        success: false,
        message: "Title and status are required",
      });
    }

    const todo = await Todos.create({
      title,
      status,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create todo",
      error: error.message,
    });
  }
}

async function updateTodo(req, res) {
  try {
    const { id } = req.params;

    const todo = await Todos.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true },
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update todo",
      error: error.message,
    });
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.params;

    const todo = await Todos.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete todo",
      error: error.message,
    });
  }
}

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
