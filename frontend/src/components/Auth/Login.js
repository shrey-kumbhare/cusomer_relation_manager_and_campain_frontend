import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

// Make sure to use the environment variable for the API URL
const API_URL = process.env.REACT_APP_API_URL;

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/status`, {
          credentials: "include",
        });
        const data = await response.json();

        if (data.isAuthenticated) {
          onLogin(); // Notify parent component about login success
          navigate("/home"); // Redirect to home if authenticated
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        // You might want to show a message to the user in case of an error
      }
    };

    checkAuthStatus();
  }, [onLogin, navigate]);

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth
    window.location.href = `${API_URL}/api/auth/google`;
  };

  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-container"]}>
        <h1 className={styles["title"]}>Welcome to Mini-CRM</h1>
        <p className={styles["subtitle"]}>Authenticate Yourself</p>
        <div className={styles["login-box"]}>
          <button
            onClick={handleGoogleLogin}
            className={styles["login-with-google-btn"]}
            style={{ minWidth: "200px" }}
          >
            <span style={{ fontSize: "16px" }}>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
