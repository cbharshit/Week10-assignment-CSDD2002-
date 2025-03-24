// context/TaskContext.js
import React, { createContext, useReducer, useContext, useEffect } from "react";

const initialState = JSON.parse(localStorage.getItem("tasks")) || [];

const taskReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, action.payload];
        case "DELETE_TASK":
            return state.filter((task) => task.id !== action.payload);
        case "UPDATE_TASK":
            return state.map((task) =>
                task.id === action.payload.id ? action.payload : task
            );
        case "TOGGLE_COMPLETE":
            return state.map((task) =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
            );
        case "UNDO_TASK":
            return state.map((task) =>
                task.id === action.payload ? { ...task, completed: false } : task
            );
        default:
            return state;
    }
};

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, initialState);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);