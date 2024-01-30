import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";


import "./App.css";
import Signup from "./Components/UserRegAndAuth/Signup";
import AuthProvider from "./contexts/AuthContext";
import Login from "./Components/UserRegAndAuth/Login";
import ForgotPassword from "./Components/UserRegAndAuth/ForgotPassword";


import TaskManager from "./Components/TaskManager";
import {  Container, } from "react-bootstrap";

function App() {
  

  return (
    <>
    <Header />
      
        <div>
        <Container>
          <div className="taskManager">
            <AuthProvider>
              <Routes>
                <Route exact path="/" element={<TaskManager />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </div>
        </Container>
        </div>
    </>
  );
}

export default App;
