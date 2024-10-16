import React, { useState, useEffect } from "react";
import "./App.css"; // Import your CSS styles

function App() {
  const [todos, setTodos] = useState([]); // State to store todos
  const [newTodo, setNewTodo] = useState(""); // State to manage new todo input
  const [error, setError] = useState(null); // State for handling errors

  // Fetch todos from the backend using fetch
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/todos");
      const data = await response.json();
      console.log("Response from backend:", data); // Debugging log
      setTodos(data); // Update todos state
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError("Error fetching todos"); // Update error state
    }
  };

  // UseEffect to fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to add a new todo using fetch
  const addTodo = async () => {
    if (!newTodo) return; // Prevent adding empty todos
    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTodo,
        }),
      });
      const newTodoData = await response.json();
      setTodos([...todos, newTodoData]); // Add new todo to state
      setNewTodo(""); // Clear input field
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Error adding todo");
    }
  };

  // Function to delete a todo using fetch
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo._id !== id)); // Remove deleted todo from state
    } catch (err) {
      console.error("Error deleting todo:", err);
      setError("Error deleting todo");
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo._id}>
              {todo.title}
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No todos available</p>
        )}
      </ul>
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
