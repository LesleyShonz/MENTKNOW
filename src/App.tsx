import "./styles.css";
import "@tldraw/tldraw/tldraw.css";
import { Tldraw } from "@tldraw/tldraw";
import { useYjsStore } from "./Whiteboard/useYjsStore";
import { UserPresence } from "./Whiteboard/UserPresence";
import NavigationBar from "./Activity/NavigationBar";
import React, { useState } from "react";
import Login from "./Login/Login";
import UserContext from "./Whiteboard/UserContext";
import Register from "./Login/Register";
import MainPoll from "./polls/MainPoll";
import Dashboard from "./Dashboard/Dashboard";
import MentorDashboard from "./Dashboard/MentorDashboard";
import axios from "axios";
import Analytics from "./Analytics/Analytics";
import BarChart from "./Analytics/BarChart";
import PieChart from "./Analytics/PieChart";
import HistogramAverageRating from "./Analytics/HistogramAverageRating";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
export default function App() {
  const [user, setUser] = useState(null);
  const store = useYjsStore({
    roomId: "MENTKNOW0302156394181",
  });
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  }
  const TldrawRouteComponent = ({ store }) => (
    <Tldraw store={store} autoFocus shareZone={<UserPresence />} />
  );
  console.log("token");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route
            path="/tldraw"
            element={
              <>
                <div className="tldraw__editor">
                  <Tldraw
                    store={store}
                    autoFocus
                    shareZone={<UserPresence />}
                  />
                </div>
                <NavigationBar className="NavigationBar" />
              </>
            }
          />

          <Route
            path="/signin"
            element={<Login/>}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createPoll" element={<MainPoll />} />
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path= '/mentorDashboard' element={<MentorDashboard/>}/>
          <Route path= '/Analytics' element={<Analytics/>}/>
          <Route path= '/barchart' element={<BarChart/>}/>
          <Route path= '/piechart' element={<PieChart/>}/>
          <Route path= '/histogram' element={<HistogramAverageRating/>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}
