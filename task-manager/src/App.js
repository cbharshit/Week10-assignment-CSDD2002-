// App.js
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { TaskProvider } from "./context/TaskContext";
import TaskManager from "./components/TaskManager";

const App = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h1>Task Manager</h1>
          <TaskManager />
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;