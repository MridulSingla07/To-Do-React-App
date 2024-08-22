import { useState, useEffect } from "react";
import "./App.css";

import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import PopUp from "./components/PopUp";

function App() {
  const [todos, setTodos] = useState([]);
  const [popUp, setPopUp] = useState(false);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const showPopUp = () => {
    setPopUp(true);
    setTimeout(() => {
      setPopUp(false);
    }, 1000);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
    showPopUp();
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todoItems = JSON.parse(localStorage.getItem("todos"));

    if (todoItems && todoItems.length > 0) {
      setTodos(todoItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <TodoProvider
        value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
      >
        <div className="bg-purple-400 w-screen min-h-screen h-full py-12">
          <div className="w-full max-w-2xl min-h-60 bg-orange-500 shadow-md shadow-gray-700 text-white rounded-xl mx-auto py-4 px-8">
            <h1 className="text-3xl font-bold text-center mb-6">
              TO-DO MANAGER
            </h1>

            <div className="mb-8">
              <TodoForm />
            </div>

            {!todos || todos.length === 0 ? (
              <div className="w-1/2 mx-auto">
                <h1 className="text-white text-3xl font-semibold text-center mt-10 rounded-lg bg-black/10 w-full px-3 py-1.5">
                  EMPTY TODO !!!
                </h1>
              </div>
            ) : (
              <div className="flex flex-wrap gap-y-2">
                {todos.map((todo) => (
                  <div key={todo.id} className="w-full mb-4">
                    <TodoItem todo={todo} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {popUp && <PopUp />}
        </div>
      </TodoProvider>
    </>
  );
}

export default App;
