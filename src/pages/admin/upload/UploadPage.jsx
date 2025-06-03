import React, { useState } from "react";
import Header from "../../../home/Header";
import styles from "./UploadPage.module.css";
import { ReactSortable } from "react-sortablejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@supabase/supabase-js";
import { slugifyCarName, toKESPrice } from "../../../utils/StringUtils";
import imageCompression from "browser-image-compression";

const SUPABASE_URL = "https://xxsbhmnnstzhatmoivxp.supabase.co";
const supabase = createClient(
  "https://xxsbhmnnstzhatmoivxp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4c2JobW5uc3R6aGF0bW9pdnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzczMDAsImV4cCI6MjA2Mjk1MzMwMH0.p8UVJF_QzsFh0yJFTtHbJ8pdrjR9LSDg0xjIGrZNuK0"
);

const VehicleTypes = [
  { label: "Classic Cars", value: "classic-cars" },
  { label: "Modern Classics", value: "modern-classics" },
  { label: "Classic Bikes", value: "classic-bikes" },
  { label: "Automobiles", value: "automobiles" },
];

function UploadPage() {
  const [carName, setCarName] = useState(); //useState("2002 Land Rover");
  const [carPrice, setCarPrice] = useState(); //3400000
  const [formattedCarPrice, setFormattedCarPrice] = useState(); //KES 3,400,000

  const [carType, setCarType] = useState(VehicleTypes[0].value);
  const [carFeatures, setCarFeatures] = useState("");
  const [carCoverImage, setCarCoverImage] = useState(null);

  let remoteCoverImage = null

  const [formattedCarFeatures, setFormattedCarFeatures] = useState(
    carFeatures.split(/✅|✔️|↪️/).filter(Boolean)
  );
  const [localImages, setLocalImages] = useState([]);
  const [activePreviewImageIndex, setActivePreviewImageIndex] = useState(0);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadAction, setUploadAction] = useState("Compressing Images");

  const [statusMessage, setStatusMessage] = useState(null);
  /*
    {
    isSuccess: true,
    message: "2002 Land Rover uploaded successfully"
    }
    */

  const onFileChange = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.onload = (outputFile) => {
        const imageUrl = outputFile.target.result;

        setLocalImages((l) => [...l, { image: imageUrl, fileName: file.name }]);
      };

      fileReader.readAsDataURL(file);
    });
  };

  function handleCarPrice(e) {
    const plainPrice = e.target.value;

    setCarPrice(plainPrice);
    setFormattedCarPrice(toKESPrice(plainPrice));
  }

  function handleSliderDotClick(index) {
    setActivePreviewImageIndex(index);
  }

  function handleLeftArrowClick() {
    setActivePreviewImageIndex((i) =>
      i === 0 ? localImages.length - 1 : i - 1
    );
    console.log(`activePreviewImageIndex is ${activePreviewImageIndex}`);
  }

  function handleRightArrowClick() {
    setActivePreviewImageIndex((i) =>
      i === localImages.length - 1 ? 0 : i + 1
    );
    console.log(`activePreviewImageIndex is ${activePreviewImageIndex}`);
  }

  function handleCarFeatures(e) {
    let plainCarFeatures = e.target.value.trim();
    setCarFeatures(plainCarFeatures);
    setFormattedCarFeatures(plainCarFeatures.split("✅").filter(Boolean));
  }

  function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  async function uploadCar() {
    if (!carName) {
      alert(`Error: carName is ${carName}`);
    } else if (!carPrice) {
      alert(`Error: carPrice is ${carPrice}`);
    } else if (!carType) {
      alert(`Error: carType is ${carType}`);
    } else if (!carFeatures) {
      alert(`Error: carFeatures is ${carFeatures}`);
    } else if (localImages.length === 0) {
      alert(`Error: Car Images cannot be ${localImages.length}`);
    } else if (!carCoverImage) {
      alert(`Select a cover image first`);
    } else {
      setIsUploading(true);

      const slugName = slugifyCarName(carName);
      const imageUrls = await uploadImages(slugName);

      const newCar = {
        name: carName, // string
        price: carPrice, // number
        type: carType, // string
        features: formattedCarFeatures, // list<string>
        images: imageUrls, // list<string>
        coverImage: remoteCoverImage, // string
        slugName: slugName, // string
      };

      const { data, error } = await supabase
        .from(carType)
        .insert(newCar)
        .select();

      console.log(`response.data is ${data}`);
      if (error) {
        setStatusMessage({
          isSuccess: false,
          message: "Error occurred. Try again",
        });
      } else {
        setStatusMessage({
          isSuccess: true,
          message: `${carName} uploaded successfully`,
        });
      }

      setTimeout(() => {
        setStatusMessage(null);
      }, 4000);

      setIsUploading(false);
    }
  }

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1080,
    useWebWorker: true,
  };

  function getUrlFromFullPath(fullPath) {
    return `${SUPABASE_URL}` + "/storage/v1/object/public/" + fullPath;
  }

  async function uploadImages(slugCarName) {
    const promises = localImages.map(async (localImageFile, index) => {
      const compressedFile = await imageCompression(
        dataURLtoFile(localImageFile.image, localImageFile.fileName),
        options
      );
      console.log(`compressedFile size ${compressedFile.size / 1024} KB`);
      console.log(`localImageFile size ${localImageFile.size / 1024} Kb`);

      setUploadProgress(Math.round(((index + 1) / localImages.length) * 100));
      return compressedFile;
    });

    let compressedImages = await Promise.all(promises);
    compressedImages = compressedImages.filter(Boolean);

    setUploadAction("Uploading photos");

    let urlList = await Promise.all(
      compressedImages.map(async (compImage, index) => {
        const { data, error } = await supabase.storage
          .from("cars")
          .upload(`list/${slugCarName}/${index}`, compImage);

        if (error) {
          console.log(`Failed to upload ${compImage}: ${error.message}`);
          return null;
        }

        setUploadProgress(
          Math.round(((index + 1) / compressedImages.length) * 100)
        );

        let remoteImage = getUrlFromFullPath(data.fullPath);
        console.log(`remoteImage is ${remoteImage}`);

        if (index === carCoverImage) {
          remoteCoverImage = remoteImage
        }

        return remoteImage;
      })
    );

    console.log(`urlList is ${urlList.toString()}`);
    urlList = urlList.filter(Boolean);
    console.log(`urlList is ${urlList.toString()}`);

    console.log(`remoteCoverImage is ${remoteCoverImage}`);

    return urlList;
  }

  return (
    <div
      style={{ height: "100vh", paddingBottom: "20px", position: "relative" }}
    >
      <Header />

      <div>
        <h6 className={styles.title}>New Car</h6>

        <div className={styles.field}>
          <label htmlFor="carName">Car Name</label>
          <input
            type="text"
            placeholder="2002 Land Rover"
            autoFocus
            required
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="carPrice">Price</label>
          <div className={styles.priceDisplay}>
            <input
              type="number"
              placeholder="2 000 000"
              required
              value={carPrice}
              onChange={handleCarPrice}
            />
            <p>{formattedCarPrice}</p>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="carType">Vehicle Type</label>

          <ul className={styles.carTypes}>
            {VehicleTypes.map((vehicle) => (
              <li
                key={vehicle.value}
                className={vehicle.value === carType ? styles.active : ""}
                onClick={() => setCarType(vehicle.value)}
              >
                {vehicle.label}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.field}>
          <label htmlFor="carFeatures">Features</label>
          <textarea
            placeholder="(Use a ✅ at the start of each feature)"
            required
            rows={10}
            value={carFeatures}
            onChange={handleCarFeatures}
          ></textarea>
        </div>

        <div className={styles.field}>
          <label htmlFor="carImages">Car Images</label>

          <div className={styles.inputImagesContainer}>
            <input
              type="file"
              accept="image/*"
              multiple
              required
              onChange={onFileChange}
            />

            <ReactSortable
              list={localImages}
              setList={setLocalImages}
              animation={200}
              direction="horizontal"
              delayOnTouchStart={true}
              delay={100} // More forgiving for mobile touch
              touchStartThreshold={5} // Optional, helps sensitivity
              className={styles.inputImages}
            >
              {localImages.map((localImage, index) => (
                <img
                  key={localImage.image}
                  src={localImage.image ? localImage.image : null}
                  onClick={() => {
                    setCarCoverImage(index);
                    setActivePreviewImageIndex(index);
                  }}
                ></img>
              ))}
            </ReactSortable>
          </div>
        </div>

        <div className={styles.field}>
          <label
            htmlFor="carCoverImage"
            style={{
              textAlign: "center",
              margin: "auto",
              marginTop: "20px",
              fontSize: "1.25rem",
            }}
          >
            Cover Image
          </label>

          <div className={styles.coverImage}>
            {Number.isFinite(carCoverImage) ? (
              <img src={localImages[carCoverImage].image} alt="" />
            ) : (
              <p style={{}}>
                👆🏾 <span>Click</span> on one of the images above to make it the
                cover image 👆🏾
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.preview}>
        <h6>Preview</h6>

        <div className={styles.previewCar}>
          <div className={styles.list}>
            <img src={localImages.at(activePreviewImageIndex)?.image} alt="" />

            <ul className={styles.sliderDots}>
              {localImages.map((_, idx) => (
                <li
                  key={idx}
                  className={
                    idx === activePreviewImageIndex ? styles.active : ""
                  }
                  onClick={() => handleSliderDotClick(idx)}
                ></li>
              ))}
            </ul>

            <div className={styles.sliderArrows}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ fontSize: "1.15rem" }}
                onClick={handleLeftArrowClick}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ fontSize: "1.15rem" }}
                onClick={handleRightArrowClick}
              />
            </div>
          </div>

          <h6 className={styles.name}>{carName}</h6>
          <p className={styles.cost}>{formattedCarPrice}</p>

          <div className={styles.features}>
            {formattedCarFeatures.map((feature, idx) => (
              <p key={idx}>{feature}</p>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.uploadBtn} onClick={uploadCar}>
        Upload
      </p>

      <div
        className={styles.uploadStatus}
        style={{ display: isUploading ? "flex" : "none" }}
      >
        {statusMessage ? (
          <div className={styles.finalStatus}>
            <h6 style={{ fontSize: "3rem" }}>
              {statusMessage.isSuccess ? "🥳" : "😭"}
            </h6>
            <p style={{ color: statusMessage.isSuccess ? "green" : "red" }}>
              {statusMessage.message}
            </p>
          </div>
        ) : (
          <>
            <div className={styles.progressBar}></div>
            <h6>{uploadProgress}%</h6>
            <p>
              {uploadAction}
              <br></br>
              <span>(Do not close tab)</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default UploadPage;

{
  /* ✅️SOLD * 🇬🇧 2002 Land Rover Discovery 2, TD5 2.5L Diesel ,Double
          Sunroof, Fully Built for Safari! An Honest Good Runner, Well
          Maintained. A Buy & Enjoy! 📽️Video In Last Slide 👉 💰Price Guide:
          950,000KES🇰🇪(Neg). ☎️0748-883-598 📌Viewing in Karen. "𝐾𝑒𝑛𝑦𝑎'𝑠 𝐿𝑒𝑎𝑑𝑖𝑛𝑔
          𝐶𝑙𝑎𝑠𝑠𝑖𝑐 𝐷𝑒𝑎𝑙𝑒𝑟𝑠ℎ𝑖𝑝" ✅Manual 5-Speed. ✅2500cc TD5 Turbo Diesel.
          ✅Half Leather /Alcantara interior. ✅️Double Sunroof (Both Working).
          ✅4 Man Rooftop Camping Tent. ✅ARB Bullbar. ✅New Terrafinna Shocks &
          Coil springs. ✅Brand New Tires with 2"Inch Lift Kit. ✅Amazing Music
          System. ✅Travelled 186,236KMS. ✅Runs & Drives Amazing. ✅New Gen
          Plate with Quick NTSA Transfer To You. */
}
