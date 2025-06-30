import React, { useState } from "react";
import Header from "../../home/Header";
import styles from "./AboutPage.module.css";
import classicCar from "../../assets/images/branding/about-us-car.jpg";
import ogImage from "../../assets/images/design/og-image.png";
import quote from "../../assets/images/design/quote.svg";
import studGuy from "../../assets/images/design/testimonials/guy-with-studs.jpg";
import luoWoman from "../../assets/images/design/testimonials/luo-woman.jpg";
import whiteWoman from "../../assets/images/design/testimonials/white-woman.jpg";
import blackLondonGuy from "../../assets/images/design/testimonials/black-london-guy.jpg";
import bikeGuy from "../../assets/images/design/testimonials/bike-guy.jpeg";
import showroom1 from "../../assets/images/design/showroom/showroom-1.jpg";
import showroom2 from "../../assets/images/design/showroom/showroom-2.jpg";
import showroom3 from "../../assets/images/design/showroom/showroom-3.jpg";
import showroom4 from "../../assets/images/design/showroom/showroom-4.jpg";
import showroom5 from "../../assets/images/design/showroom/showroom-5.jpg";
import showroom6 from "../../assets/images/design/showroom/showroom-6.jpg";
import showroom7 from "../../assets/images/design/showroom/showroom-7.jpg";
import indianCouple from "../../assets/images/design/testimonials/indian-couple.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import AnimatedNumber from "../../home/AnimatedNumber";
import { div } from "framer-motion/client";
import { Helmet } from "react-helmet";

const workingHours = [
  {
    day: "Monday",
    time: "10am - 6pm",
  },
  {
    day: "Tuesday - Friday",
    time: "9am - 6pm",
  },
  {
    day: "Saturday",
    time: "11am - 5pm",
  },
  {
    day: "Sunday",
    time: "Closed",
  },
  {
    day: "Public Holidays",
    time: "Call to Confirm",
  },
];

const testimonials = [
  {
    name: "Kabir Patel & Aarya Patel",
    location: "Nairobi, Kenya",
    image: indianCouple,
    message: `We were looking for an older, clean 4-wheel drive for visiting the national park and traveling around Kenya. Most of the cars we came across were either poorly maintained or overpriced. We stumbled upon Classic through their Facebook page, where we’d seen a Land Cruiser. For the first time, what we saw online was exactly what we found in person. When we reached the showroom, we immediately got the sense that these guys were honest and transparent. They allowed us to do a pre-purchase inspection with our own mechanic, and we sealed the deal. Out of all the cars we’ve ever bought, dealing with Classic was by far the easiest. We’d highly recommend them.`,
  },
  {
    name: "Imogen Scott",
    location: "Nanyuki, Kenya",
    image: whiteWoman,
    message: `I had been renting a car for almost six months while based in Laikipia doing research in conservation. I got tired of paying exorbitant car hire fees and asked a couple of friends in Nanyuki to recommend a reputable dealer selling older, clean cars. Classic Car Listings came up every single time. I checked them out online—they seemed legit. We spoke on DM, and I booked an appointment to see an old Pajero. When I actually visited, they advised me against that car based on my needs and recommended a Land Rover instead. I truly appreciate that, as the car has served me incredibly well. It’s rare to find a dealership that takes the time to understand their clients and advise them accordingly. I’m extremely happy with my purchase.`,
  },
  {
    name: "Mark Kibet",
    location: "Eldoret, Kenya",
    image: bikeGuy,
    message: `I had been riding a 250cc bike, my very first, but wanted to upgrade to something bigger for commuting and cross-country travel. As an avid follower of their page, I spotted a stunning BMW GS1200. The moment I saw it in person, I knew I had to have it. The team at Classic was incredibly gracious—they let me test the bike three times without ever doubting my intention to buy. When I finally did, they surprised me with a full tank of fuel and a gift voucher for new bike gear. Since then, I’ve ridden through four countries across East Africa with my GS, and every time someone asks where I got it, I proudly point them to the Classic page.`,
  },
  {
    name: "Peter Njoroge",
    location: "Thika, Kenya",
    image: studGuy,
    message: `I inherited an old Mercedes from my dad and was looking for a place to do long-term storage since I didn’t use it much. I then stumbled across Classic Car Listings online. I visited them and was impressed with their storage facility. The car stayed for 3 months, but afterwards, I felt like it needed a new home. Initially, I was quite skeptical that they would manage to find somebody. Surprisingly, in a week, I saw a notification that the car had been sold to a fellow enthusiast. Their process was straightforward, honest, and they handled everything. It’s rare to find people who treat your car like it’s their own.`,
  },
  {
    name: "Andre Aneke",
    location: "Nairobi / London",
    image: blackLondonGuy,
    message: `I flew in from the UK, new to Kenya after getting a long-term contract here, and started looking for a car. Their site popped up on Instagram. Interestingly, when I asked my colleagues for recommendations, they all referred me to Classic—and they had exactly what I was looking for. Coming from the diaspora, I’d heard a lot of horror stories about dealing with Kenyan car dealers, but I genuinely enjoyed my experience with Classic Car Listings.`,
  },
  {
    name: "Rispa Atieno",
    location: "Kisumu, Kenya",
    image: luoWoman,
    message: `I wanted my first car to be a classic—and a manual. I didn’t want the typical Vitz or Demio, and honestly, I had no idea where to start. I found Classic online, gave them a call, booked an appointment, and visited over the weekend. I met a bright, lovely team that walked me through all the cars they had. I actually ended up picking an older manual 4-wheel drive, which I absolutely love. The service felt less like dealing with a dealership and more like joining a community.`,
  },
];

