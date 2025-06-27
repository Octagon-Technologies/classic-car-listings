import styles from "./EditVehiclePage.module.css";
import Header from "../../../home/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../../config/config";
import shockedPerson from "../../../assets/images/design/shocked-person.jpg";

export default function EditVehiclePage() {
  const { carSlugName } = useParams();
  const [car, setCar] = useState();
  const [carFeatures, setCarFeatures] = useState();
  const [isDeleting, setIsDeleting] = useState(null); // instance of Car

  useEffect(() => {
    async function fetchVehicleData() {
      const { data, error } = await supabase
        .from("cars")
        .select()
        .eq("slugName", carSlugName)
        .single();

      if (error) {
        console.error("Error", error);
        return;
      }

      setCar(data);
      setCarFeatures(data.features.map((feature) => `✅ ${feature}`).join(""));
      console.log(data);
    }

    fetchVehicleData();
  }, []);



  return (
    <>
      <Header />

      <h1>Update Car</h1>

      <div className={styles.body}>
        {car ? (
          <div className={styles.form}>
            <div className={styles.field}>
              <p className={styles.label}>Name</p>
              <input
                className={styles.value}
                type="text"
                value={car.name}
                onChange={(e) => setCar({ ...car, name: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <p className={styles.label}>Price</p>
              <input
                className={styles.value}
                type="text"
                value={car.price}
                onChange={(e) => setCar({ ...car, price: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <p className={styles.label}>Features</p>
              <textarea
                type="text"
                value={carFeatures}
                rows={10}
                onChange={(e) => setCarFeatures(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <p className={styles.label}>Images</p>
              <input type="file" multiple />
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className={styles.actions}>
          <p>Cancel</p>
          <p>Save Changes</p>
        </div>
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
          <p onClick={() => handleCarDelete()}>Edit</p>
        </div>
      </div>
    </>
  );
}

// carType: "bikes";
// coverImage: "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v1/object/public/cars/list/2004-bmw-f650gs-dakar-rally-edition-2025-06-14/4";
// datePosted: "2025-06-14T13:11:07.353351+00:00";
// features: (8)[
//   ("652cc DOHC Liquid Cooled.\n",
//   "5-Speed (chain)\n",
//   "18L Tank.\n",
//   "Topbox.\n",
//   "Travelled 33,000KMS\n",
//   "New Mitas Tires.\n",
//   "️Fully Kenyan Registered\n",
//   "️Quick NTSA Transfer to You.")
// ];
// id: 53;
// images: (10)[
//   ("https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v…/2004-bmw-f650gs-dakar-rally-edition-2025-06-14/0",
//   "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v…/2004-bmw-f650gs-dakar-rally-edition-2025-06-14/1",
//   "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v…/2004-bmw-f650gs-dakar-rally-edition-2025-06-14/2",
//   "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v…/2004-bmw-f650gs-dakar-rally-edition-2025-06-14/3",
//   "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v…/2004-bmw-f650gs-dakar-rally-edition-2025-06-14/4",
//   "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v…/2004-bmw-f650gs-dakar-rally-edition-2025-06-14/5",
//   "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v…/2004-bmw-f650gs-dakar-rally-edition-2025-06-14/6",
//   "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v…/2004-bmw-f650gs-dakar-rally-edition-2025-06-14/7",
//   "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v…/2004-bmw-f650gs-dakar-rally-edition-2025-06-14/8",
//   "https://xxsbhmnnstzhatmoivxp.supabase.co/storage/v…/2004-bmw-f650gs-dakar-rally-edition-2025-06-14/9")
// ];
// name: "2004 BMW F650GS Dakar Rally Edition";
// price: 650000;
// slugName: "2004-bmw-f650gs-dakar-rally-edition-2025-06-14";
// sold: false;
