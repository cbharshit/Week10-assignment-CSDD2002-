import React, { useReducer, useState, useEffect, useCallback, useRef, useMemo } from "react";
import "../styles/TaskManager.css"; // Ensure correct import

// 🎯 Reducer function for managing tasks
const taskReducer = (state, action) => {
    let updatedTasks;
    switch (action.type) {
        case "LOAD_TASKS":
            return action.payload;
        case "ADD_TASK":
            updatedTasks = [...state, { id: Date.now(), ...action.payload }];
            break;
        case "UPDATE_TASK":
            updatedTasks = state.map(task =>
                task.id === action.payload.id ? { ...task, ...action.payload } : task
            );
            break;
        case "DELETE_TASK":
            updatedTasks = state.filter(task => task.id !== action.payload);
            break;
        case "TOGGLE_COMPLETION":
            updatedTasks = state.map(task =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
            );
            break;
        default:
            return state;
    }

    // Update local storage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    return updatedTasks;
};

const TaskManager = () => {
    const [tasks, dispatch] = useReducer(taskReducer, [], () => {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    });

    const [taskInput, setTaskInput] = useState({ title: "", description: "" });
    const [modalOpen, setModalOpen] = useState(false);
    const titleInputRef = useRef(null);

    // Auto-focus input when modal opens
    useEffect(() => {
        if (modalOpen) setTimeout(() => titleInputRef.current?.focus(), 100);
    }, [modalOpen]);

    const addTask = useCallback(() => {
        if (!taskInput.title.trim()) return;
        dispatch({ type: "ADD_TASK", payload: { ...taskInput, completed: false } });
        setTaskInput({ title: "", description: "" });
        setModalOpen(false);
    }, [taskInput]);

    const updateTask = useCallback((id) => {
        const updatedTitle = prompt("New Title", tasks.find(task => task.id === id)?.title);
        const updatedDescription = prompt("New Description", tasks.find(task => task.id === id)?.description);
        if (updatedTitle && updatedDescription) {
            dispatch({ type: "UPDATE_TASK", payload: { id, title: updatedTitle, description: updatedDescription } });
        }
    }, [tasks]);

    const deleteTask = useCallback((id) => dispatch({ type: "DELETE_TASK", payload: id }), []);
    const toggleCompletion = useCallback((id) => dispatch({ type: "TOGGLE_COMPLETION", payload: id }), []);

    const filteredTasks = useMemo(() => tasks.filter(task => !task.completed), [tasks]);

    return (
        <div className="task-manager">
            <h2>Task Manager</h2>
            <button className="add-task-btn" onClick={() => setModalOpen(true)}>+ Add Task</button>

            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Add New Task</h3>
                        <input
                            ref={titleInputRef}
                            type="text"
                            placeholder="Task Title"
                            value={taskInput.title}
                            onChange={(e) => setTaskInput({ ...taskInput, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Task Description"
                            value={taskInput.description}
                            onChange={(e) => setTaskInput({ ...taskInput, description: e.target.value })}
                        />
                        <div className="modal-actions">
                            <button className="save-btn" onClick={addTask}>Save</button>
                            <button className="cancel-btn" onClick={() => setModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <ul className="task-list">
                {filteredTasks.map(task => (
                    <li key={task.id} className={`task-card ${task.completed ? "completed" : ""}`}>
                        <div className="task-content">
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                        </div>
                        <div className="task-actions">
                            <button className="complete-btn" onClick={() => toggleCompletion(task.id)}>✔</button>
                            <button className="edit-btn" onClick={() => updateTask(task.id)}>✎</button>
                            <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;
