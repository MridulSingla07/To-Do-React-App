/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});
/* to define the information to be passed on as context */

export const useTodo = () => {
  return useContext(TodoContext);
};
/* useContext to access and use the TodoContext anywhere */

export const TodoProvider = TodoContext.Provider;
/* context provider to provide access to context */
