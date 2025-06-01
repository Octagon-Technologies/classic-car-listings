import React, { useState } from "react";
import profilePic from "../assets/images/branding/cars-logo-nobg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/branding/cars-logo-nobg.png";
import { Link } from "react-router-dom";

function Header({ activeMenuHref, headerColor = "rgba(255, 255, 255, 0.2)" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const activeMenuHref = "home";
  const menuItems = [
    {
      title: "Who We Are",
      href: "about",
    },
    {
      title: "Classic Cars",
      href: "/",
    },

    {
      title: "Modern Classics",
      href: "modern-classics",
    },
  ];

  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);

  return (
    <header>
      {/* <div className="top-bar-container">
        <div
          className="top-bar-bg"
          style={{
            background: { headerColor },
          }}
        ></div>
        <div className="top-bar">
          // { <h2>Welcome to Classic Cars</h2>  }
          <img src={profilePic} alt="Logo" />
          <FontAwesomeIcon
            id="open-menu-btn"
            icon={faBars}
            onClick={toggleMenu}
            style={{ fontSize: "1.3rem", color: "black", fontWeight:"700" }}
          />
        </div>
      </div> */}
      <div className="appBarContainer">
        <div className="appBar">
          <Link className="logo" to="/">
            <img src={logo} alt="" />
            <p className="logoName">
              Classic Car<br></br>Listings
            </p>
          </Link>

          <FontAwesomeIcon
            className="openMenu"
            onClick={toggleMenu}
            icon={faBars}
          />
        </div>
      </div>
      
      <nav className={isMenuOpen ? "active" : ""}>
        <FontAwesomeIcon
          id="close-menu-btn"
          icon={faClose}
          onClick={toggleMenu}
          style={{
            fontSize: "1.5rem",
            marginLeft: "16px",
            marginTop: "16px",
            color: "white",
          }}
        />

        <ul style={{}}>
          {menuItems.map((item) => (
            <li
              key={item.href}
              className={item.href === activeMenuHref ? "active" : ""}
            >
              <a href={item.href}>{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
