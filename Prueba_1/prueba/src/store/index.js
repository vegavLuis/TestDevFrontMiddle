import { configureStore } from "@reduxjs/toolkit";
import users from "./usersSlice";
import posts from "./postsSlice";
import todos from "./todosSlice";

export const store = configureStore({ reducer: { users, posts, todos } });
