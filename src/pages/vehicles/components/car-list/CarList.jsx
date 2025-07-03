import { useEffect } from "react";
import CarCard from "../CarCard";
import styles from "./CarList.module.css";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   "https://xxsbhmnnstzhatmoivxp.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4c2JobW5uc3R6aGF0bW9pdnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzczMDAsImV4cCI6MjA2Mjk1MzMwMH0.p8UVJF_QzsFh0yJFTtHbJ8pdrjR9LSDg0xjIGrZNuK0"
// );

//xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002%20Land%20Rover/classiccarlistingskenya_1747414281_3633896832938317844_42066713148.webp
/**
 *
 * @param {any} vehicleType - An enum instance of VehicleType (ClassicCars, ModernClassics, Automobiles)
 * @param { string } searchQuery - The search query from the user. Null means show everyhting.
 * @param { any } sortOption - how to sort (inclusive of price and date posted)
 * @returns
 */
function CarList({ searchQuery, carList, error, correctVehicleType }) {

  useEffect(() => {
    console.log(`carList.at(0)?.carType is`, carList.at(0)?.carType);
    console.log(`correctVehicleType is `, correctVehicleType);
  }, [correctVehicleType, carList]);


  let displayData;

  // displayData = Loading();

  /* Initial Loading happening

  */
  // Search has happened, no results */
  if (carList.length === 0 && searchQuery) {
    displayData = (
      <div className={styles.noCarsFound}>
        <p>No Cars Found</p>
      </div>
    );
  } else if (carList.length > 0 && (carList.at(0)?.carType === correctVehicleType?.value || correctVehicleType == null)) {
    /* Search has happened, results available

    */
    displayData = (
      <div className={styles.carList}>
        {carList.map((car, idx) => (
          <CarCard
            key={idx}
            name={car.name}
            price={car.price}
            coverImage={car.coverImage}
            detailsPath={`/${car.carType}/${car.slugName}`}
          />
        ))}
      </div>
    );
  } else {
    displayData = (
      <div className="loading" style={{ marginTop: "12vh" }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      {displayData}

      <div className={`${styles.errorMessage} ${error && styles.active}`}>
        <p>Error occurred: {error}</p>
      </div>
    </>
  );
}

export default CarList;




