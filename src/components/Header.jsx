import React, { useState, useEffect, useRef } from "react";
import flexnote from "../assets/flexnote.png";
import { FaGear, FaUserLarge } from "react-icons/fa6";
import Search from "./Search";
import "./Header.scss";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
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

  return (
    <header className="header">
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
              <a href="">About</a>
            </li>
            <li>
              <a href="/">Sign Out</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
