import React, { useEffect, useState } from "react";
import profilePic from "../assets/images/branding/cars-logo-nobg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faBars,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/branding/cars-logo-nobg.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../config/config";
import { useMediaQuery } from "react-responsive";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 1080 });

  const [expandedMenuItem, setExpandedMenuItem] = useState();

  const activeMenuHref = useLocation().pathname;

  useEffect(() => {
    console.log("Effect. activeMenuHref is ", activeMenuHref);
    setIsMenuOpen(false);
  }, [activeMenuHref]);

  const menuItems = [
    {
      title: "About Us",
      href: "/about",
    },
    {
      title: "Cars",
      subMenu: [
        {
          title: "All Cars",
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
      ],
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
    const isNormalMenuItem = menuItems.find(
      (item) => item?.href === activeMenuHref
    );

    if (!isNormalMenuItem) {
      menuItems.forEach((item) => {
        if (item.subMenu) {
          item.subMenu.forEach((subMenuItem) => {
            console.log(
              `subMenuItem is ${
                subMenuItem.title
              }. subMenuItem.href === activeMenuHref is ${
                subMenuItem.href === activeMenuHref
              }`
            );
            if (subMenuItem.href === activeMenuHref) {
              setExpandedMenuItem(subMenuItem);
            }
          });
        }
      });
    }
  }, [activeMenuHref]);

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
        e.preventDefault();
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      window.addEventListener("popstate", backHandler);
      window.history.pushState(null, document.title);
    }

    return () => {
      window.removeEventListener("popstate", backHandler);
    };
  }, [isMenuOpen]);

  function handleMenuItemClick(menuItem) {
    if (menuItem.subMenu) {
      if (menuItem.title === expandedMenuItem?.title) {
        // If the menu being clicked is already expanded, collapse it
        setExpandedMenuItem(null);
      } else if (menuItem != expandedMenuItem) {
        // No current expanded menu
        setExpandedMenuItem(menuItem);
      }
    } else {
      navigate(menuItem.href);
    }
  }

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
                  key={item.title}
                  className={item?.href === activeMenuHref ? "active" : ""}
                  onClick={() => handleMenuItemClick(item)}
                  onMouseEnter={() =>
                    isDesktop ? setExpandedMenuItem(item) : ""
                  }
                  onMouseLeave={() =>
                    isDesktop ? setExpandedMenuItem(null) : ""
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    {item.subMenu ? (
                      <p className="menuItem">{item.title}</p>
                    ) : (
                      <Link
                        className="menuItem"
                        to={item?.href}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}

                    {item.subMenu ? (
                      <FontAwesomeIcon
                        icon={
                          item.title === expandedMenuItem?.title
                            ? faChevronUp
                            : faChevronDown
                        }
                        className="subMenuArrow"
                        style={{
                          color: isDesktop ? "black" : "white" 
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  {item.subMenu ? (
                    <div
                      className={`subMenu ${
                        item.title === expandedMenuItem?.title ? "active" : ""
                      }`}
                    >
                      {item.subMenu.map((subMenuItem) => (
                        <Link
                          to={subMenuItem.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`subMenuItem ${
                            subMenuItem.href === activeMenuHref ? "active" : ""
                          }`}
                        >
                          {subMenuItem.title}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
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
