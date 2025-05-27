import React, { useState } from "react";
import styles from "../VehiclesPage.module.css";
import "prop-types";
import PropTypes from "prop-types";


/**
 * 
 * @function
 * 
 * @param {string} name - Name of Car 
 * @param {string} image - Image of Car 
 * @param {int} price - Price of Car 
 * @returns 
 */
function CarCard({ name, image, price }) {
  let formattedPrice = `KES ${price.toLocaleString("en-KE")}`;

  return (
    <div className={styles.carCard}>
      <img src={image} alt={"Image of the " + name} />
      <p className={styles.name}>{name}</p>
      <p className={styles.price}>{formattedPrice}</p>
    </div>
  );
}

CarCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
};

export default CarCard;
