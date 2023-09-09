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
import axios from "axios";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
export default function App() {
  const [user, setUser] = useState(null);
  const store = useYjsStore({
    roomId: "MENT",
  });
  const [isAuthenticated, setAuthenticated] = useState(true);
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
            element={<Login setAuthenticated={setAuthenticated} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createPoll" element={<MainPoll />} />
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}
