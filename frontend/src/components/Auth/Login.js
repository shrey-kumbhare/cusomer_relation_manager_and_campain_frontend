import React, { useEffect } from "react";
import styles from "./Login.module.css";

const API_URL = process.env.API_BASE_URL;

const Login = ({}) => {
  const handleGoogleLogin = () => {
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
