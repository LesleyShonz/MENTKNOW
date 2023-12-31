// Import required libraries, styles, and components
import "./styles.css";
import "@tldraw/tldraw/tldraw.css";
import NavigationBar from "./Activity/NavigationBar";
import React, { useState } from "react";
import Login from "./Login/Login";
import UserContext from "./Whiteboard/UserContext";
import Register from "./Login/Register";
import MainPoll from "./polls/MainPoll";
import Dashboard from "./Dashboard/Dashboard";
import MentorDashboard from "./Dashboard/MentorDashboard";
import Whiteboard from "./Whiteboard/Whiteboard";
import axios from "axios";
import Analytics from "./Analytics/Analytics";
import BarChart from "./Analytics/BarChart";
import PieChart from "./Analytics/PieChart";
import ScatterPlotter from "./Analytics/ScatterPlotter";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
export default function App() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route
            path="/Whiteboard"
            element={
              <>
                <Whiteboard />
                <NavigationBar className="NavigationBar" />
              </>
            }
          />
          {/* Other routes for application navigation */}
          <Route path="/signin" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createPoll" element={<MainPoll />} />
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/mentorDashboard" element={<MentorDashboard />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/barchart" element={<BarChart />} />
          <Route path="/piechart" element={<PieChart />} />
          <Route path="/histogram" element={<ScatterPlotter />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}
