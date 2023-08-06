import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import flexnote from "../assets/flexnote.png";
import { FaGear, FaUserLarge } from "react-icons/fa6";
import Search from "./Search";
import "./Header.scss";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const menuRef = useRef(null);

  const toggleHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setToggleMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled down by checking the window's scrollY position
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    // Add the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`header ${hasScrolled ? "has-shadow" : ""}`}>
      <div className="header-container">
        <img src={flexnote} alt="" />
        <Search />
        <div className="header-icons">
          <a href="/" className="profile">
            <FaUserLarge color="2660a4" size={20} />
          </a>
          {toggleMenu ? (
            <FaGear
              className="gear gear-close"
              color="2660a4"
              size={20}
              onClick={toggleHandler}
            />
          ) : (
            <FaGear
              className="gear gear-open"
              color="2660a4"
              size={20}
              onClick={toggleHandler}
            />
          )}
        </div>

        <div ref={menuRef} className={toggleMenu ? "menu show-menu" : "menu"}>
          <ul>
            <li>
              <a href="">Switch to Dark Mode</a>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <a href="/">Sign Out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