function AboutPage({ path }) {
  const showroomImages = [
    {
      image: showroom3,
      bio: "Not a showroom - an automotive gallery.",
    },
    {
      image: showroom2,
      bio: "A hidden gem where passion meets precision.",
    },
    {
      image: showroom4,
      bio: "You don’t just view cars here. You connect with them.",
    },
    {
      image: showroom5,
      bio: "Carefully curated. Impeccably kept.",
    },
    {
      image: showroom1,
      bio: "No crowds. No pressure.",
    },
    {
      image: showroom7,
      bio: "Private. Polished. Personal—just how buying a classic should feel.",
    },
  ];
  const [activeShowroom, setActiveShowroom] = useState(showroomImages[2]);

  return (
    <div>
      <Helmet>
        <title>About Us | Classic Car Listings</title>
        <meta
          name="description"
          content="Discover how Classic Car Listings Kenya helps enthusiasts buy, sell, and store classic cars and motorcycles. Based in Karen, Nairobi, we provide private viewings and professional services."
        />
        <meta
          name="keywords"
          content="classic car dealership Kenya, classic motorcycles Kenya, car storage Karen Nairobi, sell classic cars Nairobi, classic cars Kenya, buy classic cars Kenya, cars for sale Kenya, cars for sale, classic car listings, classic cars for sale Kenya"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="About Us | Classic Car Listings" />
        <meta
          property="og:description"
          content="Learn more about Classic Car Listings Kenya — the go-to platform for classic car sales, classic motorcycle listings, and secure vehicle storage services in Karen, Nairobi."
        />
        <meta
          property="og:image"
          content="https://classiccarlistings.co.ke/assets/og-image.png"
        />
        <meta
          property="og:url"
          content="https://classiccarlistings.co.ke/about"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Classic Car Listings" />
        <meta
          name="twitter:description"
          content="Buy, sell, and store classic vehicles with Kenya’s most trusted vintage car dealership, Classic Car Listings — based in Karen, Nairobi."
        />
        <meta
          name="twitter:image"
          content="https://classiccarlistings.co.ke/assets/og-image.png"
        />
      </Helmet>

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

            <div className={styles.workingHours}>
              <h3>Working Hours</h3>

              <div className={styles.content}>
                {workingHours.map((period) => (
                  <div className={styles.period} key={period.day}>
                    <p className={styles.day}>{period.day}</p>
                    <p className={styles.time}>{period.time}</p>
                  </div>
                ))}
              </div>
            </div>
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

          <h1 className={styles.pageTitle}>Our Stats</h1>

          <div className={styles.content}>
            <div className={styles.stat}>
              <p className={styles.value}>
                <AnimatedNumber value={458} duration={1} />+
              </p>
              <p className={styles.label}>Cars sold to passionate new owners</p>
            </div>

            <div className={styles.stat}>
              <p className={styles.value}>
                <AnimatedNumber value={16} duration={1} />
              </p>
              <p className={styles.label}>
                Countries represented by buyers & sellers we’ve worked with
              </p>
            </div>

            <div className={styles.stat}>
              <p className={styles.value}>
                <AnimatedNumber value={27} duration={1} />
              </p>
              <p className={styles.label}>
                Collector vehicles currently in long-term storage & fleet care
              </p>
            </div>
          </div>
        </div>

        <div className={styles.showroom}>
          <h1 className={styles.pageTitle}>Our Showroom</h1>
          <p className={styles.instructions}>(Tap image to expand it)</p>

          <div className={styles.gallery}>
            {showroomImages.map((showroom, index) => (
              <div
                key={index}
                className={`${styles.image} ${
                  activeShowroom.image === showroom.image ? styles.active : ""
                }`}
                onClick={() => setActiveShowroom(showroom)}
              >
                <img src={showroom.image} alt="" />
              </div>
            ))}
          </div>

          <div className={styles.details}>
            <p>{activeShowroom.bio}</p>
          </div>
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
            <br></br> From our location in Karen, Nairobi, we began operating on
            an appointment-only basis, giving each customer a personalised,
            relaxed experience. No crowds. No pressure. Just the chance to view
            and connect with unique vehicles, from classic motorcycles to
            high-end marques. Over time, our “on behalf” sales model gained
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
          <h1 className={styles.pageTitle}>Testimonials</h1>
          <p className={styles.miniHeader}>What customers say about us</p>

          <div className={styles.testiContainer}>
            {testimonials.map((testi, index) => (
              <div className={styles.testi} key={index}>
                <img
                  className={styles.profilePic}
                  loading="lazy"
                  src={testi.image}
                  alt=""
                />
                <p className={styles.name}>{testi.name}</p>
                <p className={styles.origin}>{testi.location}</p>
                <p className={styles.message}>{testi.message}</p>
                <img className={styles.quote} src={quote} alt="" />
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
