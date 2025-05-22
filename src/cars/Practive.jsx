import React, { useState } from "react";

function Practice() {
  const [cars, setCars] = useState([]);
  const [newCarYear, setNewCarYear] = useState(
    new Date().getFullYear().toString()
  );
  const [newCarName, setNewCarName] = useState("");
  const [newCarModel, setNewCarModel] = useState("");

  function addCar() {
    const newCar = {
      name: newCarName,
      model: newCarModel,
      year: newCarYear,
    };

      setCars((c) => [...c, newCar]);
      setNewCarName("")
      setNewCarModel("")
      setNewCarYear("")
  }

  function removeCar(idx) {
    setCars((c) => c.filter((_, idx) => idx !== index));
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "70%",
        marginLeft: "12px",
        gap: "6px",
      }}
    >
      <h3>List of Cars</h3>
      <ul>
        {cars.map((car, idx) => (
          <li
            key={idx}
            onClick={() => removeCar(idx)}
          >{`${car.name} ${car.model} ${car.year}`}</li>
        ))}
      </ul>

      <input
        type="text"
        name="car-name"
        placeholder="Car Name"
        value={newCarName}
        onChange={(e) => setNewCarName(e.target.value)}
      />
      <input
        type="text"
        name="car-model"
        value={newCarModel}
        placeholder="Car Model"
        onChange={(e) => setNewCarModel(e.target.value)}
      />

      <YearDropdown
        onChange={(event) => setNewCarYear(event.target.value)}
        selectedYear={newCarYear}
      ></YearDropdown>

      <button onClick={addCar}>Submit</button>
    </div>
  );
}

const YearDropdown = ({
  startYear = 1980,
  selectedYear,
  onChange = (event) => {},
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear },
    (_, yearsSince) => currentYear - yearsSince
  );

  return (
    <select name="year-picker" value={selectedYear} id="" onChange={onChange}>
      <option value="">Select the car year</option>
      {years.map((year) => (
        <option>{year}</option>
      ))}
    </select>
  );
};

export default Practice;
