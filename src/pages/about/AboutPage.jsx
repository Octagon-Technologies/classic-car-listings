import React, { useState } from "react";
import Header from "../../home/Header";
import styles from "./AboutPage.module.css";
import carSlide1 from "../../assets/images/slider/car-slide-1.jpg";
import carSlide2 from "../../assets/images/slider/car-slide-2.jpg";
import carSlide3 from "../../assets/images/slider/car-slide-3.jpg";
import quote from "../../assets/images/design/quote.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const slides = [carSlide1, carSlide2, carSlide3];
const testimonials = [
  {
    name: "Mr. Laswai",
    image:
      "https://www.shutterstock.com/image-photo/portrait-african-man-260nw-156307685.jpg",
    message: `St. Patrick’s Hill Schools holds a special place in my heart. For
              nearly twenty years, I’ve been a proud parent here, with all my
              children passing through its nurturing halls. That alone speaks
              volumes. I’ve watched them grow—emotionally, physically, and
              academically—thanks to the school’s warm environment, dedicated
              staff, and firm foundation of discipline. It’s this blend of care
              and structure that has shaped them into the respectful, grounded
              young adults they are today.`,
  },
  {
    name: "Mr. Laswai",
    image:
      "https://www.shutterstock.com/image-photo/portrait-african-man-260nw-156307685.jpg",
    message: `St. Patrick’s Hill Schools holds a special place in my heart. For
              nearly twenty years, I’ve been a proud parent here, with all my
              children passing through its nurturing halls. That alone speaks
              volumes. I’ve watched them grow—emotionally, physically, and
              academically—thanks to the school’s warm environment, dedicated
              staff, and firm foundation of discipline. It’s this blend of care
              and structure that has shaped them into the respectful, grounded
              young adults they are today.`,
  },
];

function AboutPage({ path }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div className={styles.body}>
      <Header activeMenuHref={path} />
      <div className={styles.sliderWrapper}>
        <div
          className={styles.slider}
          style={{ left: `-${activeSlideIndex * window.innerWidth}px` }}
        >
          {slides.map((slideImg, idx) => (
            <div className={styles.slide} key={idx}>
              <img src={slideImg} alt="" />
            </div>
          ))}
        </div>

        <div className={styles.sliderButtons}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() =>
              setActiveSlideIndex((a) =>
                a - 1 < 0 ? slides.length - 1 : a - 1
              )
            }
          />
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={() => setActiveSlideIndex((a) => (a + 1) % slides.length)}
          />
        </div>

        <div className={styles.sliderDots}>
          <ul>
            {slides.map((_, idx) => (
              <li
                key={idx}
                className={activeSlideIndex === idx ? styles.active : ""}
                onClick={() => setActiveSlideIndex(idx)}
              ></li>
            ))}
          </ul>
        </div>

        <div className={styles.siteTitle}>
          <h2>Classic Car Listings</h2>
        </div>
      </div>

      <div className={styles.story}>
        <h2 className={styles.subHeading}>Our Story</h2>
        <p>
          Matthew Peevers was one of Kenya's top composers/producers but after
          suffering a stroke in 2021 Matthew decided to work on his first love,
          classic cars. <br></br>
          <br></br>
          Although Matthew had been working on and restoring classic cars since
          he was 13 years old he decided to open MG’s Kenya and on the road
          again classic cars to work on these projects full-time.<br></br>
          <br></br>
          We have a small but dedicated team of 10 people which includes people
          like Munyi who's been working with me for over 30 years.
        </p>
      </div>

      <div className={styles.testimonials}>
        <h2 class={styles.subHeading}>Testimonials</h2>
        <p class={styles.miniHeader}>What parents and alumni say about us</p>

        <div class={styles.testiContainer}>
          {testimonials.map((testi) => (
            <div class={styles.testi}>
              <img
                class={styles.profilePic}
                loading="lazy"
                src={testi.image}
                alt=""
              />
              <p class={styles.username}>{testi.name}</p>
              {/* <p class={styles.role}>Parent</p> */}
              <p class={styles.message}>{testi.message}</p>
              <img class={styles.quote} src={quote} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
