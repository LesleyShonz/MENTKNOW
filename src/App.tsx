import "./styles.css";
import "@tldraw/tldraw/tldraw.css";
import { Tldraw } from "@tldraw/tldraw";
import { useYjsStore } from "./useYjsStore";
import { UserPresence } from "./UserPresence";
import NavigationBar from "./NavigationBar";
import React, { useState } from "react";
import Login from "./Login";
import UserContext from './UserContext';
import Register from "./Register";
import Dashboard from "./Dashboard";
import axios from "axios";
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
export default function App({ showReviewBoard }) {
  const [user, setUser] = useState(null);
  const store = useYjsStore({
    roomId: "MENT",
  });
  const [isAuthenticated, setAuthenticated] = useState(true);
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  }
  const TldrawRouteComponent = ({ store }) => (

    <Tldraw store={store} autoFocus shareZone={<UserPresence />} />
  );
  console.log('token')
  return (

    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/tldraw" element={
            <>
            <div className="tldraw__editor">
              
              <Tldraw store={store} autoFocus shareZone={<UserPresence />} />
            </div>
            <NavigationBar className="NavigationBar" />
            </>
          }
          />
          <Route path="/signin" element={< Login setAuthenticated={setAuthenticated} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}
