import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import TaskManager from "./components/TaskManager";

const App = () => {
  return (
    <ThemeProvider>
      <TaskManager />
    </ThemeProvider>
  );
};

export default App;
