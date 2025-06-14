import CarCard from "../CarCard";
import React, { useState, useEffect } from "react";
import styles from "./CarList.module.css";
import { supabase } from "../../../../config/config";
import SortOption from "../../models/SortOption";
import Loading from "../../../../home/Loading";
import { VehicleStatus } from "../../models/VehicleStatus";
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
function CarList({ vehicleType, searchQuery, sortOption, vehicleStatus }) {
  const [carList, setCarList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCarImages() {
      let request = supabase
        .from("cars")
        .select()

      if (vehicleType) {  
        request = request.eq("carType", vehicleType.value);
      } else {
        request = request.in("carType", ["classic-cars", "modern-classics"]);
      }
      
      if (vehicleStatus === VehicleStatus.Available) 
      { request = request.eq("sold", "false") }
      else if (vehicleStatus === VehicleStatus.Sold)
      { request = request.eq("sold", "true") }

      request = searchQuery
        ? request.ilike("name", `%${searchQuery}%`)
        : request;

      request = sortOption
        ? request.order(sortOption.name, {
            ascending: sortOption.order === "ascend",
          })
        : request.order("datePosted", { ascending: false });

      const { data, error } = await request;

      if (error) {
        setError(error.message);
      }

      console.log(`data is ${data.length}`);
      console.log(`sortOption is ${sortOption?.key}`);

      setCarList(
        data.map((car) => ({
          name: car.name, //"Ford Ranger 2023",
          price: car.price,
          image: car.coverImage,
          slugName: car.slugName,
          carType: car.carType,
          //"https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002%20Land%20Rover/classiccarlistingskenya_1747414281_3633896832938317844_42066713148.webp",
        }))
      );
    }

    fetchCarImages();

    console.log(carList.toString());
  }, [searchQuery, sortOption, vehicleStatus]);

  let displayData;

  // displayData = Loading();

  // Search has happened, no results */
  if (carList.length === 0 && searchQuery) {
    displayData = (
      <div className={styles.noCarsFound}>
        <p>No Cars Found</p>
      </div>
    );
  } else if (carList.length > 0) {
    /* Search has happened, results available

    */
    displayData = (
      <div className={styles.carList}>
        {carList.map((car, idx) => (
          <CarCard
            key={idx}
            name={car.name}
            price={car.price}
            image={car.image}
            detailsPath={`/${car.carType}/${car.slugName}`}
          />
        ))}
      </div>
    );
  } else {
    /* Initial Loading happening

  */
    displayData = (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
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
