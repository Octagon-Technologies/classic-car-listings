import { useParams } from "react-router-dom";
import styles from "./DetailsPage.module.css";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faClose,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
import carPlaceholder from "../../assets/images/design/car-placeholder.jpg";
import carSample from "../../assets/images/design/car-sample.webp";
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
  const [car, setCar] = useState();
  const [coverImageLoaded, setCoverImageLoaded] = useState(false);
  const [viewImageIndex, setViewImageIndex] = useState(null);
  const { carType, carSlugName } = useParams();

  useEffect(() => {
    async function fetchCarDetails() {
      const { data, error } = await supabase
        .from("cars")
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
        type: data.carType,
        coverImage: data.coverImage,
        features: data.features,
      });
    }

    fetchCarDetails();
  }, [carSlugName]);

  useEffect(() => {
    const backHandler = (e) => {
      if (Number.isInteger(viewImageIndex)) {
        e.preventDefault();
        setViewImageIndex(null);
        window.history.pushState(null, document.title);
      }
    };

    window.addEventListener("popstate", backHandler);
    window.history.pushState(null, document.title);

    return () => {
      window.removeEventListener("popstate", backHandler);
    };
  }, [viewImageIndex]);

  function handleLeftImagePreviewClick() {
    setViewImageIndex((c) => (c === 0 ? car.images.length - 1 : c - 1));
  }

  function handleRightImagePreviewClick() {
    setViewImageIndex((c) => (c === car.images.length - 1 ? 0 : c + 1));
  }

  useArrows({
    scrollLeft: handleLeftImagePreviewClick,
    scrollRight: handleRightImagePreviewClick,
    onEscape: () => {
      setViewImageIndex(null);
    },
  });

  return (
    <div className={styles.main}>
      {Number.isFinite(viewImageIndex) ? <></> : <Header />}
      <div className={styles.header}>
        <img
          src={car?.coverImage}
          alt=""
          style={{
            opacity: coverImageLoaded ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
          onLoad={() => setCoverImageLoaded(true)}
        />
      </div>

      <div
        style={{
          opacity: coverImageLoaded ? 1 : 0,
          transition: "opacity 2s ease",
          background: "#fefefe",
        }}
      >
        {car ? (
          <div>
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
                  {car.images.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      onClick={() => {
                        setViewImageIndex(index);
                        console.log(`index is ${index}`);
                      }}
                    ></img>
                  ))}
                </ul>
              </div>
            </div>
            {!Number.isFinite(viewImageIndex) ? (
              <a
                href={`https://wa.me/254794940110/?text=${encodeURIComponent(
                  `I wish to inquire about the ${car.name} I saw on your page ${window.location.href}`
                )}`}
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
            ) : (
              <></>
            )}

            {Number.isFinite(viewImageIndex) ? (
              <div className={styles.viewImage}>
                <div className={styles.topBar}>
                  <p>{`${viewImageIndex + 1}/${car.images.length}`}</p>

                  <div className={styles.icons}>
                    {/* <FontAwesomeIcon icon={faMagnifyingGlassPlus} /> */}
                    <FontAwesomeIcon
                      icon={faClose}
                      onClick={() => setViewImageIndex(null)}
                    />
                  </div>
                </div>

                {/* <div className={styles.actualImage}> */}
                <img src={car.images[viewImageIndex]} alt="" />
                {/* </div> */}

                <div className={styles.navigation}>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onDoubleClick={null}
                    onClick={handleLeftImagePreviewClick}
                  />

                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onDoubleClick={null}
                    onClick={handleRightImagePreviewClick}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

// (
// <div className="emptyContainer">
//   <div className="spinner"></div>
// </div>
// )

function useArrows({ scrollLeft, scrollRight, onEscape }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();

      if (event.key == "ArrowLeft" || event.key === "ArrowUp") {
        scrollLeft?.();
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        scrollRight?.();
      } else if (event.key === "Escape") {
        onEscape?.();
      }
    };

    window.document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.document.removeEventListener("keydown", handleKeyDown);
    };
  }, [scrollLeft, scrollRight]);
}

export default DetailsPage;

// const [car, setCar] = useState({
//   name: "2006 Land Rover",
//   price: 12000000,
//   images: [
//     "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/0",
//     "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/1",
//     "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/2",
//     "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/3",
//     "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/4",
//     "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/5",
//     "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/6",
//     "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/7",
//     "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/8",
//     "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/9",
//     "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/10",
//     "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/11",
//     "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/12",
//     "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/13",
//     "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2002-land-rover-2025-05-27/14",
//   ],
//   type: "classic-cars",
//   features: [
//     "Manual 5-Speed. ",
//     "2500cc TD5 Turbo Diesel.\n          ",
//     "Half Leather /Alcantara interior. ",
//     "️Double Sunroof (Both Working).\n          ",
//     "4 Man Rooftop Camping Tent. ",
//     "ARB Bullbar. ",
//     "New Terrafinna Shocks &\n          Coil springs. ",
//     'Brand New Tires with 2"Inch Lift Kit. ',
//     "Amazing Music\n          System. ",
//     "Travelled 186,236KMS. ",
//     "Runs & Drives Amazing. ",
//     "New Gen\n          Plate with Quick NTSA Transfer To You.",
//   ],
// });

// {
//   car ? (
// <div style={{ background: "#fefefe" }}>
//   <div className={styles.header}>
//     <img src={car.coverImage} alt="" />
//   </div>
//   <div className={styles.body}>
//     <h2> {car.name} </h2>

//     <div className={styles.price}>
//       <h6>List price</h6> <p>{toKESPrice(car.price)}</p>
//     </div>

//     <div className={styles.features}>
//       <h3>Features</h3>
//       <ul>
//         {car.features.map((feature, idx) => (
//           <li key={idx}>
//             <img src={tick} alt="" />
//             <p> {feature}</p>
//           </li>
//         ))}
//       </ul>
//     </div>

//     <div className={styles.gallery}>
//       <h3>Gallery</h3>

//       <ul>
//         {car.images.map((url, index) => (
//           <img
//             key={index}
//             src={url}
//             onClick={() => {
//               setViewImageIndex(index);
//               console.log(`index is ${index}`);
//             }}
//           ></img>
//         ))}
//       </ul>
//     </div>
//   </div>
//   {!Number.isFinite(viewImageIndex) ? (
//     <a
//       href={`https://wa.me/254794940110/?text=${encodeURIComponent(
//         `I wish to inquire about the ${car.name} I saw on your page ${window.location.href}`
//       )}`}
//       target="_blank"
//       className={styles.contactTab}
//     >
//       {/* <div> */}
//       <p>
//         Contact on <span>Whatsapp</span>
//       </p>
//       <FontAwesomeIcon
//         className={styles.whatsappIcon}
//         icon={faSquareWhatsapp}
//       />
//       {/* </div> */}
//     </a>
//   ) : (
//     <></>
//   )}

//   {Number.isFinite(viewImageIndex) ? (
//     <div className={styles.viewImage}>
//       <div className={styles.topBar}>
//         <p>{`${viewImageIndex + 1}/${car.images.length}`}</p>

//         <div className={styles.icons}>
//           {/* <FontAwesomeIcon icon={faMagnifyingGlassPlus} /> */}
//           <FontAwesomeIcon
//             icon={faClose}
//             onClick={() => setViewImageIndex(null)}
//           />
//         </div>
//       </div>

//       {/* <div className={styles.actualImage}> */}
//       <img src={car.images[viewImageIndex]} alt="" />
//       {/* </div> */}

//       <div className={styles.navigation}>
//         <FontAwesomeIcon
//           icon={faChevronLeft}
//           onDoubleClick={null}
//           onClick={handleLeftImagePreviewClick}
//         />

//         <FontAwesomeIcon
//           icon={faChevronRight}
//           onDoubleClick={null}
//           onClick={handleRightImagePreviewClick}
//         />
//       </div>
//     </div>
//   ) : (
//     <></>
//   )}
// </div>
//   ) : (
//     <div className={styles.emptyContainer}>
//       <div className={styles.spinner}></div>
//     </div>
//   );
// }
