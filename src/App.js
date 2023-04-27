import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://assets.breatheco.de/apis/fake/todos/user/JonShelley"
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.log("Error fetching tasks: ", error);
      }
    };
    fetchData();
  }, []);

  const handleTaskInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleTaskFormSubmit = async (event) => {
    event.preventDefault();
    if (newTask.trim() !== "") {
      const newTasks = [...tasks, { label: newTask, done: false }];
      try {
        const response = await fetch(
          "https://assets.breatheco.de/apis/fake/todos/user/JonShelley",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTasks),
          }
        );
        if (response.ok) {
          setTasks(newTasks);
          setNewTask("");
        } else {
          console.log("Error updating tasks");
        }
      } catch (error) {
        console.log("Error updating tasks: ", error);
      }
    }
  };

  const handleTaskDelete = async (index) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/JonShelley",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTasks),
        }
      );
      if (response.ok) {
        setTasks(newTasks);
      } else {
        console.log("Error updating tasks");
      }
    } catch (error) {
      console.log("Error updating tasks: ", error);
    }
  };

  useEffect(() => {
    const createAPI = async () => {
      try {
        const response = await fetch(
          "https://assets.breatheco.de/apis/fake/todos/user/JonShelley",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([]),
          }
        );
        if (response.ok) {
          console.log("API created successfully!");
        } else {
          console.log("Error creating API");
        }
      } catch (error) {
        console.log("Error creating API: ", error);
      }
    };
    createAPI();
  }, []);

  const handleClearAll = async () => {
    try {
      // delete user
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/JonShelley",
        {
          method: "DELETE"
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting user");
      }
      
      
      const response2 = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/JonShelley",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([])
        }
      );
      if (!response2.ok) {
        throw new Error("Error creating new user");
      }
      
     
      setTasks([]);
    } catch (error) {
      console.log("Error clearing all tasks: ", error);
    }
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
                X
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-task">No tasks, add a task</p>
      )}
      <div className="counter">
        Tasks Left: {tasks.filter(task => !task.done).length}
      </div>
      <button className="clear" onClick={() => { setTasks([]); handleClearAll([]) }}>Clear All</button>
    </div>
  );
  
}
  
export default App;
  