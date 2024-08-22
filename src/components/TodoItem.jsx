/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useRef } from "react";
import { useState } from "react";
import { useTodo } from "../contexts";

function TodoItem({ todo }) {
  const [isTodoEditable, setisTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.task);
  const { toggleComplete, deleteTodo, updateTodo } = useTodo();

  const inputRef = useRef(null);

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, task: todoMsg });
    setisTodoEditable(false);
  };
  const onToggle = () => {
    toggleComplete(todo.id);
  };

  const deleteAction = () => {
    deleteTodo(todo.id);
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      editTodo();
    }
  };

  return (
    <>
      <div
        className={`flex border rounded-lg px-3 py-1.5 gap-x-3 shadow-md duration-300 text-black ${
          todo.completed ? "bg-green-300" : "bg-slate-100"
        }`}
      >
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={todo.completed}
          onChange={onToggle}
        />
        <input
          type="text"
          ref={inputRef}
          className={`border rounded-lg outline-none w-full bg-transparent px-3 py-1 ${
            isTodoEditable ? "border-black/40" : "border-transparent"
          } ${todo.completed ? "line-through" : ""}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          onKeyDown={handleEnter}
          readOnly={!isTodoEditable}
        />
        <button
          className="w-20 px-2 py-0.5 rounded-lg text-sm border border-black/10 bg-gray-50 hover:bg-gray-100 disabled:opacity-80"
          onClick={() => {
            if (todo.completed) return;

            if (isTodoEditable) {
              editTodo();
            } else {
              setisTodoEditable((prev) => !prev);
              inputRef.current.focus();
            }
          }}
          disabled={todo.completed}
        >
          {isTodoEditable ? <span>Save</span> : <span>Edit</span>}
        </button>
        <button
          className="w-20 px-2 py-0.5 rounded-lg text-sm border border-black/10 bg-gray-50 hover:bg-gray-100"
          onClick={deleteAction}
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default TodoItem;
