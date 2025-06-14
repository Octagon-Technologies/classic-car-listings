import React, { useState } from "react";
import Header from "../../home/Header";
import styles from "./AboutPage.module.css";
import carSlide1 from "../../assets/images/slider/car-slide-1.jpg";
import carSlide2 from "../../assets/images/slider/car-slide-2.jpg";
import carSlide3 from "../../assets/images/slider/car-slide-3.jpg";
import classicCar from "../../assets/images/design/classic-car.png";
import quote from "../../assets/images/design/quote.svg";
import kenyanManA from "../../assets/images/design/testimonials/kenyan-man.jpg";
import woman from "../../assets/images/design/testimonials/sa-woman.jpg";
import kenyanManB from "../../assets/images/design/testimonials/kenyan-man-B.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import AnimatedNumber from "../../home/AnimatedNumber";
import { div } from "framer-motion/client";

const slides = [carSlide1, carSlide2, carSlide3];
const testimonials = [
  {
    name: "Peter",
    location: "Mombasa, Kenya",
    image: kenyanManA,
    message: `I listed my classic Mercedes on a Tuesday and by Friday, it was sold to a fellow enthusiast. The team handled everything—from photos to viewings—with real care. It’s rare to find people who treat your car like it’s their own.`,
  },
  {
    name: "Andre",
    location: "London, United Kingdom",
    image: kenyanManB,
    message: `Private, professional, and genuinely passionate about cars. I flew in from the UK and found exactly what I’d been searching for. The appointment-only setup gave me the time and space to make the right choice without pressure.`,
  },
  {
    name: "Mumbi",
    location: "Nairobi, Kenya",
    image: woman,
    message: ` Finally, a platform that gets classic cars—and the people who love them. The service felt more like joining a community than dealing with a dealership. I’ll definitely be back when it’s time to expand my collection.`,
  },
];

function AboutPage({ path }) {
  return (
    <div>
      <Header activeMenuHref={path} />

      <div className={styles.body}>
        <h1 className={styles.pageTitle}>About Us</h1>

        <div className={styles.intro}>
          <div>
            <h2 className={styles.goal}>
              Connecting buyers with quality cars at affordable prices
            </h2>

            <p className={styles.summary}>
              Classic Car Listings Kenya is the go-to platform for discovering
              and buying unique Classic Cars, Motorcycles, and Luxury Marques.
              <br></br>
              <br></br> Based in Karen, Nairobi, we offer exclusive,
              appointment-only viewings and professional listing services.
              Whether you’re buying or selling, we connect real enthusiasts with
              the cars they love.
            </p>
          </div>

          <img
            className={styles.carDisplay}
            src={classicCar}
            loading="eager"
            alt=""
          />
        </div>

        <div className={styles.stats}>
          <span className={styles.divider}></span>

          <h2 className={styles.pageTitle}>Our Stats</h2>

          <div className={styles.content}>
            <div className={styles.stat}>
              <p className={styles.value}>
                <AnimatedNumber value={500} duration={1} />+
              </p>
              <p className={styles.label}>Cars sold to passionate new owners</p>
            </div>

            <div className={styles.stat}>
              <p className={styles.value}>
                <AnimatedNumber value={6} duration={1} />
              </p>
              <p className={styles.label}>
                Countries represented by buyers & sellers we’ve worked with
              </p>
            </div>

            <div className={styles.stat}>
              <p className={styles.value}>
                <AnimatedNumber value={13} duration={1} />
              </p>
              <p className={styles.label}>
                Collector vehicles currently in long-term storage & fleet care
              </p>
            </div>
          </div>

          <span className={styles.divider}></span>
        </div>

        <div className={styles.story}>
          <h1 className={styles.pageTitle}>Our Story</h1>

          <p>
            Classic Car Listings Kenya was born out of a deep love for timeless
            machines and the stories they carry. Founded in 2022, the idea was
            simple: create a dedicated space where real car enthusiasts—buyers,
            sellers, and collectors alike—could come together to celebrate
            automotive excellence, particularly in the realm of classic and rare
            vehicles.<br></br>
            <br></br> It started with a small group of like-minded individuals
            who were frustrated by how difficult it was to find trusted
            platforms for buying or selling classic cars in Kenya. The market
            was fragmented, listings were unreliable, and personal service was
            nearly nonexistent. We saw an opportunity—not just to build a
            dealership, but to create a trusted hub for people who see cars as
            more than just machines.
            <br></br>
            <br></br> From our discreet location in Karen, Nairobi, we began
            operating on an appointment-only basis, giving each customer a
            personalised, relaxed experience. No crowds. No pressure. Just the
            chance to view and connect with unique vehicles, from vintage
            Volkswagen and Land Rovers to rare high-end marques and restored
            motorcycles. Over time, our “on behalf” sales model gained
            popularity—offering collectors a secure and professional way to sell
            their cherished cars without stress, while giving buyers access to
            authentic, well-documented listings.<br></br>
            <br></br> What sets us apart isn’t just our inventory—it’s our
            approach. We are a small, diverse team fueled by passion, integrity,
            and an eye for detail. We treat every vehicle like it’s our own,
            whether it’s being sold, stored, or showcased. We’ve since grown to
            offer long-term car storage, professional fleet management, and
            concierge-level service for clients in the diaspora or collectors
            with demanding schedules.<br></br>
            <br></br> Today, Classic Car Listings Kenya continues to evolve—but
            our core remains the same: a love for great cars, and a commitment
            to the people who love them too.
          </p>
        </div>

        <div className={styles.testimonials}>
          <h2 class={styles.pageTitle}>Testimonials</h2>
          <p class={styles.miniHeader}>What customers say about us</p>

          <div class={styles.testiContainer}>
            {testimonials.map((testi) => (
              <div class={styles.testi}>
                <img
                  class={styles.profilePic}
                  loading="lazy"
                  src={testi.image}
                  alt=""
                />
                <p class={styles.name}>{testi.name}</p>
                <p class={styles.origin}>{testi.location}</p>
                <p class={styles.message}>{testi.message}</p>
                <img class={styles.quote} src={quote} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;

// Classic Car Listings Kenya was established in 2022, a dealership dedicated to "Real Car Enthusiasts" specialising in selling of Classic Cars, Classic Motorcycles & Unique high End Luxury Marques.

// We sell our own stock & on behalf basis aswell, we are Neatly Tucked Away in Karen Nairobi, where we prefer to work on an appointment only basis, ensuring our customers get private personalised viewings of our wide inventory. We are a small diverse team who work together to make things work.

// We also offer
// Long-term car storage for collectors who reside in the diaspora or busy collecters who'd like their fleet Managed & taken care of professionally.

// Regarless of your need, we will work around your request to ensure you get value for money, in the most efficient & timely manner.
