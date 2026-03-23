import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis/api";

export const fetchTodos = createAsyncThunk(
  "Todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const res = await api.get(`/api/todos`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const createTodos = createAsyncThunk(
  "todo/createTodo",
  async (todoData, thunkAPI) => {
    try {
      const res = await api.post(`/api/todos`, todoData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/api/todos/${id}`, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const deletetodo = createAsyncThunk(
  "Todos/deletetodo",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/api/todos/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todos = action.payload.todos;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload.todo);
      })
      .addCase(createTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload.todo;

        const index = state.todos.findIndex(
          (todo) => todo._id === updatedTodo._id,
        );

        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      })

      .addCase(deletetodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
