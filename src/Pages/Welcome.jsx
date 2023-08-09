import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.scss";
import Authentication from "../components/Authentication";
import flexnote from "../assets/flexnote.png";
import About from "../Pages/About";

const Welcome = () => {
  const history = useNavigate();

  const isLoggedIn = () => {
    // Check if the user is logged in (use your preferred method)
    // For example, you can check if there's a stored token or any other authentication state
    const token = localStorage.getItem("token");
    return token !== null;
  };

  // Redirect to "/home" if the user is already logged in
  useEffect(() => {
    if (isLoggedIn()) {
      history.replace("/home");
    }
  }, [history]);

  return (
    <div className="welcome-container">
      <h1>Welcome!</h1>
      <div className="welcome">
        <div className="welcome-message">
          <div className="welcome-image">
            <img src={flexnote} alt="" />
          </div>
          <div className="welcome-text">
            <p>
              <em>Your Ultimate Note-Taking App!</em>
            </p>
          </div>
        </div>
        <div className="welcome-authentication">
          <Authentication />
        </div>
      </div>
      {/* <div className="arrow-right"></div> */}
      {/* <div className="line"></div> */}
      <div className="diagonal"></div>
      <div className="diagonal2"></div>
      <About />
    </div>
  );
};

export default Welcome;
