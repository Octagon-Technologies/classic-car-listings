import Header from "../../home/Header.jsx";
import Footer from "../../home/Footer.jsx";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SortTags from "./components/SortTags.jsx";
import CarList from "./components/CarList.jsx";
import SortOption from "./models/SortOption.jsx";

// import { supabase } from './config/config.jsx';

function VehiclesPage({ path, vehicleType }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceSortOption, setSelectedPriceValue] = useState(
    new SortOption("price", "ascend")
  );
  const [dateSortOption, setSelectedDateValue] = useState(
    new SortOption("datePosted", "descend")
  );

  function updateSearchQuery(event) {
    setSearchQuery(event.target.value);
  }

  const handlePriceChange = (event) => {
    setSelectedPriceValue(new SortOption("price", event.target.value));
  };

  const handleDateChange = (event) => {
    setSelectedDateValue(new SortOption("datePosted", event.target.value));
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ flex: 1, maxWidth: "100vw", overflowX: "hidden" }}>
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

        <SortTags
          selectedPriceValue={priceSortOption.order}
          selectedDateValue={dateSortOption.order}
          handlePriceChange={handlePriceChange}
          handleDateChange={handleDateChange}
        />

        <CarList
          vehicleType={vehicleType}
          searchQuery={searchQuery}
          priceSortOption={priceSortOption}
          dateSortOption={dateSortOption}
        />
      </div>

      <Footer style={{ marginTop: "auto" }} />
    </div>
  );
}

export default VehiclesPage;
