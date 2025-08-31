import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import Feed from "./components/Feed/Feed";
import Connect from "./components/Connect/Connect";
import Messages from "./components/Messages/Messages";
import Settings from "./components/Settings/Settings";

import "./App.css";
function App() {
  return (
    <div className="app-container__wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed-page" element={<Feed />} />
        <Route path="/profile-page" element={<Profile />} />
        <Route path="/connect-page" element={<Connect />} />
        <Route path="/messages-page" element={<Messages />} />
        <Route path="/settings-page" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
