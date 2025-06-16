import { useEffect, useState } from "react";
import Header from "../../../home/Header";
import styles from "./AdminShowcase.module.css";
import { supabase } from "../../../config/config.jsx";
import { VehicleTypes } from "../../vehicles/models/VehicleTypes.jsx";
import Loading from "../../../home/Loading.jsx";
import { toKESPrice } from "../../../utils/StringUtils.jsx";
import shockedPerson from "../../../assets/images/design/shocked-person.jpg";
import { useRequireAuth } from "../../../utils/AuthUtils.jsx";

export default function AdminShowcase() {
  const [carType, setCarType] = useState("");
  const [cars, setCars] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null); // instance of Car

  useRequireAuth();

  useEffect(() => {
    fetchCars();
  }, [supabase, carType]);

  async function fetchCars() {
    let request = supabase.from("cars").select().order("datePosted", {
      ascending: false,
    });

    if (carType) {
      request = request.eq("carType", carType);
    }

    const { data, error } = await request;
    console.log(data);

    if (error) {
      console.log(error);
      return;
    }

    data.map((car) => ({
      coverImage: car.coverImage,
      name: car.name,
      price: car.price,
      sold: car.sold,
      slugName: car.slugName,
      datePosted: car.datePosted,
    }));
    setCars(data);
  }

  function handleCarType(e) {
    const selectedCarTypeValue = e.target.value;
    setCarType(selectedCarTypeValue);
  }

  async function handleCarSold(car, e) {
    const isSold = e.target.checked;
    setIsUpdating(true);

    const { error } = await supabase
      .from("cars")
      .update({ sold: isSold })
      .eq("slugName", car.slugName);

    console.log(error);
    setIsUpdating(false);
    fetchCars();
  }

  async function handleCarDelete() {
    if (!isDeleting) {
      return;
    }

    const car = isDeleting;
    const images = car.images.map((image) => `list/${image}`);
    console.log(images);
    const { data, error } = await supabase.storage.from("cars").remove(images);
    console.log(`Error is ${error}`);

    const deleteResponse = await supabase
      .from("cars")
      .delete()
      .eq("slugName", car.slugName);

    console.log(`deleteResponse.status is ${deleteResponse.status}`);
    setIsDeleting(null);
    fetchCars();
  }

  return (
    <>
      <Header />

      <div className={styles.body}>
        <div className={styles.filterCar}>
          <p>Filter vehicles to</p>
          <select
            value={carType}
            onChange={handleCarType}
            className={styles.carTypeSelect}
          >
            <option value="">All Vehicles</option>

            {Object.values(VehicleTypes).map((vehicle) => (
              <option key={vehicle.value} value={vehicle.value}>
                {vehicle.label}
              </option>
            ))}
          </select>
        </div>

        {!cars && <Loading />}
        {cars && (
          <div>
            <ul className={styles.cars}>
              {cars.map((car) => (
                <li className={styles.car} key={car.slugName}>
                  <img src={car.coverImage} alt="" />
                  <div className={styles.content}>
                    <h6>{car.name}</h6>
                    <p className={styles.price}> {toKESPrice(car.price)}</p>

                    <div className={styles.bottomBar}>
                      <div className={styles.sold}>
                        <p htmlFor="sold">Sold</p>

                        <label className={styles.switch}>
                          <input
                            type="checkbox"
                            checked={car.sold}
                            onChange={(e) => handleCarSold(car, e)}
                            id={styles.toggleSwitch}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>

                      <p
                        className={styles.carDelete}
                        onClick={() => setIsDeleting(car)}
                      >
                        Delete
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div
              className={`${styles.popup} ${styles.updating} ${
                isUpdating ? styles.active : ""
              }`}
            >
              <div className={styles.spinner}></div>
              <p>Updating Database</p>
            </div>

            <div
              className={`${styles.popup} ${styles.deleting} ${
                isDeleting ? styles.active : ""
              }`}
            >
              <img src={shockedPerson} alt="" />
              <p>Are you sure you want to delete this car?</p>

              <div className={styles.actions}>
                <p onClick={() => setIsDeleting(null)}>Cancel</p>
                <p onClick={handleCarDelete}>Delete</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
