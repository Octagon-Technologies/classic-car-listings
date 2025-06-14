import styles from "./VehiclePage.module.css";
import logo from "../../assets/images/branding/cars-logo-nobg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpWideShort,
  faBars,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CarList from "./components/car-list/CarList";
import { VehicleTypes } from "./models/VehicleTypes";
import SortOption from "./models/SortOption";
import Header from "../../home/Header";
import { VehicleStatus } from "./models/VehicleStatus";
// import wavy from "../../assets/images/design/green-v1.png";
// import wavy from "../../assets/images/design/wavy-v3.png";
// import wavy from "../../assets/images/design/wavy.webp";
// import wavy from "../../assets/images/design/green-wavy.png";

function VehiclesPage({ vehicleType }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState(null);
  const [vehicleStatus, setVehicleStatus] = useState(VehicleStatus.Available);

  function handlePriceAscend() {
    setSortOption(new SortOption("price-ascend", "price", "ascend"));
  }
  function handlePriceDescend() {
    setSortOption(new SortOption("price-descend", "price", "descend"));
  }
  function handleDateAscend() {
    setSortOption(new SortOption("date-ascend", "datePosted", "ascend"));
  }
  function handleDateDescend() {
    setSortOption(new SortOption("date-descend", "datePosted", "descend"));
  }

  function handleVehicleStatus(e) {
    setVehicleStatus(e.target.value);
  }

  return (
    <div>
      <Header />

      <div className={styles.body}>
        <div className={styles.searchSection}>
          <h3 className={styles.title}>
            Explore a vast array of well-maintained classics
          </h3>

          <div className={styles.searchBar}>
            <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} />
            <input
              type="text"
              placeholder={`Search for your desired ${vehicleType ? vehicleType.keyword.toLowerCase() : "car"}`}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.searchActions}>
            <div className={styles.sort}>
              <select
                value={sortOption ? sortOption.key : ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "price-ascend") handlePriceAscend();
                  else if (value === "price-descend") handlePriceDescend();
                  else if (value === "date-ascend") handleDateAscend();
                  else if (value === "date-descend") handleDateDescend();
                  else setSortOption(null);
                }}
              >
                <option value="">Sort</option>
                <option value="price-ascend">Price: Lowest To Highest</option>
                <option value="price-descend">Price: Highest To Lowest</option>
                <option value="date-ascend">
                  Earliest To Latest (Date Posted)
                </option>
                <option value="date-descend">
                  Latest To Earliest (Date Posted)
                </option>
              </select>
              <FontAwesomeIcon icon={faArrowUpWideShort} />
            </div>
            <div className={styles.search}>
              <p>Search</p>
            </div>
          </div>
        </div>

        <select
          className={styles.filterCategory}
          value={vehicleStatus}
          onChange={handleVehicleStatus}
        >
          <option value={VehicleStatus.Available}>
            Show {VehicleStatus.Available}{" "}
            {vehicleType ? vehicleType.groupKeyword : "Cars"}
          </option>
          <option value={VehicleStatus.Sold}>
            Show {VehicleStatus.Sold}{" "}
            {vehicleType ? vehicleType.groupKeyword : "Cars"}
          </option>
          <option value={VehicleStatus.All}>
            Show {VehicleStatus.All}{" "}
            {vehicleType ? vehicleType.groupKeyword : "Cars"}
          </option>
        </select>

        <CarList
          vehicleType={vehicleType}
          searchQuery={searchQuery}
          sortOption={sortOption}
          vehicleStatus={vehicleStatus}
          className={styles.carList}
        />
        {/* <div className={styles.carList}>
        <div className={styles.car}></div>
      </div> */}
      </div>
    </div>
  );
}

export default VehiclesPage;
