import React, { useState, useEffect } from "react";
import styles from "../VehiclesPage.module.css";

function SortTags({
  selectedPriceValue,
  handlePriceChange,
  selectedDateValue,
  handleDateChange,
}) {
  return (
    <div className={styles.sortBar}>
      <p
        className="title"
        style={{ fontWeight: "700", fontSize: "1.15rem", marginRight: "6px" }}
      >
        Sort:
      </p>

      <select
        value={selectedPriceValue}
        className={styles.tab}
        style={{
          backgroundColor: selectedPriceValue ? "rgb(0, 141, 119)" : "white",
          color: selectedPriceValue ? "white" : "black",
          borderColor: selectedPriceValue ? "rgb(0, 141, 119)" : "black",
        }}
        name="price"
        id="priceSelect"
        onChange={handlePriceChange}
      >
        <option value="">By Price</option>
        <option value="ascend">Lowest to Highest</option>
        <option value="descend">Highest To Lowest</option>
      </select>

      <select
        value={selectedDateValue}
        className={styles.tab}
        style={{
          backgroundColor: selectedDateValue ? "rgb(0, 141, 119)" : "white",
          color: selectedDateValue ? "white" : "black",
          borderColor: selectedDateValue ? "rgb(0, 141, 119)" : "black",
        }}
        name="date"
        id="dateSelect"
        onChange={handleDateChange}
      >
        <option value="">By Date Posted</option>
        <option value="ascend">Oldest to Latest</option>
        <option value="descend">Latest To Oldest</option>
      </select>
    </div>
  );
}

export default SortTags;
