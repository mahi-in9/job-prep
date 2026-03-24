import { fetchTodos, createTodos, deletetodo } from "../app/slices/todoSlice";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function Todos() {
  const dispatch = useDispatch();

  const { todos, loading, error } = useSelector((state) => state.todos);
  const { user } = useSelector((state) => state.user);

  const [todoData, setTodoData] = useState({
    title: "",
    status: "pending",
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchTodos());
    }
  }, [dispatch, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todoData.title.trim()) return;

    dispatch(
      createTodos({
        title: todoData.title,
        status: todoData.status,
      }),
    );

    setTodoData({
      title: "",
      status: "pending",
    });
  };

  const handleDelete = (id) => {
    const confirmData = window.confirm(
      "Are you sure you wan to delete this movie from your database",
    );

    if (confirmData) {
      dispatch(deletetodo(id));
    }
  };
  2;

  return (
    <div>
      <h1 className="text-2xl font-bold m-2">Todos</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{JSON.stringify(error)}</p>}

      <form onSubmit={handleSubmit} className="flex m-3 gap-3">
        <input
          type="text"
          name="title"
          placeholder="Enter todo..."
          value={todoData.title}
          onChange={handleChange}
          className="border rounded"
        />

        <select
          name="status"
          value={todoData.status}
          onChange={handleChange}
          className="border rounded"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button type="submit" className="border rounded hover:bg-mist-300 px-2">
          Add
        </button>
      </form>

      {todos && todos.length === 0 && !loading && <p>No todos found</p>}

      <div className="grid grid-cols-5">
        {todos?.map((todo) => (
          <div key={todo._id} className="border rounded m-3 py-3 px-1">
            <p>Title: {todo.title}</p>
            <p>Status: {todo.status}</p>
            <button
              onClick={() => handleDelete(todo._id)}
              className="border rounded p-1 mt-2 mx-16"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todos;
