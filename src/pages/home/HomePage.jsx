import Header from "../../home/Header"
import styles from "./HomePage.module.css"
import carSlide1 from  "../../assets/images/slider/car-slide-1.jpg"
import carSlide2 from  "../../assets/images/slider/car-slide-2.jpg"
import carSlide3 from "../../assets/images/slider/car-slide-3.jpg";

function HomePage({path}) {
    return (
      <div className={styles.body}>
        <Header activeMenuHref={"/"} />

        <div className={styles.sliderWrapper}>
          <div className={styles.slider}>
            <div className={styles.slide}>
              <img src={carSlide1} alt="" />
            </div>
          </div>
        </div>

        <h3>Hello {path ? path : "Index"}</h3>
      </div>
    );
}

export default HomePage