// components/TaskManager.js
import React, { useState, useRef, useMemo, useCallback } from "react";
import { useTasks } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";

const TaskManager = () => {
    const { tasks, dispatch } = useTasks();
    const { theme, toggleTheme } = useTheme();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const inputRef = useRef(null);
    const [filter, setFilter] = useState("all");

    React.useEffect(() => {
        inputRef.current.focus();
    }, []);

    const filteredTasks = useMemo(() => {
        let filtered = tasks;
        if (filter === "completed") {
            filtered = tasks.filter((task) => task.completed);
        } else if (filter === "pending") {
            filtered = tasks.filter((task) => !task.completed);
        }
        return filtered.filter((task) =>
            task.title.toLowerCase().includes(title.toLowerCase())
        );
    }, [tasks, title, filter]);

    const addTask = useCallback(() => {
        if (title.trim() === "" || description.trim() === "") {
            alert("Please enter a title and description!");
            return;
        }

        dispatch({
            type: "ADD_TASK",
            payload: { id: Date.now(), title, description, completed: false },
        });

        setTitle("");
        setDescription("");
    }, [title, description, dispatch]);

    const deleteTask = useCallback((id) => {
        dispatch({ type: "DELETE_TASK", payload: id });
    }, [dispatch]);

    const toggleComplete = useCallback((id) => {
        dispatch({ type: "TOGGLE_COMPLETE", payload: id });
    }, [dispatch]);

    const undoTask = useCallback((id) => {
        dispatch({ type: "UNDO_TASK", payload: id });
    }, [dispatch]);

    const styles = {
        container: {
            maxWidth: "600px",
            margin: "auto",
            padding: "20px",
            border: `1px solid ${theme === "light" ? "#ccc" : "#444"}`,
            borderRadius: "8px",
            textAlign: "center",
            backgroundColor: theme === "light" ? "#fff" : "#333",
            color: theme === "light" ? "#000" : "#fff",
        },
        input: {
            width: "90%",
            padding: "10px",
            margin: "5px 0",
            borderRadius: "5px",
            border: `1px solid ${theme === "light" ? "#ccc" : "#444"}`,
            backgroundColor: theme === "light" ? "#fff" : "#555",
            color: theme === "light" ? "#000" : "#fff",
        },
        button: {
            padding: "10px 15px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
        },
        list: {
            listStyleType: "none",
            padding: 0,
            marginTop: "10px",
        },
        taskItem: {
            border: `1px solid ${theme === "light" ? "#ddd" : "#555"}`,
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: theme === "light" ? "#f9f9f9" : "#444",
        },
        taskContent: {
            flexGrow: 1,
            textAlign: "left",
        },
        actionButtons: {
            display: "flex",
        },
        filterButtons: {
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
        },
        filterButton: {
            padding: "5px 10px",
            margin: "0 5px",
            borderRadius: "5px",
            border: `1px solid ${theme === "light" ? "#ccc" : "#444"}`,
            backgroundColor: theme === "light" ? "#e0e0e0" : "#666",
            color: theme === "light" ? "#000" : "#fff",
            cursor: "pointer",
        },
        toggleButton: {
            padding: "10px 15px",
            backgroundColor: theme === "light" ? "#000" : "#fff",
            color: theme === "light" ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
        },
    };

    return (
        <div style={styles.container}>
            <h2>Task Manager</h2>
            <button onClick={toggleTheme} style={styles.toggleButton}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
            <input
                type="text"
                ref={inputRef}
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
            />
            <input
                type="text"
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.input}
            />
            <button onClick={addTask} style={styles.button}>
                Add Task
            </button>
            <div style={styles.filterButtons}>
                <button
                    onClick={() => setFilter("all")}
                    style={{
                        ...styles.filterButton,
                        backgroundColor: filter === "all" ? "#007BFF" : styles.filterButton.backgroundColor,
                    }}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter("completed")}
                    style={{
                        ...styles.filterButton,
                        backgroundColor: filter === "completed" ? "#007BFF" : styles.filterButton.backgroundColor,
                    }}
                >
                    Completed
                </button>
                <button
                    onClick={() => setFilter("pending")}
                    style={{
                        ...styles.filterButton,
                        backgroundColor: filter === "pending" ? "#007BFF" : styles.filterButton.backgroundColor,
                    }}
                >
                    Pending
                </button>
            </div>
            <ul style={styles.list}>
                {filteredTasks.map((task) => (
                    <li key={task.id} style={styles.taskItem}>
                        <div style={styles.taskContent}>
                            {task.title}
                            {task.completed && <span style={{ marginLeft: "10px", color: "green" }}>Completed</span>}
                        </div>
                        <div style={styles.actionButtons}>
                            {!task.completed && (
                                <button onClick={() => toggleComplete(task.id)}>Complete</button>
                            )}
                            {task.completed && (
                                <button onClick={() => undoTask(task.id)}>Undo</button>
                            )}
                            <button>Edit</button>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;