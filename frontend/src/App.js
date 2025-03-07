import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Professeur from "./components/Professeur";
import Student from "./components/Student";
import Course from "./components/Course";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/home";
import Register from "./components/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/professors" element={<PrivateRoute><Professeur /></PrivateRoute>} />
            <Route path="/students" element={<PrivateRoute><Student /></PrivateRoute>} />
            <Route path="/courses" element={<PrivateRoute><Course /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
