import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./pages/Home";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [Profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  // Use environment variable for API URL
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/status`, {
          credentials: "include",
        });
        console.log(response);
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
        setProfile(data.name);
        setLoading(false);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [API_URL]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        console.log("Logout successful");
        setIsAuthenticated(false);
      } else {
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route
            path="/home/*"
            element={
              isAuthenticated ? (
                <Home onLogout={handleLogout} profile={Profile} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
