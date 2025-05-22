import React, { useState } from "react";
import "prop-types";
import PropTypes from "prop-types";

function CarCard({ name, image, price }) {

    let formattedPrice = `KES ${price.toLocaleString("en-KE")}`

  return (
    <div className="car-card">
      <img src={image} alt={"Image of the " + name} />
      <p className="name">{name}</p>
      <p className="price">{formattedPrice}</p>
    </div>
  );
}

CarCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
};

export default CarCard;
