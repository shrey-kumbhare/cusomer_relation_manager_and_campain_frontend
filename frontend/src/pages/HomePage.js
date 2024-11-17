import React, { useState, useEffect } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");

    if (storedProfile) {
      setProfile(JSON.parse(storedProfile)); // Parse and set profile data
    }
  }, []);

  return (
    <div className="home-page">
      <h1 className="home-page-title">Welcome to the CRM Application</h1>

      {profile ? (
        <div className="user-info">
          <p>
            <strong>Name:</strong> {profile.displayName}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
        </div>
      ) : (
        <p>Please log in to see your profile.</p>
      )}
    </div>
  );
};

export default HomePage;
