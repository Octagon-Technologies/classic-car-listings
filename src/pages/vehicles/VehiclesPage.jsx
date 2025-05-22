import Header from "../../home/Header.jsx";
import Footer from "../../home/Footer.jsx";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SortTags from "./components/SortTags.jsx";
import CarList from "./components/CarList.jsx";

// import { supabase } from './config/config.jsx';

function VehiclesPage({ path, vehicleType }) {
  const [searchQuery, setSearchQuery] = useState("");

  function updateSearchQuery(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1 }}>
        <Header activeMenuHref={path} />

        <div className="search-bar">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ fontSize: "1.15rem" }}
          />
          <input
            type="text"
            id="search-query"
            placeholder="Search car here"
            value={searchQuery}
            onChange={updateSearchQuery}
          />
        </div>

        <SortTags />

        {/* <Practice/> */}
        <CarList searchQuery={searchQuery} />
      </div>

      <Footer style={{ marginTop: "auto" }} />
    </div>
  );
}

export default VehiclesPage;
