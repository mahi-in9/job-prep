import { fetchTodos, createTodos } from "../app/slices/todoSlice";

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

  return (
    <div>
      <h1>Todos</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{JSON.stringify(error)}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter todo..."
          value={todoData.title}
          onChange={handleChange}
        />

        <select name="status" value={todoData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button type="submit">Add</button>
      </form>

      {todos && todos.length === 0 && !loading && <p>No todos found</p>}

      {todos?.map((todo) => (
        <div key={todo._id}>
          <p>{todo.title}</p>
          <p>{todo.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Todos;
