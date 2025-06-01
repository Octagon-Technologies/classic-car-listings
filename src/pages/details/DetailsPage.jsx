import { data, useParams } from "react-router-dom";
import styles from "./DetailsPage.module.css";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
import carPlaceholder from "../../assets/images/design/car-placeholder.jpg";
import tick from "../../assets/images/design/tick-svg.png";
import Header from "../../home/Header.jsx";
import { toKESPrice } from "../../utils/StringUtils.jsx";
import { Link } from "react-router-dom";

const SUPABASE_URL = "https://xxsbhmnnstzhatmoivxp.supabase.co";
const supabase = createClient(
  "https://xxsbhmnnstzhatmoivxp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4c2JobW5uc3R6aGF0bW9pdnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzczMDAsImV4cCI6MjA2Mjk1MzMwMH0.p8UVJF_QzsFh0yJFTtHbJ8pdrjR9LSDg0xjIGrZNuK0"
);

function DetailsPage() {
  const { carType, carSlugName } = useParams();
  const [car, setCar] = useState({
    name: "2006 Land Rover",
    price: 12000000,
    images: [
      "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/0",
      "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/1",
      "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/2",
      "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/3",
      "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/4",
      "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/5",
      "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/6",
      "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/7",
      "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/8",
      "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/9",
      "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/10",
      "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/11",
      "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/12",
      "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/13",
      "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/14",
    ],
    type: "classic-cars",
    features: [
      "Manual 5-Speed. ",
      "2500cc TD5 Turbo Diesel.\n          ",
      "Half Leather /Alcantara interior. ",
      "️Double Sunroof (Both Working).\n          ",
      "4 Man Rooftop Camping Tent. ",
      "ARB Bullbar. ",
      "New Terrafinna Shocks &\n          Coil springs. ",
      'Brand New Tires with 2"Inch Lift Kit. ',
      "Amazing Music\n          System. ",
      "Travelled 186,236KMS. ",
      "Runs & Drives Amazing. ",
      "New Gen\n          Plate with Quick NTSA Transfer To You.",
    ],
  });

  useEffect(() => {
    async function fetchCarDetails() {
      const { data, error } = await supabase
        .from(carType)
        .select()
        .eq("slugName", carSlugName)
        .single();

      if (error) {
        console.log(error.message);
        return;
      }

      //   console.log(`name is ${data.name}`);
      //   console.log(`price is ${data.price}`);
      //   console.log(`images is ${data.images}`);
      //   console.log(`type is ${data.type}`);
      //   console.log(`features is ${data.features}`);

      setCar({
        name: data.name,
        price: data.price,
        images: data.images,
        type: data.type,
        features: data.features,
      });
    }

    // fetchCarDetails();
  }, [carSlugName]);

  return (
    <>
      {/* <div className={styles.topBar}>
        <FontAwesomeIcon icon={faChevronLeft} className={styles.icon} />

        <p className={styles.title}>{car.name ? car.name : "Loading..."}</p>
      </div> */}

      <Header />

      {car ? (
        <>
          <div className={styles.header}>
            <img src={car.images[0]} alt="" />
          </div>
          <div className={styles.body}>
            <h2> {car.name} </h2>

            <div className={styles.price}>
              <h6>List price</h6> <p>{toKESPrice(car.price)}</p>
            </div>

            <div className={styles.features}>
              <h3>Features</h3>
              <ul>
                {car.features.map((feature, idx) => (
                  <li key={idx}>
                    <img src={tick} alt="" />
                    <p> {feature}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.gallery}>
              <h3>Gallery</h3>

              <ul>
                {car.images.map((url) => (
                  <img key={url} src={url}></img>
                ))}
              </ul>
            </div>
          </div>

          <a
            href={`https://wa.me/254794940110/?text=I wish to inquire about the ${car.name} I saw on your page ${window.location.href}`}
            target="_blank"
            className={styles.contactTab}
          >
            {/* <div> */}
            <p>
              Contact on <span>Whatsapp</span>
            </p>
            <FontAwesomeIcon
              className={styles.whatsappIcon}
              icon={faSquareWhatsapp}
            />
            {/* </div> */}
                  </a>
                  

                  <div>
                      
                  </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default DetailsPage;
