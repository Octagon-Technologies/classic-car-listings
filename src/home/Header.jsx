import React, { useEffect, useState } from "react";
import profilePic from "../assets/images/branding/cars-logo-nobg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/branding/cars-logo-nobg.png";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../config/config";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const activeMenuHref = useLocation().pathname;
  const menuItems = [
    {
      title: "Who We Are",
      href: "/about",
    },
    {
      title: "Cars",
      href: "/",
    },
    {
      title: "Classic Cars",
      href: "/classic-cars",
    },

    {
      title: "Modern Classics",
      href: "/modern-classics",
    },
    {
      title: "Bikes",
      href: "/bikes",
    },

    {
      title: "Automobiles",
      href: "/automobiles",
    },
    ...(isAdmin
      ? [
          {
            title: "Admin Dashboard",
            href: "/admin",
          },
        ]
      : []),
  ];

  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);

  useEffect(() => {
    // async function checkForUser() {
    //   const {
    //     data: { user },
    //     error,
    //   } = await supabase.auth.getUser();
    //   console.log(user);
    //   console.error(error);

    //   if (user) {
    //     setIsAdmin(true);
    //   }
    // }

    // checkForUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);

        if (session) {
          console.log("Session is valid:", session);
          setIsAdmin(true);
        } else {
          console.log("Session is null or invalid");
          setIsAdmin(false);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);


  useEffect(() => {
    const backHandler = (e) => {
      if (isMenuOpen) {
        e.preventDefault()
        setIsMenuOpen(false)
        window.history.pushState(null, document.title)
      }
    }

    window.addEventListener("popstate", backHandler)
    window.history.pushState(null, document.title)

    return () => {
      window.removeEventListener("popstate", backHandler)
    }
  }, [isMenuOpen])

  return (
    <header>
      <div className="appBarContainer">
        <div className="appBar">
          <Link className="logo" to="/">
            <img src={logo} alt="" />
            <p className="logoName">
              Classic Car<br></br>Listings
            </p>
          </Link>

          <FontAwesomeIcon id="openMenu" onClick={toggleMenu} icon={faBars} />

          <nav className={isMenuOpen ? "active" : ""}>
            <FontAwesomeIcon
              id="closeMenu"
              icon={faClose}
              onClick={toggleMenu}
              style={{
                fontSize: "1.5rem",
                marginLeft: "16px",
                marginTop: "16px",
                color: "white",
              }}
            />

            <ul>
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
        </div>
      </div>
    </header>
  );
}

export default Header;
