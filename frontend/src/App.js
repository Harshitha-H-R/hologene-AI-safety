import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import Result from "./pages/Result";

function App() {
  return (
    <Router>
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(circle at top, rgba(56,189,248,0.18), transparent 32%), radial-gradient(circle at bottom right, rgba(14,165,233,0.16), transparent 28%), #020617" }} />
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
