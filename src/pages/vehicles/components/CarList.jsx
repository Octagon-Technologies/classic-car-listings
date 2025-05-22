import CarCard from "./CarCard";
import React, { useState, useEffect } from "react";
// import { supabase } from "../config/config";

import { supabase } from "../../../config/config";
// import { SUPABASE_URL } from "../config/config";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   "https://xxsbhmnnstzhatmoivxp.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4c2JobW5uc3R6aGF0bW9pdnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzczMDAsImV4cCI6MjA2Mjk1MzMwMH0.p8UVJF_QzsFh0yJFTtHbJ8pdrjR9LSDg0xjIGrZNuK0"
// );

//xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002%20Land%20Rover/classiccarlistingskenya_1747414281_3633896832938317844_42066713148.webp
function CarList({ searchQuery }) {
  const [carList, setCarList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // async function fetchCarImages() {
    //   const folder = "list/2002 Land Rover";

    //   const { data, error } = await supabase.storage.from("cars").list(folder);
    //   if (error) {
    //     console.error("Error fetching images:", error.message);
    //     return;
    //   }

    //   console.log(`data is ${data}`);

    //   const images = data.map((img) => {
    //     return {
    //       name: "Ford Ranger 2023",
    //       price: 8000000,
    //       image: `${SUPABASE_URL}/storage/v1/object/public/cars/${folder}/${img.name}`,
    //     };
    //   });

    //   console.log(`images.length is ${images.length}`);
    //   setCarList(images);
    // }

    // fetchCarImages();

    async function fetchCarImages() {
      let request = supabase.from("cars").select();

      request = searchQuery
        ? request.ilike("name", `%${searchQuery}%`)
        : request;

      const { data, error } = await request;

      if (error) {
        setError(error.message);
      }

      console.log(`data is ${data.length}`);

      setCarList(
        data.map((car) => ({
          name: car.name, //"Ford Ranger 2023",
          price: car.price,
          image: car.car_images[0],
          //"https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002%20Land%20Rover/classiccarlistingskenya_1747414281_3633896832938317844_42066713148.webp",
        }))
      );
    }

    fetchCarImages();

    console.log(carList.toString());
  }, [searchQuery]);

  // const toggleIsError = (event) => {
  //     const isChecked = event.target.checked
  //     console.log(`isChecked is ${isChecked}`);
  //     setError(isChecked ? "true" : null)
  // }

  //   if (carList.length === 0 && searchQuery) {
  //     <div className="no-cars-found">
  //       <p>No Cars Found</p>
  //     </div>;
  //   } else if (carList.length > 0) {
  //     <div className="car-list">
  //       {carList.map((car, idx) => (
  //         <CarCard
  //           key={idx}
  //           name={car.name}
  //           price={car.price}
  //           image={car.image}
  //         />
  //       ))}
  //     </div>;
  //   } else {
  //     <div className={`error-message ${error && "active"}`}>
  //       <p>Error occurred: {error}</p>
  //     </div>;
  //   }

  let displayData;

  /* 
  
  
  Search has happened, no results */
  if (carList.length === 0 && searchQuery) {
    displayData = (
      <div className="no-cars-found">
        <p>No Cars Found</p>
      </div>
    );
  } else if (carList.length > 0) {
    /* Search has happened, results available 
    
    */
    displayData = (
      <div className="car-list">
        {carList.map((car, idx) => (
          <CarCard
            key={idx}
            name={car.name}
            price={car.price}
            image={car.image}
          />
        ))}
      </div>
    );
  } else {
    /* Initial Loading happening
  
  */
    displayData = (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

//   displayData = (
//     <div className="loading">
//       <div className="spinner"></div>
//     </div>
//   );

  return (
    <>
      {/* <label htmlFor="turnError">Toggle Error</label>
      <input
        type="checkbox"
        name="turnError"
              id="turnError"
              checked={error}
        onChange={toggleIsError}
          /> */}

      {displayData}

      <div className={`error-message ${error && "active"}`}>
        <p>Error occurred: {error}</p>
      </div>
    </>
  );
}

export default CarList;
