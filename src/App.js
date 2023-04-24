import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alesanchezr")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  const handleTaskInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleTaskFormSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() !== "") {
      const newTasks = [...tasks, { label: newTask, done: false }];
      setTasks(newTasks);
      setNewTask("");
      updateTaskList(newTasks);
    }
  };

  const handleTaskDelete = (index) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
    updateTaskList(newTasks);
  };

  const handleClearAllTasks = () => {
    const newTasks = [];
    setTasks(newTasks);
    updateTaskList(newTasks);
  };

  const updateTaskList = (tasks) => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alesanchezr", {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task list updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating task list:", error);
      });
  };

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <form onSubmit={handleTaskFormSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={handleTaskInputChange}
          placeholder="Enter a new task..."
          required
        />
        <button className="submit" type="submit">
          Add Task
        </button>
      </form>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.label}
              <button
                className="delete-button"
                onClick={() => handleTaskDelete(index)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-task">No tasks, add a task</p>
      )}
      {/* Counter for tasks left */}
      <button className="clear" onClick={handleClearAllTasks}>
        Clear All
      </button>
      <div className="counter">Tasks Left: {tasks.length}</div>
    </div>
  );
}

export default App;
