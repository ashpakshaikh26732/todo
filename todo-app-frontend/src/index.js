import React from "react";
import ReactDOM from "react-dom/client"; // React 18 uses this
import App from "./App";
import "./index.css";

// Create a root
const root = ReactDOM.createRoot(document.getElementById("root"));

// Initial render
root.render(<App />);
