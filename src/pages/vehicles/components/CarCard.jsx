import React, { useState } from "react";
import styles from "../components/car-list/CarList.module.css"
import "prop-types";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 *
 * @function
 *
 * @param {string} name - Name of Car
 * @param {string} coverImage - Cover image of Car
 * @param {int} price - Price of Car
 * @returns
 */
function CarCard({ name, coverImage, price, detailsPath }) {
  let formattedPrice = `KES ${price.toLocaleString("en-KE")}`;

  return (
    <Link className={styles.carCard} to={detailsPath}>
      <img src={coverImage} alt={`Image of the ${name}`} />
      <p className={styles.name}>{name}</p>
      <p className={styles.price}>{formattedPrice}</p>
    </Link>
  );
}

CarCard.propTypes = {
  name: PropTypes.string,
  coverImage1: PropTypes.string,
  price: PropTypes.number,
};

export default CarCard;
