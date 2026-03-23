import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/authSlice";
import todoReducer from "./slices/todoSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todoReducer,
  },
});
