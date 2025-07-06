import styles from "./VehiclePage.module.css";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpWideShort,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import CarList from "./components/car-list/CarList";
import SortOption from "./models/SortOption";
import Header from "../../home/Header";
import { VehicleStatus } from "./models/VehicleStatus";
import { useEffect } from "react";
import { supabase } from "../../config/config";
import { OtherTypes } from "./models/VehicleTypes";

function VehiclesPage({ vehicleType, otherType }) {

  // Either vehicleType or othertype (meaning everything, all cars, classics, modern, bikes, and boats)
  const daMachine = vehicleType ?? otherType

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState(null);
  const [vehicleStatus, setVehicleStatus] = useState(VehicleStatus.Available);
  const [carList, setCarList] = useState([]);
  const [error, setError] = useState(null);

  // Morris: 0732074125

  function handlePriceAscend() {
    setSortOption(new SortOption("price-ascend", "price", "ascend"));
  }
  function handlePriceDescend() {
    setSortOption(new SortOption("price-descend", "price", "descend"));
  }
  function handleDateAscend() {
    setSortOption(new SortOption("date-ascend", "datePosted", "ascend"));
  }
  function handleDateDescend() {
    setSortOption(new SortOption("date-descend", "datePosted", "descend"));
  }

  function handleVehicleStatus(e) {
    setVehicleStatus(e.target.value);
  }

  useEffect(() => {
    console.log(`vehicleType is ${vehicleType} and otherType is ${otherType}`);
  }, [vehicleType, otherType])

  useEffect(() => {
    if (searchQuery === "") return;

    // Only push a new history state once when opening the image viewer
    const isFirstSearchQuery = window.history.state?.modal !== true;
    if (isFirstSearchQuery) {
      window.history.pushState({ modal: true }, "");
    }

    const backHandler = (_) => {setSearchQuery("");};

    window.addEventListener("popstate", backHandler);

    return () => {
      window.removeEventListener("popstate", backHandler);
    };
  }, [searchQuery]);


  useEffect(() => {
    console.log("Before: setSearchQuery(``)");
    setSearchQuery(""); // triggers the searchQuery effect below
    console.log("After: setSearchQuery(``)");
    setVehicleStatus(VehicleStatus.Available);
  }, [daMachine])

  useEffect(() => {
    console.log(
      "Before: default fetchCarImages() call. Query is ", searchQuery
    );
    fetchCarImages();
    console.log("After: default fetchCarImages() call. Query is ", searchQuery);
  }, [searchQuery, sortOption, vehicleStatus]);

  useEffect(() => {
    // Inital load already done
    if (
      carList.at(0)?.carType === vehicleType 
    ) {
      return;
    }

    fetchCarImages();
    console.log("After: fetchCarImages() call");
  }, [daMachine]);

  async function fetchCarImages() {
    let request = supabase.from("cars").select();

    if (vehicleType?.value) {
      request = request.eq("carType", vehicleType.value);
      console.log(`fetchCarImages: vehicleType is `, vehicleType);
    } else if (daMachine?.value === OtherTypes.AllCars) {
      request = request.in("carType", ["classic-cars", "modern-classics"]);
      console.log("fetchCarImages: otherType is ", otherType);
    } else {
      request = request;
      console.log("daMachine?.value is ", daMachine?.value);
      console.log("fetchCarImages: no filter applied to cars");
    }

    if (vehicleStatus === VehicleStatus.Available) {
      request = request.eq("sold", "false");
    } else if (vehicleStatus === VehicleStatus.Sold) {
      request = request.eq("sold", "true");
    }

    request = searchQuery ? request.ilike("name", `%${searchQuery}%`) : request;

    request = sortOption
      ? request.order(sortOption.name, {
          ascending: sortOption.order === "ascend",
        })
      : request.order("datePosted", { ascending: false });

    const { data: carsData, error: carsError } = await request;

    if (carsError) {
      setError(carsError.message);
    }

    // console.log(`carsData is ${carsData.length}`);
    // console.log(`sortOption is ${sortOption?.key}`);

    // TEMPORARY FIX TO THE DOUBLE CAR FETCH
    /** 
     * For some reason, the second call to this function resets the carList value to []. Why? Not sure.
     * However, the searchQuery is empty when the inital call is made (according to the logs)
     * So it can't be a situation of wrong search... Debug this later
     */
    if (searchQuery === "" || carsData.length > 0) {
      setCarList(carsData);
    }
  }

  const hasPartSchema = carList.map((car) => ({
    "@type": "Product",
    name: `${car.name}`,
    image: car.coverImage, // full URL(s)
    description: `At a price of KES ${car.price}, get yourself a well-maintained ${car.name}`,
    sku: car.slugName,
    // brand: { "@type": "Brand", name: car.make },
    offers: {
      "@type": "Offer",
      priceCurrency: "KES",
      price: car.price,
      availability: "https://schema.org/InStock",
      url: `https://classiccarlistings.co.ke/${car.carType}/${car.slugName}`,
    },
    itemCondition: "https://schema.org/UsedCondition",
  }));

  return (
    <div>
      <Helmet>
        <title>
          {`Classic ${
            daMachine?.groupKeyword ?? "Cars"
          } for Sale Kenya | Classic Car Listings`}
        </title>
        <meta
          name="description"
          content={`Find and buy well-maintained classic ${
            daMachine?.groupKeyword.toLowerCase() ?? "cars"
          } on Kenya's leading car dealership`}
        />
        <meta
          name="keywords"
          content="classic cars Kenya, bikes for sale, cheap cars in Kenya, cars for sale Kenya, classic car listings, classic cars for sale Kenya, modern classics Kenya, modern classics for sale Kenya, bikes for sale Kenya, vespas Kenya, vespas for sale Kenya"
        />
        <link
          rel="canonical"
          href={`https://classiccarlistings.co.ke/${daMachine?.value ?? ""}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content="Classic Car Listings Kenya" />
        <meta
          property="og:description"
          content="Buy and sell classic cars in Kenya."
        />
        <meta
          property="og:image"
          content="https://classiccarlistings.co.ke/og-image.png"
        />
        <meta
          property="og:url"
          content={`https://classiccarlistings.co.ke/${daMachine?.value ?? ""}`}
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Classic Car Listings Kenya" />
        <meta
          name="twitter:description"
          content="Kenya’s leading platform for classic cars."
        />
        <meta
          name="twitter:image"
          content="https://classiccarlistings.co.ke/og-image.png"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `Classic ${daMachine?.groupKeyword ?? "Cars"} for Sale`,
            description: `Find a wide selection of classic well-maintained ${
              daMachine?.groupKeyword?.toLowerCase() ?? "cars"
            } available for purchase in Kenya. Trusted listings. Quality vehicles.`,
            url: `https://classiccarlistings.co.ke/${daMachine?.value ?? ""}`,
            hasPart: hasPartSchema,
          })}
        </script>
      </Helmet>

      <Header />

      <div className={styles.body}>
        <div className={styles.searchSection}>
          <h1 className="seoHeader">{`Classic ${daMachine?.groupKeyword?.toLowerCase() ?? "Cars"} for sale in Kenya`}</h1>
          
          <h2 className="seoHeader">Kenya’s Trusted Classic Car Marketplace</h2>
          <h2 className="seoHeader">Explore Classic Car Listings Across Kenya</h2>

          <h1 className={styles.title}>
            {/* Explore a vast array of well-maintained classics */}
            {`Explore our vast collection of well-maintained classic ${
              daMachine?.groupKeyword?.toLowerCase() ?? "cars"
            }`}
          </h1>
          <div className={styles.searchBar}>
            <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} />
            <input
              type="text"
              placeholder={`Search for your desired ${
                daMachine?.keyword?.toLowerCase() ?? "car"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.searchActions}>
            <div className={styles.sort}>
              <select
                value={sortOption ? sortOption.key : ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "price-ascend") handlePriceAscend();
                  else if (value === "price-descend") handlePriceDescend();
                  else if (value === "date-ascend") handleDateAscend();
                  else if (value === "date-descend") handleDateDescend();
                  else setSortOption(null);
                }}
              >
                <option value="">Sort</option>
                <option value="price-ascend">Price: Lowest To Highest</option>
                <option value="price-descend">Price: Highest To Lowest</option>
                <option value="date-ascend">
                  Earliest To Latest (Date Posted)
                </option>
                <option value="date-descend">
                  Latest To Earliest (Date Posted)
                </option>
              </select>
              <FontAwesomeIcon icon={faArrowUpWideShort} />
            </div>
            <div className={styles.search}>
              <p>Search</p>
            </div>
          </div>
        </div>

        <select
          className={styles.filterCategory}
          value={vehicleStatus}
          onChange={handleVehicleStatus}
        >
          <option value={VehicleStatus.Available}>
            Show {VehicleStatus.Available} {daMachine?.groupKeyword ?? "Cars"}
          </option>
          <option value={VehicleStatus.Sold}>
            Show {VehicleStatus.Sold} {daMachine?.groupKeyword ?? "Cars"}
          </option>
        </select>

        <CarList
          searchQuery={searchQuery}
          vehicleStatus={vehicleStatus}
          carList={carList}
          correctVehicleType={vehicleType}
          error={error}
          className={styles.carList}
        />
        {/* <div className={styles.carList}>
        <div className={styles.car}></div>
      </div> */}
      </div>
    </div>
  );
}

export default VehiclesPage;
