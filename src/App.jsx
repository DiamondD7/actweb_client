import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";

import "./App.css";
function App() {
  return (
    <div className="app-container__wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile-page" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
