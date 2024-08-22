/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useTodo } from "../contexts";

const TodoForm = () => {
  const [todo, setTodo] = useState("");

  const { addTodo } = useTodo();

  const addNewTodo = (e) => {
    e.preventDefault();

    if (!todo) return;

    addTodo({ task: todo, completed: false });
    setTodo("");
  };

  return (
    <form className="flex" onSubmit={addNewTodo}>
      <input
        type="text"
        placeholder="Write to-do"
        className="w-full border-2 rounded-l-md py-1 px-3 bg-white/80 text-gray-700 text-xl outline-none"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="text-white text-xl font-semibold bg-green-400 py-1 px-3 rounded-r-md shrink-0"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
