import React, { useState } from "react";
import styles from "../components/car-list/CarList.module.css";
import "prop-types";
import { Link } from "react-router-dom";
import { VehicleStatus } from "../models/VehicleStatus";
import { LazyLoadImage } from "react-lazy-load-image-component";

/**
 *
 * @function
 *
 * @param {string} name - Name of Car
 * @param {string} coverImage - Cover image of Car
 * @param {int} price - Price of Car
 * @returns
 */
function CarCard({ name, coverImage, vehicleStatus, price, detailsPath }) {
  let formattedPrice = `KES ${price.toLocaleString("en-KE")}`;

  return (
    <Link className={styles.carCard} to={detailsPath}>
      <LazyLoadImage
        className={styles.carImage}
        alt={`Image of the ${name}`}
        src={coverImage}
        effect="blur"
        placeholderSrc="/car-placeholder.png"
        wrapperProps={{
          // If you need to, you can tweak the effect transition using the wrapper style.
          style: {
            transitionDelay: "0.5s"
          },
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/car-placeholder.png";
        }}
      />
      <p className={styles.name}>{name}</p>
      {vehicleStatus === VehicleStatus.Available ? (
        <p className={styles.price}>{formattedPrice}</p>
      ) : (
        <></>
      )}
    </Link>
  );
}

export default CarCard;
