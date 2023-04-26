import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alesanchezr")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks: ", error);
      });
  }, []);

  const handleTaskInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleTaskFormSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, { label: newTask, done: false }]);
      setNewTask("");
    }
  };

  const handleTaskDelete = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alesanchezr", {
      method: "PUT",
      body: JSON.stringify(tasks.filter((task, i) => i !== index)),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Task deleted successfully");
      })
      .catch((error) => {
        console.error("There was an error deleting the task: ", error);
      });
  };

  const handleClearAll = () => {
    setTasks([]);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alesanchezr", {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("All tasks cleared successfully");
      })
      .catch((error) => {
        console.error("There was an error clearing all tasks: ", error);
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
    <button className="clear" onClick={handleClearAll}>
Clear All
</button>
<div className="counter">Tasks Left: {tasks.filter((task) => !task.done).length}</div>
</div>
);
}

export default App;