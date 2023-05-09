import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Dashboard from "./pages/Dashboard";
import Encounters from "./pages/Encounters";
import Histories from "./pages/Histories";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Reminders from "./pages/Reminders";
import Reports from "./pages/Reports";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";

const App = () => {
  // const token = localStorage.getItem("token");
  const token =
    useSelector((state) => state.auth.isLoggedIn) ||
    localStorage.getItem("token");
  const userId =
    useSelector((state) => state.auth.userId) || localStorage.getItem("userId");
  console.log(userId, token);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          {!(token || userId) && <Route path="/signup" element={<Signup />} />}
          {!(token || userId) && <Route path="/login" element={<Login />} />}
          {token && userId && <Route path="/app" element={<Dashboard />} />}
          {token && userId && <Route path="/profile" element={<Profile />} />}
          {token && userId && (
            <Route path="/encounters" element={<Encounters />} />
          )}
          {token && userId && (
            <Route path="/histories" element={<Histories />} />
          )}
          {token && userId && (
            <Route path="/reminders" element={<Reminders />} />
          )}
          {token && userId && <Route path="/reports" element={<Reports />} />}
          {token && userId && (
            <Route path="/appointments" element={<Appointments />} />
          )}
        </Routes>
      </Router>
    </>
  );
};

export default App;
