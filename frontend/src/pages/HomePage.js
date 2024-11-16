import React from "react";
import "./HomePage.css";

const HomePage = ({ Profile }) => {
  return (
    <div className="home-page">
      <h1 className="home-page-title">Welcome to the CRM Application</h1>

      {Profile && (
        <div className="user-info">
          <p>
            <strong>Name:</strong> {Profile.displayName}
          </p>
          <p>
            <strong>Email:</strong> {Profile.email}
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
