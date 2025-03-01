import React, { useState, useEffect } from "react";
import styles from "./ToDoList.module.css";

function ToDoList({ goToHome }) {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [placeholder, setPlaceholder] = useState("Add or edit a task"); // State for placeholder message

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") {
      setPlaceholder("⚠️ Task cannot be empty!");
      setTask(""); // Clear input field
      return;
    }

    setPlaceholder("Add or edit a task"); // Reset placeholder if input is valid

    if (editIndex !== null) {
      const updatedTasks = tasks.map((t, i) =>
        i === editIndex ? { ...t, text: task } : t
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: task, completed: false }]);
    }
    setTask("");
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
    setPlaceholder("Editing task...");
  };

  const toggleTaskCompletion = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.todoContainer}>
      <button onClick={goToHome} className={styles.homeButton}>
        Home
      </button>

      <h2 className={styles.title}>Your To-Do List</h2>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
        onFocus={() => setPlaceholder("Add or edit a task")} // Reset placeholder when user focuses on input
      />
      <button onClick={addTask} className={styles.addButton}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <ul className={styles.taskList}>
        {tasks.map((t, index) => (
          <li key={index} className={styles.taskItem}>
            <span
              className={`${styles.circle} ${t.completed ? styles.completedCircle : ""}`}
              onClick={() => toggleTaskCompletion(index)}
            ></span>

            <span
              className={`${styles.taskText} ${t.completed ? styles.completed : ""}`}
              onClick={() => toggleTaskCompletion(index)}
            >
              {t.text}
            </span>

            <div className={styles.buttonContainer}>
              <button onClick={() => editTask(index)} className={styles.editButton}>
                ✏️
              </button>
              <button onClick={() => removeTask(index)} className={styles.removeButton}>
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
