import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = ({}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isAuthenticated = params.get("isAuthenticated");
    const displayName = params.get("displayName");
    const email = params.get("email");
    console.log(isAuthenticated);
    console.log(displayName);
    if (isAuthenticated === "true" && displayName && email) {
      const userInfo = {
        displayName,
        email,
      };
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("profile", JSON.stringify(userInfo));
      navigate("/home");
    } else {
      //   navigate("/login");
    }
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default AuthSuccess;
