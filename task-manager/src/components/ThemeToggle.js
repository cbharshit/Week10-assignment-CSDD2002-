import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                background: theme === "light" ? "#000" : "#fff",
                color: theme === "light" ? "#fff" : "#000",
                border: "none",
                borderRadius: "5px",
            }}
        >
            Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button>
    );
};

export default ThemeToggle;
